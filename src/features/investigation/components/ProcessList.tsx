// src/features/investigation/components/ProcessList.tsx
import React, { useState } from 'react';
import { Process } from '../types';
import { ProcessItem } from './ProcessItem';
import { FileSearch, AlertCircle, Loader2 } from 'lucide-react';

interface ProcessListProps {
  data: Process[];
  isLoading: boolean;
  error?: string | null;
}

export const ProcessList: React.FC<ProcessListProps> = ({ 
  data, 
  isLoading, 
  error 
}) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // 1. Loading
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 mt-4">
        <div className="flex items-center gap-2 text-blue-600 mb-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm font-medium">Buscando dados...</span>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-slate-100 rounded-xl animate-pulse border border-slate-200" />
        ))}
      </div>
    );
  }

  // 2. Erro
  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-sm">Erro ao carregar</h3>
          <p className="text-sm opacity-90 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  // 🚨 A CURA DA TELA BRANCA ESTÁ AQUI 🚨
  // Se 'data' for undefined, usamos [] (array vazio)
  const safeData = data || [];

  // 3. Vazio
  // Agora usamos safeData.length, que nunca falha
  if (safeData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <FileSearch className="w-8 h-8 opacity-50" />
        </div>
        <p className="text-lg font-medium text-slate-600">Nenhum processo encontrado</p>
      </div>
    );
  }

  // 4. Lista
  return (
    <div className="flex flex-col gap-3 mt-4">
      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
        Resultados: {safeData.length}
      </div>
      
      {safeData.map((process) => (
        <ProcessItem
          key={process.id}
          process={process}
          isExpanded={expandedId === process.id}
          onToggle={() => handleToggle(process.id)}
          employeeName={null} 
        />
      ))}
    </div>
  );
};