import { Process } from "../types";
import { MOCK_DOSSIERS } from "../data/mockData";
import { FileText, User, Calendar, Building, ExternalLink } from "lucide-react";
import { useState } from "react";

interface ProcessListProps {
  processes: Process[];
}

export function ProcessList({ processes }: ProcessListProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const getEmployeeName = (employeeId?: string) => {
    if (!employeeId) return null;
    const employee = MOCK_DOSSIERS.find(emp => emp.id === employeeId);
    return employee ? employee.name : null;
  };

  if (processes.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-500">Nenhum processo encontrado.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {processes.map((process) => (
        <div key={process.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setExpandedId(expandedId === process.id ? null : process.id)}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-800">{process.requestname}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  process.task_result === 'Aprovado' ? 'bg-emerald-100 text-emerald-700' :
                  process.task_result === 'Pendente' ? 'bg-amber-100 text-amber-700' :
                  process.task_result === 'Em Andamento' ? 'bg-blue-100 text-blue-700' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {process.task_result}
                </span>
              </div>

              <p className="text-sm text-slate-600 mb-3">{process.task_type} - {process.task_name}</p>

              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-700">
                  Executor: {process.executor_name}
                </span>
              </div>

              {process.employee_id && (
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-700">
                    Colaborador: {getEmployeeName(process.employee_id)}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-700">
                  Setor Solicitante: {process.requester_setor}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Calendar className="w-4 h-4" />
                <span>{new Date(process.task_startdatetime).toLocaleDateString()}</span>
              </div>
            </div>
            </div>
          </div>
          
          {expandedId === process.id && process.reportlink && (
            <div className="border-t border-slate-200 bg-slate-50 p-4">
              <a
                href={process.reportlink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Abrir Relatório
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}