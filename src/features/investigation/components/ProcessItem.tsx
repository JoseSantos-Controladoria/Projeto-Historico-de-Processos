import React from 'react';
import { Process } from '../types';
import { StatusBadge } from './StatusBadge';
import { 
  Calendar, 
  User, 
  Building2, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp,
  FileText 
} from 'lucide-react';

interface ProcessItemProps {
  process: Process;
  isExpanded: boolean;
  onToggle: () => void;
  employeeName?: string | null;
}

export const ProcessItem: React.FC<ProcessItemProps> = ({ 
  process, 
  isExpanded, 
  onToggle, 
  employeeName 
}) => {
  return (
    <div 
      className={`group bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
        isExpanded 
          ? 'border-blue-200 shadow-md ring-1 ring-blue-100' 
          : 'border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md'
      }`}
    >
      {/* --- Cabeçalho Clicável do Card --- */}
      <div 
        onClick={onToggle}
        className="p-5 cursor-pointer flex flex-col gap-4"
      >
        {/* Linha Superior: ID e Status */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isExpanded ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'} transition-colors`}>
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 leading-tight group-hover:text-blue-700 transition-colors">
                {process.requestname}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-mono">
                ID: {process.id} • {process.flow_name}
              </p>
            </div>
          </div>
          <StatusBadge status={process.task_result} />
        </div>

        {/* Grid de Informações (Layout Estilo Dashboard) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          
          {/* Coluna 1: Tarefa Atual */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tarefa Atual</span>
            <span className="text-sm font-medium text-slate-700 truncate" title={process.task_name}>
              {process.task_name}
            </span>
          </div>

          {/* Coluna 2: Executor */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Executor</span>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                {process.executor_name.charAt(0)}
              </div>
              <span className="text-sm text-slate-600 truncate">{process.executor_name}</span>
            </div>
          </div>

          {/* Coluna 3: Setor/Colaborador */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {employeeName ? 'Referente a' : 'Setor Solicitante'}
            </span>
            <div className="flex items-center gap-1.5 text-slate-600">
              {employeeName ? <User className="w-3.5 h-3.5" /> : <Building2 className="w-3.5 h-3.5" />}
              <span className="text-sm truncate">
                {employeeName || process.requester_setor}
              </span>
            </div>
          </div>

          {/* Coluna 4: Data e Ação (Seta) */}
          <div className="flex flex-col gap-1 relative">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Início</span>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-sm">
                  {new Date(process.task_startdatetime).toLocaleDateString()}
                </span>
              </div>
              
              {/* Seta indicativa */}
              <div className="text-slate-300 group-hover:text-blue-500 transition-colors">
                {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Área Expandida (Detalhes & Ações) --- */}
      {isExpanded && (
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-600">
              <p>
                <span className="font-semibold">Tipo da Tarefa:</span> {process.task_type}
              </p>
              {process.task_enddatetime && (
                <p className="mt-1">
                  <span className="font-semibold">Concluído em:</span> {new Date(process.task_enddatetime).toLocaleString()}
                </p>
              )}
            </div>

            {process.reportlink && (
              <a
                href={process.reportlink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:text-blue-600 hover:border-blue-300 hover:shadow-sm rounded-lg transition-all text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Ver Relatório de Auditoria
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};