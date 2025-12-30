// backend/src/types/Dashboard.ts

export interface DashboardKPIs {
    totalProcesses: number;
    activeSectors: number;
    avgCompletionTimeHours: number;
    rejectionRate: number;
}

// Interface genérica para gráficos (Label + Valor)
export interface ChartData {
    label: string;
    value: number;
}

// O objeto completo que o Front vai receber
export interface DashboardAnalytics {
    evolution: ChartData[];      // Gráfico de Linha (Últimos 6 meses)
    processByFlow: ChartData[];  // Gráfico de Barras (Tipos de processo)
    statusDistribution: ChartData[]; // Gráfico de Pizza (Status)
    topEmployees: ChartData[];   // Ranking Funcionários
    topSectors: ChartData[];     // Ranking Setores
}