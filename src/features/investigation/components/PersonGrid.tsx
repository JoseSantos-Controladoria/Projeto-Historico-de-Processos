import React from 'react';
import { PersonProfile } from '../types';
import { PersonCard } from './PersonCard';

interface PersonGridProps {
  results: PersonProfile[];
  onSelectPerson: (person: PersonProfile) => void;
  isLoading: boolean;
}

export const PersonGrid: React.FC<PersonGridProps> = ({ results, onSelectPerson, isLoading }) => {
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 rounded-xl bg-gray-100 animate-pulse border border-gray-200" />
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return null; 
  }

  return (
    <div className="mt-6">
      <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
        Colaboradores Encontrados ({results.length})
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((person) => (
          <PersonCard 
            key={person.cpf} 
            person={person}
            onClick={onSelectPerson}
          />
        ))}
      </div>
    </div>
  );
};