import { useState, FormEvent } from "react";
import { Search, Filter, X } from "lucide-react";

interface ProcessFiltersProps {
  onSearch: (filters: ProcessFilters) => void;
  loading: boolean;
  error: string | null;
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

export function ProcessFilters({ onSearch, loading, error }: ProcessFiltersProps) {
  const [filters, setFilters] = useState<ProcessFilters>({});
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const clearFilters = () => {
    setFilters({});
    onSearch({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value && value.trim() !== "");

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-800">Buscar Processos</h2>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <Filter className="w-4 h-4" />
          Filtros Avançados
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Filtros básicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nome do Colaborador
            </label>
            <input
              type="text"
              value={filters.employeeName || ""}
              onChange={(e) => setFilters({ ...filters, employeeName: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite o nome..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nome do Executor
            </label>
            <input
              type="text"
              value={filters.executorName || ""}
              onChange={(e) => setFilters({ ...filters, executorName: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite o nome..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Tipo da Tarefa
            </label>
            <select
              value={filters.taskType || ""}
              onChange={(e) => setFilters({ ...filters, taskType: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos os tipos</option>
              <option value="taskapproval">Aprovação</option>
              <option value="taskmanual">Manual</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Setor do Solicitante
            </label>
            <input
              type="text"
              value={filters.requesterSetor || ""}
              onChange={(e) => setFilters({ ...filters, requesterSetor: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite o setor..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Palavra-chave
            </label>
            <input
              type="text"
              value={filters.keyword || ""}
              onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite uma palavra-chave..."
            />
          </div>
        </div>

        {/* Filtros avançados */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Data de Início da Tarefa (Início)
              </label>
              <input
                type="date"
                value={filters.startDateStart || ""}
                onChange={(e) => setFilters({ ...filters, startDateStart: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Data de Início da Tarefa (Fim)
              </label>
              <input
                type="date"
                value={filters.startDateEnd || ""}
                onChange={(e) => setFilters({ ...filters, startDateEnd: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* Botões */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Buscando...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Buscar
              </>
            )}
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Limpar Filtros
            </button>
          )}
        </div>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}