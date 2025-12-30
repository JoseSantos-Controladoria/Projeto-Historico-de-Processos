import { Router } from 'express';
import { InvestigationController } from './controllers/InvestigationController';
import { DashboardController } from './controllers/DashboardController'; // Import novo

const router = Router();
const investigationController = new InvestigationController();
const dashboardController = new DashboardController(); // Instância nova

// Rotas de Investigação
router.get('/investigation/search', (req, res) => investigationController.search(req, res));
router.get('/investigation/history/:id', (req, res) => investigationController.getHistory(req, res));

// ✅ NOVA ROTA: Dashboard KPIs
router.get('/dashboard/kpis', (req, res) => dashboardController.getKPIs(req, res));

// ✅ NOVA ROTA: Analytics Completo (Gráficos e Listas)
router.get('/dashboard/analytics', (req, res) => dashboardController.getAnalytics(req, res));

export { router };
