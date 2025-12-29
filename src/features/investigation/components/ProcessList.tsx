import React, { useState } from "react";
import { Process } from "../types";
import { MOCK_DOSSIERS } from "../data/mockData";
import { ProcessItem } from "./ProcessItem";
import { FileSearch } from "lucide-react";

interface ProcessListProps {
  processes: Process[];
}

export function ProcessList({ processes }: ProcessListProps) {
  // Estado para controlar qual card está aberto (Accordion style)
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Helper para buscar nome (poderia ser um hook separado em apps reais)
  const getEmployeeName = (employeeId?: string) => {
    if (!employeeId) return null;
    const employee = MOCK_DOSSIERS.find(emp => emp.id === employeeId);
    return employee ? employee.name : null;
  };

  // Estado Vazio (Empty State) bonito
  if (processes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
        <div className="p-4 bg-slate-50 rounded-full mb-4">
          <FileSearch className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900">Nenhum processo encontrado</h3>
        <p className="text-slate-500 text-sm mt-1 max-w-xs text-center">
          Tente ajustar os filtros de busca para encontrar o que você precisa.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Cabeçalho da Lista (Opcional, mas ajuda na organização visual) */}
      <div className="flex items-center justify-between px-2 mb-2">
        <span className="text-sm font-medium text-slate-500">
          Mostrando {processes.length} resultados
        </span>
      </div>

      {/* Renderização da Lista */}
      <div className="flex flex-col gap-3">
        {processes.map((process) => (
          <ProcessItem
            key={process.id}
            process={process}
            isExpanded={expandedId === process.id}
            onToggle={() => setExpandedId(expandedId === process.id ? null : process.id)}
            employeeName={getEmployeeName(process.employee_id)}
          />
        ))}
      </div>
    </div>
  );
}