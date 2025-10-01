


import React from 'react';
import { DESIGN_TYPES } from '../constants/design-types';
import { DesignTypeId } from '../types';

interface DesignTypeSelectorProps {
  onSelect: (typeId: DesignTypeId) => void;
}

const DesignTypeSelector: React.FC<DesignTypeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in">
      <h3 className="text-center text-xl text-slate-300 font-heading mb-8">Что вы хотите создать сегодня?</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {DESIGN_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className="group relative p-6 bg-slate-800/60 backdrop-blur-lg rounded-2xl border border-slate-700 hover:border-indigo-500 hover:bg-slate-800/80 transition-all duration-300 ease-in-out text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md hover:shadow-indigo-500/20 hover:-translate-y-1"
          >
            <div 
              className="text-indigo-400 group-hover:text-white transition-colors duration-300 mb-4"
              dangerouslySetInnerHTML={{ __html: type.svgIcon }}
            />
            <h4 className="font-bold text-white font-heading text-md sm:text-lg">{type.title}</h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">{type.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DesignTypeSelector;
