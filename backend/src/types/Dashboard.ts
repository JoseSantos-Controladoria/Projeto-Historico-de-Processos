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