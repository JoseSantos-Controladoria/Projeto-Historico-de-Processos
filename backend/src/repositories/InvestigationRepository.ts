import { pool } from '../config/database'; 
// CORREÇÃO: Importando do caminho correto que você me mostrou
import { EmployeeEntity, ProcessStepEntity, PersonProfile } from '../types/Investigation'; 

export class InvestigationRepository {

  // 1. Busca o funcionário pelo NOME ou CPF (Master Data)
  async findEmployeesByName(term: string): Promise<EmployeeEntity[]> {
    // Aumentamos o LIMIT para 100 e adicionamos a busca por CPF
    const query = `
      SELECT employee_name, external_id, personal_tax_id
      FROM zeev.tb_employee_master_data
      WHERE employee_name ILIKE $1 
         OR personal_tax_id ILIKE $1 -- ✅ AQUI ESTÁ O SEGREDO: Busca também na coluna de CPF
      ORDER BY employee_name ASC
      LIMIT 100
    `;
    
    // O %term% permite buscar por partes do nome ou partes do CPF
    const values = [`%${term}%`];
    
    const { rows } = await pool.query<EmployeeEntity>(query, values);
    return rows;
  }

  // 2. Busca IDs dos processos vinculados aos CPFs encontrados (Attributes)
  async findProcessIdsByTaxIds(taxIds: string[]): Promise<number[]> {
    if (taxIds.length === 0) return [];

    const placeholders = taxIds.map((_, i) => `$${i + 1}`).join(',');
    
    // NOTA: Na tabela attributes o ID é 'instanceid' (tudo junto)
    const query = `
      SELECT DISTINCT instanceid 
      FROM zeev.tb_instance_attributes
      WHERE name_filed = 'funcionario' 
      AND value_field IS NOT NULL
      AND personal_tax_id IN (${placeholders})
    `;

    const { rows } = await pool.query<{ instanceid: number }>(query, taxIds);
    return rows.map(r => r.instanceid);
  }

  // 3. Busca os detalhes dos steps (Steps)
  async findStepsByInstanceIds(instanceIds: number[]): Promise<ProcessStepEntity[]> {
    if (instanceIds.length === 0) return [];

    const placeholders = instanceIds.map((_, i) => `$${i + 1}`).join(',');
    
    // NOTA: Na tabela steps o ID do processo é apenas 'id', mas o DTO espera 'instance_id'
    const query = `
      SELECT 
        s.id as instance_id, -- Alias para o DTO
        s.id,
        s.requestname,
        s.department_id,
        s.requester_setor,
        s.requester_setor_id,
        s.requester_cargo,
        s.requester_cargo_id,
        s.flow_name,
        s.task_instance_id,
        s.task_id,
        s.task_name,
        s.task_type,
        s.task_result,
        s.task_startdatetime,
        s.task_enddatetime,
        s.executor_userid,
        s.executor_name,
        s.executor_email,
        s.executor_username,
        s.reportlink
      FROM zeev.tb_instance_steps s
      WHERE s.id IN (${placeholders})
      
      -- 🛡️ REGRAS DE LIMPEZA DE DADOS
      AND s.personal_tax_id IS NOT NULL 
      AND s.personal_tax_id != ''
      
      ORDER BY s.task_startdatetime DESC
    `;

    const { rows } = await pool.query<ProcessStepEntity>(query, instanceIds);
    return rows;
  }

  // ✨ NOVO MÉTODO: Buscar Pessoas Agrupadas
  async findPeople(term: string): Promise<PersonProfile[]> {
    const client = await pool.connect();
    
    try {
      // 🏗️ ESTRATÉGIA:
      // 1. A base é a tabela de Funcionários (tb_employees), que tem o cadastro completo.
      // 2. Fazemos LEFT JOIN com steps para contar os processos.
      // 3. Resultado: Lista todos os funcionários que batem com a busca, 
      //    mostrando "0 processos" se não tiverem nada.
      
      const query = `
        SELECT 
            e.personal_tax_id as cpf,      -- ⚠️ Verifique se no banco é 'personal_tax_id'
            e.employee_name as name,
            e.department as sector,        -- O diagrama mostra uma coluna 'department' (texto)
            e.job_title as role,           -- O diagrama mostra 'job_title'
            COUNT(DISTINCT s.id) as "totalProcesses"
        FROM zeev.tb_employees e
        LEFT JOIN zeev.tb_instance_steps s ON s.personal_tax_id = e.personal_tax_id
        WHERE 
            e.employee_name ILIKE $1 
            OR e.personal_tax_id ILIKE $1
        GROUP BY 
            e.personal_tax_id, 
            e.employee_name, 
            e.department, 
            e.job_title
        ORDER BY "totalProcesses" DESC, e.employee_name ASC
        LIMIT 50;
      `;

      const searchTerm = `%${term}%`;
      const { rows } = await client.query(query, [searchTerm]);
      
      return rows.map(row => ({
        cpf: row.cpf,
        name: row.name || 'Nome Desconhecido',
        sector: row.sector || 'Setor N/A',
        role: row.role || 'Colaborador',
        totalProcesses: Number(row.totalProcesses || 0)
      }));

    } catch (error) {
      console.error('Erro ao buscar pessoas na tb_employees:', error);
      throw error; 
    } finally {
      client.release();
    }
  }

  
}

