import React, { useState, useEffect } from 'react';
import { Process } from '../types';
import { StatusBadge } from './StatusBadge';
import { 
  Calendar, 
  User, 
  Building2, 
  ChevronDown, 
  ChevronUp,
  FileText,
  Clock,
  CheckCircle2,
  Loader2
} from 'lucide-react';

interface ProcessItemProps {
  process: Process;
  isExpanded: boolean;
  onToggle: () => void;
  employeeName?: string | null;
}

const formatDateSafely = (dateString: string | null | undefined, includeTime = false) => {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    return includeTime 
      ? date.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) 
      : date.toLocaleDateString('pt-BR');
  } catch (error) {
    return '-';
  }
};

export const ProcessItem: React.FC<ProcessItemProps> = ({ 
  process, 
  isExpanded, 
  onToggle, 
  employeeName 
}) => {
  const [history, setHistory] = useState<Process[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (isExpanded && !dataFetched) {
      const fetchHistory = async () => {
        setLoadingHistory(true);
        try {
          const response = await fetch(`http://localhost:3000/api/investigation/history/${process.id}`);
          const data = await response.json();
          setHistory(data);
          setDataFetched(true);
        } catch (error) {
          console.error("Erro ao buscar histórico:", error);
        } finally {
          setLoadingHistory(false);
        }
      };
      fetchHistory();
    }
  }, [isExpanded, process.id, dataFetched]);

  return (
    <div 
      className={`group bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
        isExpanded 
          ? 'border-blue-200 shadow-md ring-1 ring-blue-100' 
          : 'border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md'
      }`}
    >
      {/* --- Cabeçalho Clicável --- */}
      <div onClick={onToggle} className="p-5 cursor-pointer flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isExpanded ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'} transition-colors`}>
              <FileText className="w-5 h-5" />
            </div>
            <div>
              {/* ✅ MUDANÇA 1: Título agora é o Nome do Fluxo (flow_name) */}
              <h3 className="text-base font-bold text-slate-800 leading-tight">
                {process.flow_name}
              </h3>
              
              <div className="flex items-center gap-2 mt-0.5">
                {/* ✅ MUDANÇA 2: Subtítulo mostra ID e Versão (requestname) */}
                <p className="text-xs text-slate-500 font-mono">
                  ID: {process.id} • Ref: {process.requestname}
                </p>
                
                {employeeName && (
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium border border-slate-200">
                    Func: {employeeName}
                  </span>
                )}
              </div>
            </div>
          </div>
          <StatusBadge status={process.task_result as any} />
        </div>

        {/* Resumo (Visível quando fechado) */}
        {!isExpanded && (
          <div className="flex items-center gap-6 text-sm text-slate-600 mt-2 pl-12">
            <div className="flex items-center gap-2" title="Executor Atual">
               <User className="w-4 h-4 text-slate-400" />
               <span>{process.executor_name || 'Sistema'}</span>
            </div>
            <div className="flex items-center gap-2" title="Setor Solicitante">
               <Building2 className="w-4 h-4 text-slate-400" />
               <span>{process.requester_setor || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2" title="Data de Início">
               <Calendar className="w-4 h-4 text-slate-400" />
               <span>{formatDateSafely(process.task_startdatetime)}</span>
            </div>
            <div className="ml-auto text-slate-400">
               <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        )}
      </div>

      {/* --- Área Expandida: TIMELINE --- */}
      {isExpanded && (
        <div className="bg-slate-50 border-t border-slate-200 px-8 py-6 animate-in slide-in-from-top-2">
          
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Linha do Tempo</h4>
            <ChevronUp className="w-5 h-5 text-slate-400 cursor-pointer" onClick={onToggle} />
          </div>

          {loadingHistory ? (
            <div className="flex flex-col items-center justify-center py-8 text-slate-500 gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              <span className="text-sm">Carregando histórico completo...</span>
            </div>
          ) : (
            <div className="relative border-l-2 border-slate-200 ml-3 space-y-8 pb-2">
              {history.map((step, index) => {
                const isCompleted = !!step.task_enddatetime;
                return (
                  <div key={index} className="relative pl-8">
                    {/* Bolinha da Timeline */}
                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${
                      isCompleted ? 'bg-green-500 border-green-500' : 'bg-white border-blue-500'
                    }`}>
                      {isCompleted && <CheckCircle2 className="w-3 h-3 text-white absolute top-0 left-0" />}
                    </div>

                    {/* Conteúdo do Passo */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-sm">{step.task_name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 font-medium">
                          {step.task_type}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {step.executor_name || 'Sistema'}
                        </div>
                        <div className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {step.requester_setor || 'N/A'}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs mt-1 font-mono text-slate-500">
                         <Clock className="w-3 h-3" />
                         <span>Início: {formatDateSafely(step.task_startdatetime, true)}</span>
                         {step.task_enddatetime && (
                           <>
                             <span className="text-slate-300">|</span>
                             <span className="text-green-600 font-medium">Fim: {formatDateSafely(step.task_enddatetime, true)}</span>
                           </>
                         )}
                      </div>
                      
                      {step.reportlink && (
                        <a href={step.reportlink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs mt-1 w-fit">
                          Ver Evidência
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};