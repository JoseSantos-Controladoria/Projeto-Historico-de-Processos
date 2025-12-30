import { Request, Response } from 'express';
import { DashboardRepository } from '../repositories/DashboardRepository';

export class DashboardController {
  private repo: DashboardRepository;

  constructor() {
    this.repo = new DashboardRepository();
  }

  async getKPIs(req: Request, res: Response) {
    try {
      const kpis = await this.repo.getKPIs();
      
      // Formatação simples antes de enviar
      const formattedKPIs = {
        ...kpis,
        rejectionRate: parseFloat(kpis.rejectionRate.toFixed(2)), // Arredonda 2 casas
        avgCompletionTimeHours: Math.round(kpis.avgCompletionTimeHours) // Arredonda horas
      };

      return res.json(formattedKPIs);
    } catch (error) {
      console.error('Erro ao buscar KPIs:', error);
      return res.status(500).json({ error: 'Erro interno ao calcular KPIs' });
    }
  }
  // Adicione isso abaixo do getKPIs

  async getAnalytics(req: Request, res: Response) {
    try {
      // Executa todas as queries em paralelo para ser MUITO rápido
      const [evolution, processByFlow, statusDistribution, topEmployees, topSectors] = await Promise.all([
        this.repo.getEvolutionChart(),
        this.repo.getProcessByFlowChart(),
        this.repo.getStatusDistributionChart(),
        this.repo.getTopEmployeesList(),
        this.repo.getTopSectorsList()
      ]);

      const analyticsData = {
        evolution,
        processByFlow,
        statusDistribution,
        topEmployees,
        topSectors
      };

      return res.json(analyticsData);
    } catch (error) {
      console.error('Erro ao buscar Analytics:', error);
      return res.status(500).json({ error: 'Erro interno ao gerar gráficos' });
    }
  }
}