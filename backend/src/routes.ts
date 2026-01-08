import { Router } from 'express';
import { InvestigationController } from './controllers/InvestigationController';
import { DashboardController } from './controllers/DashboardController'; // Import novo

const router = Router();
const investigationController = new InvestigationController();
const dashboardController = new DashboardController(); // Instância nova

router.get('/investigation/people', (req, res) => investigationController.searchPeople(req, res));
router.get('/investigation/search', (req, res) => investigationController.search(req, res));
router.get('/investigation/history/:id', (req, res) => investigationController.getHistory(req, res));
router.get('/dashboard/kpis', (req, res) => dashboardController.getKPIs(req, res));
router.get('/dashboard/analytics', (req, res) => dashboardController.getAnalytics(req, res));

export { router };
