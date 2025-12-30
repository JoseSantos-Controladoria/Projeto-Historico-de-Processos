// src/controllers/InvestigationController.ts
import { Request, Response } from 'express';
import { InvestigationService } from '../services/InvestigationService';

export class InvestigationController {
  private service: InvestigationService;

  constructor() {
    this.service = new InvestigationService();
  }

  // O Express precisa que usemos arrow function aqui para manter o 'this' correto
  search = async (req: Request, res: Response): Promise<void> => {
    try {
      // Pega o parametro da URL: /api/investigation/search?q=NOME
      const { q } = req.query;

      if (!q || typeof q !== 'string') {
        res.status(400).json({ error: 'O parâmetro de busca "q" é obrigatório.' });
        return;
      }

      const results = await this.service.searchProcesses(q);

      res.status(200).json(results);
      
    } catch (error) {
      console.error('❌ Erro no Controller:', error);
      res.status(500).json({ error: 'Erro interno ao buscar processos.' });
    }
  };
  // Adicione este método na classe InvestigationController
  async getHistory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const history = await this.service.getProcessHistory(Number(id));
      return res.json(history);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      return res.status(500).json({ error: 'Erro interno ao buscar histórico' });
    }
  }
}