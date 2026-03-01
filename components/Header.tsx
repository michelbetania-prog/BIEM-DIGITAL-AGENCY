
import React from 'react';
import { UserCheck, Activity } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full flex justify-between items-center py-8">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="text-2xl font-extrabold tracking-tighter text-biem-purple flex items-center gap-1">
            BIEM<span className="text-biem-orange">Insight</span>
          </span>
          <span className="text-[9px] uppercase tracking-[0.4em] text-biem-dark font-black">Strategic Diagnosis</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="px-4 py-1.5 rounded-full border border-biem-orange/20 bg-biem-orange/5">
          <span className="text-[10px] font-black uppercase tracking-widest text-biem-orange">FASE 1: CLARIDAD ESTRATÉGICA</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
