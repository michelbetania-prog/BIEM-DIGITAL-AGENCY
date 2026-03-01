
import React, { useState } from 'react';
import { DiagnosticResult } from '../types';
import { Zap, RefreshCcw, ShieldCheck, Mail, Download, ArrowRight, MessageSquareQuote, AlertTriangle } from 'lucide-react';

interface DashboardProps {
  result: DiagnosticResult;
}

const Dashboard: React.FC<DashboardProps> = ({ result }) => {
  const [showAdmin, setShowAdmin] = useState(false);

  if (result.isSuperficial) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8 py-12 animate-in fade-in duration-700">
        <div className="bg-red-50 border border-red-100 p-8 rounded-[2rem] shadow-sm">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-6" />
          <p className="text-xl text-biem-dark font-medium leading-relaxed">
            {result.superficialMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-10 duration-700">
      
      {/* Status Bar */}
      <div className="bg-biem-orange/10 border border-biem-orange/20 rounded-2xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-biem-orange p-2 rounded-lg">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-biem-orange">Diagnóstico Estratégico Generado</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
          <ShieldCheck className="w-3 h-3" /> Análisis de Criterio Real
        </div>
      </div>

      {/* Main Diagnostic Card */}
      <div className="bg-white border border-biem-light rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-xl orange-glow">
        <div className="absolute -top-10 -left-10 opacity-5">
          <MessageSquareQuote size={200} className="text-biem-purple" />
        </div>
        
        <div className="relative z-10 space-y-12">
          
          {/* Primeras Señales Detectadas */}
          <section className="animate-in fade-in slide-in-from-left-4 duration-500">
            <h3 className="text-2xl md:text-3xl font-black text-biem-purple mb-6 flex items-center gap-3">
              <span className="text-biem-orange">📡</span> Primeras Señales Detectadas en Tu Negocio
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.preliminarySignals.observations.map((obs, idx) => (
                  <div key={idx} className="bg-white border border-biem-light p-6 rounded-3xl shadow-sm flex gap-4">
                    <div className="w-2 h-2 bg-biem-orange rounded-full mt-2 flex-shrink-0" />
                    <p className="text-biem-dark font-medium">{obs}</p>
                  </div>
                ))}
              </div>
              <div className="bg-biem-orange/5 border border-biem-orange/20 p-6 rounded-3xl shadow-sm">
                <h4 className="text-biem-orange font-black text-xs uppercase tracking-widest mb-2">Posible Conflicto Estructural</h4>
                <p className="text-biem-dark font-bold text-lg">
                  {result.preliminarySignals.possibleStructuralConflict}
                </p>
              </div>
            </div>
          </section>

          {/* Análisis Estratégico en Desarrollo */}
          <section className="animate-in fade-in slide-in-from-left-4 duration-500 delay-200">
            <div className="bg-biem-purple text-white p-8 md:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <RefreshCcw size={150} className="animate-spin" style={{ animationDuration: '10s' }} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-3">
                <span className="text-biem-orange">⚙️</span> Análisis Estratégico en Desarrollo
              </h3>
              <div className="space-y-6 relative z-10">
                <p className="text-lg md:text-xl font-medium leading-relaxed opacity-90">
                  Lo que acabas de ver es solo una primera lectura estructural. Durante las próximas 24 horas tu negocio será analizado bajo el Sistema ACAE para identificar prioridades reales, no superficiales.
                </p>
                
                <div className="bg-white/10 p-6 rounded-3xl border border-white/10">
                  <h4 className="text-biem-orange font-black text-xs uppercase tracking-widest mb-4">Recibirás en tu correo:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 font-bold">
                      <div className="w-1.5 h-1.5 bg-biem-orange rounded-full" /> Diagnóstico estructural completo
                    </li>
                    <li className="flex items-center gap-3 font-bold">
                      <div className="w-1.5 h-1.5 bg-biem-orange rounded-full" /> Identificación clara de tu conflicto principal
                    </li>
                    <li className="flex items-center gap-3 font-bold">
                      <div className="w-1.5 h-1.5 bg-biem-orange rounded-full" /> Ruta de acción inicial personalizada
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Admin Notification Simulation */}
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Reporte interno enviado automáticamente al administrador.
            </p>
          </div>

          {/* Internal Classification */}
          <div className="pt-6">
            <button 
              onClick={() => setShowAdmin(!showAdmin)}
              className="text-[10px] text-biem-neutral hover:text-biem-purple font-bold uppercase tracking-widest flex items-center gap-2"
            >
              {showAdmin ? 'Ocultar Clasificación Interna' : 'Ver Clasificación Interna (Solo Admin)'}
            </button>
            
            {showAdmin && (
              <div className="mt-4 p-6 bg-gray-50 border border-dashed border-biem-light rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-2">
                <div>
                  <span className="block text-[9px] text-biem-neutral font-black uppercase mb-1">Madurez</span>
                  <span className="text-biem-purple font-bold">{result.internalClassification.maturity}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-biem-neutral font-black uppercase mb-1">Urgencia</span>
                  <span className="text-biem-purple font-bold">{result.internalClassification.urgency}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-biem-neutral font-black uppercase mb-1">Inversión</span>
                  <span className="text-biem-purple font-bold">{result.internalClassification.investmentPotential}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-biem-neutral font-black uppercase mb-1">Score (0-100)</span>
                  <span className="text-biem-orange font-black">{result.internalClassification.estimatedScore}</span>
                </div>
                <div className="col-span-2 md:col-span-4 pt-2 border-t border-biem-light">
                  <span className="block text-[9px] text-biem-neutral font-black uppercase mb-1">Recomendación</span>
                  <span className={`text-xs font-black uppercase tracking-widest ${result.internalClassification.recommendation === 'Prioritario' ? 'text-emerald-500' : 'text-biem-neutral'}`}>
                    {result.internalClassification.recommendation}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Closing Message */}
          <div className="pt-10 border-t border-biem-light space-y-6">
            <p className="text-biem-dark text-lg font-bold italic">
              “La claridad profunda no se improvisa. Se construye.”
            </p>
            
            <div className="bg-biem-orange/5 border border-biem-orange/10 p-8 rounded-3xl text-center space-y-6">
              <h4 className="text-2xl font-black text-biem-purple">Agenda tu Sesión de Claridad Estratégica – 45 minutos</h4>
              <p className="text-biem-orange font-bold uppercase tracking-widest text-sm">Solo 10 sesiones estratégicas disponibles cada mes.</p>
              <button 
                onClick={() => window.open('https://wa.me/message/7U7KBWNX7E2CP1', '_blank')}
                className="w-full bg-biem-orange hover:bg-orange-700 text-white font-black py-6 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 text-xl group"
              >
                Reservar mi Sesión vía WhatsApp <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center text-biem-neutral pt-8 border-t border-biem-light">
        <div className="text-[9px] text-biem-neutral font-black uppercase tracking-widest">
          BIEM INSIGHT v4.0 • CONSULTORÍA ESTRATÉGICA
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
