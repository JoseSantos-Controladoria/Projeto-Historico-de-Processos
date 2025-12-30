import React from 'react';
// ✅ CORREÇÃO: Agora importamos da pasta local './hooks'
import { useDashboard } from './hooks/useDashboard'; 
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line
} from 'recharts';
import { 
  Clock, Building2, AlertTriangle, 
  TrendingUp, Users, Activity, Layers
} from 'lucide-react';

export const Dashboard = () => {
  const { kpis, analytics, isLoading } = useDashboard();

  if (isLoading || !kpis || !analytics) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        <div className="flex flex-col items-center gap-2">
           <Activity className="w-8 h-8 animate-pulse text-blue-500" />
           <span>Carregando inteligência de dados...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* --- CABEÇALHO --- */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Visão Geral da Operação</h1>
          <p className="text-slate-500">Acompanhe as métricas de performance e risco em tempo real.</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
           <Activity className="w-3 h-3" />
           Atualizado Agora
        </div>
      </div>

      {/* --- 1. SEÇÃO DE KPIs (Cards) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Processos */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Volume Total</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">{kpis.totalProcesses}</h3>
            <span className="text-xs text-green-600 font-medium flex items-center gap-1 mt-1">
               <TrendingUp className="w-3 h-3" /> Processos analisados
            </span>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* SLA */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Tempo Médio (SLA)</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">{kpis.avgCompletionTimeHours}h</h3>
            <span className="text-xs text-slate-400 font-medium mt-1">Duração média</span>
          </div>
          <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Setores Ativos */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Setores Ativos</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">{kpis.activeSectors}</h3>
            <span className="text-xs text-slate-400 font-medium mt-1">Áreas demandantes</span>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        {/* Taxa de Reprovação */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Taxa de Risco</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">{kpis.rejectionRate}%</h3>
            <span className="text-xs text-red-500 font-medium mt-1">Reprovações/Cancelamentos</span>
          </div>
          <div className="p-3 bg-red-50 rounded-lg text-red-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* --- 2. SEÇÃO DE GRÁFICOS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Gráfico de Evolução */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Evolução Mensal</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.evolution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Tipos */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Top 5 Tipos de Processo</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.processByFlow} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="label" type="category" width={150} tick={{fontSize: 11}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Bar dataKey="value" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- 3. SEÇÃO DE LISTAS (Rankings) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Funcionários */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-500" />
              Funcionários com Mais Requisições
            </h3>
          </div>
          <div className="p-0">
            {analytics.topEmployees.map((item, index) => (
              <div key={index} className="flex items-center justify-between px-6 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                </div>
                <span className="text-sm font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Setores */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
           <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-slate-500" />
              Setores com Mais Demanda
            </h3>
          </div>
          <div className="p-0">
            {analytics.topSectors.map((item, index) => (
              <div key={index} className="flex items-center justify-between px-6 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === 0 ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                </div>
                <span className="text-sm font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};