
import React from 'react';
import { UserCheck } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full flex justify-between items-center py-6 border-b border-white/5">
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-2xl font-bold tracking-tight text-white flex items-center gap-1">
            Biem<span className="w-2 h-2 rounded-full bg-biem-orange inline-block"></span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Agencia de Marketing</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-xs font-semibold text-gray-400">Consultoría de Crecimiento</span>
          <span className="text-[10px] text-biem-orange font-bold uppercase tracking-widest">Estrategia en Tiempo Real</span>
        </div>
        <div className="bg-biem-orange/10 p-2 rounded-full">
          <UserCheck className="text-biem-orange w-5 h-5" />
        </div>
      </div>
    </header>
  );
};

export default Header;
