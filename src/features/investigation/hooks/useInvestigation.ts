import { useState, useCallback } from "react";
import { EmployeeDossier, Process } from "../types";
import { MOCK_DOSSIERS, MOCK_PROCESSES } from "../data/mockData";


interface UseInvestigationReturn {
  dossier: EmployeeDossier | null;
  processes: Process[];
  loading: boolean;
  error: string | null;
  searchDossier: (query: string) => Promise<void>;
  searchProcesses: (filters: ProcessFilters) => Promise<void>;
  clearDossier: () => void;
  clearProcesses: () => void;
}

interface ProcessFilters {
  employeeName?: string;
  executorName?: string;
  startDateStart?: string;
  startDateEnd?: string;
  taskType?: string;
  requesterSetor?: string;
  keyword?: string;
}

export function useInvestigation(): UseInvestigationReturn {
  const [dossier, setDossier] = useState<EmployeeDossier | null>(null);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchDossier = useCallback(async (query: string) => {

    setLoading(true);
    setError(null);
    setDossier(null);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const term = query.toLowerCase().trim();

        const found = MOCK_DOSSIERS.find((emp) => 
          emp.name.toLowerCase().includes(term) ||
          emp.cpf.includes(term) ||
          emp.matricula.toLowerCase().includes(term) ||
          emp.email.toLowerCase().includes(term)
        );

        if (found) {
          setDossier(found);
        } else {
          setError("Nenhum colaborador encontrado com os dados informados.");
        }

        setLoading(false);
        resolve();
      }, 1500);
    });
  }, []);

  const searchProcesses = useCallback(async (filters: ProcessFilters) => {
    setLoading(true);
    setError(null);
    setProcesses([]);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        let filtered = MOCK_PROCESSES;

        if (filters.employeeName) {
          // Encontrar funcionários que correspondem ao nome
          const matchingEmployeeIds = MOCK_DOSSIERS
            .filter(emp => emp.name.toLowerCase().includes(filters.employeeName!.toLowerCase()))
            .map(emp => emp.id);
          
          // Filtrar processos que pertencem a esses funcionários
          filtered = filtered.filter(p => p.employee_id && matchingEmployeeIds.includes(p.employee_id));
        }

        if (filters.executorName) {
          filtered = filtered.filter(p => 
            p.executor_name.toLowerCase().includes(filters.executorName!.toLowerCase())
          );
        }

        if (filters.startDateStart) {
          filtered = filtered.filter(p => 
            new Date(p.task_startdatetime) >= new Date(filters.startDateStart!)
          );
        }

        if (filters.startDateEnd) {
          filtered = filtered.filter(p => 
            new Date(p.task_startdatetime) <= new Date(filters.startDateEnd!)
          );
        }

        if (filters.taskType) {
          filtered = filtered.filter(p => 
            p.task_type.toLowerCase().includes(filters.taskType!.toLowerCase())
          );
        }

        if (filters.requesterSetor) {
          filtered = filtered.filter(p => 
            p.requester_setor.toLowerCase().includes(filters.requesterSetor!.toLowerCase())
          );
        }

        if (filters.keyword) {
          filtered = filtered.filter(p => 
            p.requestname.toLowerCase().includes(filters.keyword!.toLowerCase()) ||
            p.task_name.toLowerCase().includes(filters.keyword!.toLowerCase()) ||
            p.flow_name.toLowerCase().includes(filters.keyword!.toLowerCase())
          );
        }

        setProcesses(filtered);
        setLoading(false);
        resolve();
      }, 1000);
    });
  }, []);

  const clearDossier = useCallback(() => {
    setDossier(null);
    setError(null);
  }, []);

  const clearProcesses = useCallback(() => {
    setProcesses([]);
    setError(null);
  }, []);

  return {
    dossier,
    processes,
    loading,
    error,
    searchDossier,
    searchProcesses,
    clearDossier,
    clearProcesses
  };
}