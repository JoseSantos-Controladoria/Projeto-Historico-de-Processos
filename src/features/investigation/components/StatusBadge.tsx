import React from 'react';
import { CheckCircle2, Clock, AlertCircle, CircleDashed } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  // Mapeamento de variantes visuais baseado no texto do status
  const getVariant = (status: string) => {
    const normalized = status.toLowerCase();
    if (normalized.includes('aprovado') || normalized.includes('concluído')) {
      return {
        style: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20',
        icon: CheckCircle2
      };
    }
    if (normalized.includes('pendente')) {
      return {
        style: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20',
        icon: AlertCircle
      };
    }
    if (normalized.includes('andamento')) {
      return {
        style: 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20',
        icon: Clock
      };
    }
    return {
      style: 'bg-slate-50 text-slate-600 border-slate-200 ring-slate-500/20',
      icon: CircleDashed
    };
  };

  const { style, icon: Icon } = getVariant(status);

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border shadow-sm ring-1 ring-inset ${style}`}>
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
};