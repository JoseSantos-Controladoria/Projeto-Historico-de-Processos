import { pool } from '../config/database';
// ✅ CORREÇÃO: Adicionamos ChartData na importação abaixo
import { DashboardKPIs, ChartData } from '../types/Dashboard';

export class DashboardRepository {

  async getKPIs(): Promise<DashboardKPIs> {
    const client = await pool.connect();
    
    try {
      const totalQuery = `SELECT COUNT(DISTINCT id) as total FROM zeev.tb_instance_steps`;
      
      const sectorsQuery = `
        SELECT COUNT(DISTINCT requester_setor) as total 
        FROM zeev.tb_instance_steps 
        WHERE requester_setor IS NOT NULL
      `;

      const rejectionQuery = `
        SELECT 
          (COUNT(CASE WHEN task_result ILIKE '%Reprovado%' OR task_result ILIKE '%Cancelado%' THEN 1 END)::float / 
           NULLIF(COUNT(*), 0)::float) * 100 as rate
        FROM zeev.tb_instance_steps
        WHERE task_result IS NOT NULL
      `;

      const timeQuery = `
        SELECT AVG(EXTRACT(EPOCH FROM (task_enddatetime - task_startdatetime))/3600) as avg_hours
        FROM zeev.tb_instance_steps
        WHERE task_enddatetime IS NOT NULL
      `;

      const [totalRes, sectorsRes, rejectionRes, timeRes] = await Promise.all([
        client.query(totalQuery),
        client.query(sectorsQuery),
        client.query(rejectionQuery),
        client.query(timeQuery)
      ]);

      return {
        totalProcesses: Number(totalRes.rows[0]?.total || 0),
        activeSectors: Number(sectorsRes.rows[0]?.total || 0),
        rejectionRate: Number(rejectionRes.rows[0]?.rate || 0),
        avgCompletionTimeHours: Number(timeRes.rows[0]?.avg_hours || 0)
      };

    } finally {
      client.release();
    }
  }

  // --- NOVOS MÉTODOS (Agora o ChartData vai funcionar!) ---

  // 1. Evolução Mensal (Últimos 6 meses)
  async getEvolutionChart(): Promise<ChartData[]> {
    const query = `
      SELECT TO_CHAR(task_startdatetime, 'MM/YYYY') as label, COUNT(*) as value
      FROM zeev.tb_instance_steps
      WHERE task_startdatetime >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '5 months')
      GROUP BY TO_CHAR(task_startdatetime, 'MM/YYYY'), DATE_TRUNC('month', task_startdatetime)
      ORDER BY DATE_TRUNC('month', task_startdatetime) ASC
    `;
    const { rows } = await pool.query<ChartData>(query);
    return rows;
  }

  // 2. Volume por Tipo de Processo (Top 5)
  async getProcessByFlowChart(): Promise<ChartData[]> {
    const query = `
      SELECT flow_name as label, COUNT(*) as value
      FROM zeev.tb_instance_steps
      WHERE flow_name IS NOT NULL
      GROUP BY flow_name
      ORDER BY value DESC
      LIMIT 5
    `;
    const { rows } = await pool.query<ChartData>(query);
    return rows;
  }

  // 3. Distribuição por Status
  async getStatusDistributionChart(): Promise<ChartData[]> {
    const query = `
      SELECT COALESCE(task_result, 'Em Andamento') as label, COUNT(*) as value
      FROM zeev.tb_instance_steps
      GROUP BY task_result
      ORDER BY value DESC
    `;
    const { rows } = await pool.query<ChartData>(query);
    return rows;
  }

  // 4. Top 5 Funcionários
  async getTopEmployeesList(): Promise<ChartData[]> {
    const query = `
      SELECT executor_name as label, COUNT(*) as value
      FROM zeev.tb_instance_steps
      WHERE executor_name IS NOT NULL 
      AND executor_name != 'Sistema'
      GROUP BY executor_name
      ORDER BY value DESC
      LIMIT 5
    `;
    const { rows } = await pool.query<ChartData>(query);
    return rows;
  }

  // 5. Top 5 Setores
  async getTopSectorsList(): Promise<ChartData[]> {
    const query = `
      SELECT requester_setor as label, COUNT(*) as value
      FROM zeev.tb_instance_steps
      WHERE requester_setor IS NOT NULL
      GROUP BY requester_setor
      ORDER BY value DESC
      LIMIT 5
    `;
    const { rows } = await pool.query<ChartData>(query);
    return rows;
  }
}