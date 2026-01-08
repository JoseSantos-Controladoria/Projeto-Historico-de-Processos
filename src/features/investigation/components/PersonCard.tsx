import React from 'react';
import { PersonProfile } from '../types';
import { User, Building2, Briefcase, FileText, Search } from 'lucide-react';

interface PersonCardProps {
  person: PersonProfile;
  onClick: (person: PersonProfile) => void;
}

export const PersonCard: React.FC<PersonCardProps> = ({ person, onClick }) => {
  const hasProcesses = person.totalProcesses > 0;

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  return (
    <div 
      onClick={() => onClick(person)}
      className={`
        relative group cursor-pointer rounded-xl border p-4 transition-all duration-200
        hover:shadow-md
        ${hasProcesses 
          ? 'bg-white border-blue-200 hover:border-blue-400' 
          : 'bg-gray-50 border-gray-200 opacity-75 hover:opacity-100'
        }
      `}
    >
      <div className={`
        absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
        ${hasProcesses 
          ? 'bg-blue-50 text-blue-700 border border-blue-100' 
          : 'bg-gray-200 text-gray-500'
        }
      `}>
        {hasProcesses ? <FileText size={12} /> : <Search size={12} />}
        <span>
          {person.totalProcesses} {person.totalProcesses === 1 ? 'Processo' : 'Processos'}
        </span>
      </div>

      <div className="flex items-start gap-4 pr-24"> 
        
        <div className={`
          flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm
          ${hasProcesses 
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
            : 'bg-gray-300 text-gray-600'
          }
        `}>
          {person.name.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className={`truncate text-sm font-bold ${hasProcesses ? 'text-gray-900' : 'text-gray-700'}`}>
            {person.name}
          </h3>
          
          <div className="mt-1 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <User size={12} />
              <span className="font-mono">{person.cpf.length === 11 ? formatCPF(person.cpf) : person.cpf}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Briefcase size={12} />
              <span className="truncate">{person.role}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Building2 size={12} />
              <span className="truncate">{person.sector}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
         <span className={`text-xs font-medium transition-colors ${hasProcesses ? 'text-blue-600 group-hover:text-blue-700' : 'text-gray-400'}`}>
            {hasProcesses ? 'Ver Dossiê Completo →' : 'Ver Dados Cadastrais →'}
         </span>
      </div>
    </div>
  );
};