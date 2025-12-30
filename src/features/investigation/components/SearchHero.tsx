import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react'; // Adicionei um ícone extra opcional

interface SearchHeroProps {
  onSearch: (term: string) => void;
}

export const SearchHero: React.FC<SearchHeroProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && typeof onSearch === 'function') {
      onSearch(inputValue);
    }
  };

  return (
    // VOLTOU O VISUAL DE CARD:
    // bg-white: Fundo branco
    // rounded-2xl: Bordas bem arredondadas
    // shadow-sm/border: Para dar o efeito de relevo
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center transition-all hover:shadow-md">
      
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-blue-50 rounded-full">
           <Sparkles className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        Investigação de Processos
      </h1>
      
      <p className="text-slate-500 mb-8 max-w-lg mx-auto">
        Digite o <span className="font-medium text-slate-700">Nome</span>, <span className="font-medium text-slate-700">CPF</span> ou <span className="font-medium text-slate-700">ID</span> para visualizar o dossiê completo.
      </p>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto relative">
        <div className="relative group">
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 focus:outline-none transition-all shadow-sm"
            placeholder="Ex: Fabio Jose ou 307.815..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
            <Search className="w-5 h-5" />
          </div>
          
          {/* Botão de buscar agora fica oculto visualmente ou discreto, pois o Enter já envia */}
          <button 
             type="submit" 
             className="absolute right-2 top-2 bottom-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
};