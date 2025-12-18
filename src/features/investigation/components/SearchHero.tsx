import { useState, FormEvent } from "react";
import { Search, Loader2, ShieldAlert } from "lucide-react";

interface SearchHeroProps {
  onSearch: (term: string) => void;
  loading: boolean;
  error: string | null;
}

export function SearchHero({ onSearch, loading, error }: SearchHeroProps) {
  const [term, setTerm] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
      {/* Background Decorativo (Pattern) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute right-0 top-0 w-64 h-64 bg-red-600 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute left-0 bottom-0 w-48 h-48 bg-blue-600 rounded-full blur-[80px] transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 shadow-inner">
            <ShieldAlert className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Histórico de Processos
          </h1>
          <p className="text-slate-400">
            Digite o Nome, CPF ou Matrícula para acessar o Histórico Completo.
            <br />
            <span className="text-xs text-slate-500 uppercase tracking-widest mt-2 block">
              Ambiente Auditado &bull; Acesso Restrito
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            {loading ? (
              <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-red-500 transition-colors" />
            )}
          </div>
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            disabled={loading}
            placeholder="Ex: Carlos Souza ou 123.456..."
            className="w-full h-14 pl-12 pr-4 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500 focus:bg-slate-800 transition-all text-lg shadow-lg"
          />
          <button
            type="submit"
            disabled={loading || !term.trim()}
            className="absolute right-2 top-2 bottom-2 px-6 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            Investigar
          </button>
        </form>

        {error && (
          <div className="animate-in fade-in slide-in-from-top-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              <ShieldAlert className="w-4 h-4" />
              {error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}