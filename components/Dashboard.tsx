
import React from 'react';
import { DiagnosticResult } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CheckCircle2, XCircle, Zap, Info, ChevronRight, RefreshCcw, ExternalLink, Calendar, MessageSquareQuote } from 'lucide-react';

interface DashboardProps {
  result: DiagnosticResult;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ result, onReset }) => {
  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-10 duration-700">
      {/* Intro Coach Message */}
      <div className="bg-biem-orange/5 border border-biem-orange/20 rounded-3xl p-8 md:p-10 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 opacity-10">
          <MessageSquareQuote size={120} className="text-biem-orange" />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
            <span className="bg-biem-orange w-10 h-10 rounded-full flex items-center justify-center text-white">
              <Zap size={20} />
            </span>
            Análisis de tu Coach de Crecimiento
          </h2>
          <p className="text-lg md:text-xl text-gray-200 font-medium italic leading-relaxed">
            "{result.coachToneMessage}"
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-biem-card border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center orange-glow">
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">Nivel de Madurez Estratégica</h3>
          <div className="relative w-56 h-56 mb-6">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={[{ value: result.overallScore }, { value: 100 - result.overallScore }]}
                   cx="50%"
                   cy="50%"
                   innerRadius={75}
                   outerRadius={95}
                   startAngle={90}
                   endAngle={450}
                   paddingAngle={0}
                   dataKey="value"
                   stroke="none"
                 >
                   <Cell fill="#ff7315" />
                   <Cell fill="#1a1a1a" />
                 </Pie>
               </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-6xl font-black text-white">{result.overallScore}</span>
               <span className="text-sm text-biem-orange font-bold">SCORE</span>
             </div>
          </div>
          <div className="bg-biem-orange/10 text-biem-orange px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-tighter">
            {result.overallScore > 80 ? 'Potencial de Escalamiento' : result.overallScore > 50 ? 'Fase de Optimización' : 'Necesita Rebase Estratégico'}
          </div>
        </div>

        <div className="lg:col-span-2 bg-biem-card border border-white/5 rounded-3xl p-8 md:p-10">
          <h3 className="text-2xl font-bold mb-6 text-white">Radiografía del Negocio</h3>
          <p className="text-gray-400 leading-relaxed mb-8 text-lg">
            {result.summary}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1 h-1 bg-emerald-500 rounded-full"></div> Fortalezas Detectadas
              </h4>
              {result.strengths.map((s, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-gray-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" /> {s}
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1 h-1 bg-biem-orange rounded-full"></div> Puntos de Fricción
              </h4>
              {result.weaknesses.map((w, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-gray-200">
                  <XCircle className="w-5 h-5 text-biem-orange flex-shrink-0" /> {w}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Areas Detail */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {result.categories.map((cat, i) => (
          <div key={i} className="bg-biem-card border border-white/5 p-6 rounded-2xl hover:border-biem-orange/30 transition-all">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold text-gray-300 uppercase tracking-tight">{cat.name}</span>
              <span className="text-lg font-bold text-biem-orange">{cat.score}%</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full mb-4">
              <div className="h-full bg-biem-orange rounded-full" style={{ width: `${cat.score}%` }}></div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              {cat.observation}
            </p>
          </div>
        ))}
      </div>

      {/* Main CTA Section */}
      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 text-black grid grid-cols-1 lg:grid-cols-2 gap-10 items-center overflow-hidden relative">
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-biem-orange/10 rounded-full blur-3xl -mb-32 -mr-32"></div>
        <div>
          <h3 className="text-3xl md:text-4xl font-black leading-tight mb-6">
            ¿Listo para llevar tu visión al siguiente nivel?
          </h3>
          <p className="text-lg text-gray-600 mb-8 font-medium">
            Acabamos de identificar tu hoja de ruta. El siguiente paso es una <span className="text-black font-bold">Sesión Estratégica 1-a-1</span> con nuestro equipo para aterrizar estos resultados en un plan de ejecución real.
          </p>
          <div className="space-y-5">
            {result.topPriorities.map((p, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-bold text-black">{p.title}</h4>
                  <p className="text-sm text-gray-500">{p.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-biem-dark rounded-3xl p-8 text-white shadow-2xl relative">
          <div className="absolute -top-4 -right-4 bg-biem-orange text-white px-4 py-2 rounded-xl text-xs font-bold uppercase animate-pulse">
            Cupos Limitados
          </div>
          <h4 className="text-2xl font-bold mb-4">Agendar Consultoría</h4>
          <p className="text-gray-400 text-sm mb-8">
            Revisaremos tu score de <span className="text-biem-orange font-bold">{result.overallScore}/100</span> y definiremos los KPIs para escalar.
          </p>
          <button 
            onClick={() => window.open('https://biem.agency/calendly', '_blank')}
            className="w-full bg-biem-orange hover:bg-orange-500 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02]"
          >
            <Calendar size={22} /> Reservar mi Sesión <ChevronRight size={18} />
          </button>
          <p className="text-center text-[10px] text-gray-600 mt-6 uppercase tracking-widest font-bold">
            Estrategas BIEM • Sin Compromiso • 30 Minutos de Valor
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center text-gray-600 pt-8 border-t border-white/5">
        <div className="flex gap-6 items-center">
          <button onClick={onReset} className="text-xs hover:text-white flex items-center gap-2 transition-colors uppercase font-bold tracking-widest">
            <RefreshCcw size={14} /> Repetir Análisis
          </button>
        </div>
        <div className="text-[10px] text-gray-800 font-bold uppercase tracking-widest">
          Biem Growth Coach v2.0
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
