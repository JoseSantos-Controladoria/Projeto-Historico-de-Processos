import { useState, useEffect } from 'react';

// Tipos iguais aos do Backend
export interface DashboardKPIs {
  totalProcesses: number;
  activeSectors: number;
  avgCompletionTimeHours: number;
  rejectionRate: number;
}

export interface ChartData {
  label: string;
  value: number;
}

export interface DashboardAnalytics {
  evolution: ChartData[];
  processByFlow: ChartData[];
  statusDistribution: ChartData[];
  topEmployees: ChartData[];
  topSectors: ChartData[];
}

export const useDashboard = () => {
  const [kpis, setKpis] = useState<DashboardKPIs | null>(null);
  const [analytics, setAnalytics] = useState<DashboardAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Chamamos as duas rotas em paralelo
        const [kpiRes, analyticsRes] = await Promise.all([
          fetch('http://localhost:3000/api/dashboard/kpis'),
          fetch('http://localhost:3000/api/dashboard/analytics')
        ]);

        const kpiData = await kpiRes.json();
        const analyticsData = await analyticsRes.json();

        setKpis(kpiData);
        setAnalytics(analyticsData);
      } catch (error) {
        console.error('Erro ao carregar Dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return { kpis, analytics, isLoading };
};