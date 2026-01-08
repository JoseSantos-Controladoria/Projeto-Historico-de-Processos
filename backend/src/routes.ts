import { Router } from 'express';
import { InvestigationController } from './controllers/InvestigationController';
import { DashboardController } from './controllers/DashboardController'; // Import novo

const router = Router();
const investigationController = new InvestigationController();
const dashboardController = new DashboardController(); // Instância nova

// --- ROTAS DE INVESTIGAÇÃO ---

// 1º - Rota de Busca de Pessoas (TEM QUE VIR PRIMEIRO)
router.get('/investigation/people', (req, res) => investigationController.searchPeople(req, res));

// 2º - Rota de Busca de Processos
router.get('/investigation/search', (req, res) => investigationController.search(req, res));

// 3º - Rota de Histórico
router.get('/investigation/history/:id', (req, res) => investigationController.getHistory(req, res));

// ✅ NOVA ROTA: Dashboard KPIs
router.get('/dashboard/kpis', (req, res) => dashboardController.getKPIs(req, res));

// ✅ NOVA ROTA: Analytics Completo (Gráficos e Listas)
router.get('/dashboard/analytics', (req, res) => dashboardController.getAnalytics(req, res));

export { router };
