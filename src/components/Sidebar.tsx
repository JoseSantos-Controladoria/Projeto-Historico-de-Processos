import React from 'react';
import { Users, FileText, ShieldAlert } from 'lucide-react'; // Adicionei um ícone extra para logo/marca

// Definindo a tipagem aqui ou importando de um arquivo de types global
// Para manter simples agora, vamos replicar o tipo, mas o ideal seria exportar TabType
type TabType = 'dossiers' | 'processes';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dossiers', label: 'Dossiês', icon: Users },
    { id: 'processes', label: 'Processos', icon: FileText },
  ] as const;

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 h-screen fixed left-0 top-0 flex flex-col border-r border-slate-800">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-3 text-white border-b border-slate-800 mb-6">
        <ShieldAlert className="w-8 h-8 text-blue-500" />
        <span className="font-bold text-lg tracking-tight">Investigação</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer/User Area (Placeholder para dar um toque profissional) */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
            JS
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-white font-medium">Dev Pleno</span>
            <span className="text-xs text-slate-500">Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
};