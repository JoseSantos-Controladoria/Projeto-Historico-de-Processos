import React, { useState } from 'react';
import Investigation from './features/investigation';
import { Dashboard } from './features/investigation/dashboard'; // ✅ Importamos o Dashboard
import { LayoutDashboard, FileSearch, Settings, UserCircle } from 'lucide-react';

function App() {
  // ✅ 1. Estado para controlar a navegação ('investigation' é o padrão)
  const [activeTab, setActiveTab] = useState<'investigation' | 'dashboard'>('investigation');

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-20 shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-tight">Work On</h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Central Jurídica</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-2">
          
          {/* BOTÃO INVESTIGAÇÃO */}
          <div 
            onClick={() => setActiveTab('investigation')} // ✅ Muda o estado ao clicar
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${
              activeTab === 'investigation' 
                ? 'bg-blue-600 text-white shadow-sm' // Estilo Ativo
                : 'text-slate-400 hover:text-white hover:bg-slate-800' // Estilo Inativo
            }`}
          >
            <FileSearch className="w-5 h-5" />
            <span className="font-medium text-sm">Investigação</span>
          </div>

          {/* BOTÃO DASHBOARD */}
          <div 
            onClick={() => setActiveTab('dashboard')} // ✅ Muda o estado ao clicar
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${
              activeTab === 'dashboard' 
                ? 'bg-blue-600 text-white shadow-sm' // Estilo Ativo
                : 'text-slate-400 hover:text-white hover:bg-slate-800' // Estilo Inativo
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium text-sm">Dashboard</span>
          </div>

          {/* BOTÃO CONFIGURAÇÕES (Sem função por enquanto) */}
          <div className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer transition-all">
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm">Configurações</span>
          </div>

        </nav>

        <div className="p-4 border-t border-slate-800">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                 <UserCircle className="w-5 h-5 text-slate-300" />
              </div>
              <div className="text-xs">
                 <p className="text-white font-medium">José Santos</p>
                 <p className="text-slate-500">Analista de Dados</p>
              </div>
           </div>
        </div>
      </aside>

      {/* --- ÁREA PRINCIPAL --- */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-50">
        
        <div className="flex-1 overflow-auto">
          {/* ✅ 3. Lógica para trocar de tela */}
          {activeTab === 'investigation' ? (
            <Investigation />
          ) : (
            <Dashboard />
          )}
        </div>

      </main>
    </div>
  );
}

export default App;