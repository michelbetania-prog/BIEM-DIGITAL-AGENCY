
import React, { useState } from 'react';
import { DiagnosticInput, DiagnosticResult } from './types';
import Header from './components/Header';
import InputForm from './components/InputForm';
import Dashboard from './components/Dashboard';
import { runDiagnostic } from './services/geminiService';
import { Loader2, Sparkles, ClipboardCheck, PlayCircle, MapPin, ShieldCheck, Users, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<'form' | 'loading' | 'result'>('form');
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [usageCount, setUsageCount] = useState<number>(() => {
    const saved = localStorage.getItem('biem_usage_count');
    return saved ? parseInt(saved, 10) : 0;
  });

  const handleSubmit = async (data: DiagnosticInput) => {
    if (usageCount >= 1) {
      setError('Has utilizado tu diagnóstico disponible. BIEM Insight está diseñado para decisiones reales de negocio. Si deseas avanzar, agenda tu Sesión de Claridad Estratégica.');
      return;
    }

    setStep('loading');
    setError(null);
    try {
      const diagnosticResult = await runDiagnostic(data);
      
      // Increment usage count only on successful diagnostic (not superficial)
      if (!diagnosticResult.isSuperficial) {
        const newCount = usageCount + 1;
        setUsageCount(newCount);
        localStorage.setItem('biem_usage_count', newCount.toString());
      }
      
      // Simulate sending internal PDF to admin
      console.log('--- ADMIN REPORT DATA ---');
      console.log('Business:', data.businessName);
      console.log('Type:', data.businessType);
      console.log('Score:', diagnosticResult.internalClassification.estimatedScore);
      console.log('Recommendation:', diagnosticResult.internalClassification.recommendation);
      console.log('Full Input:', data);
      console.log('-------------------------');

      setResult(diagnosticResult);
      setStep('result');
    } catch (err) {
      console.error(err);
      setError('Lo sentimos, algo no salió como esperábamos. Por favor, reintenta tu diagnóstico.');
      setStep('form');
    }
  };

  const handleReset = () => {
    setResult(null);
    setStep('form');
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-6 md:px-12">
      <div className="w-full max-w-6xl">
        <Header />
        
        <main className="mt-12 mb-24">
          {step === 'form' && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-1000">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-biem-orange/5 border border-biem-orange/10 px-4 py-2 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-biem-orange" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-biem-orange">FASE 1: CLARIDAD ESTRATÉGICA</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-extrabold text-biem-purple mb-4 tracking-tight leading-tight">
                  BIEM<span className="text-biem-orange">Insight</span> — <br/><span className="text-biem-purple">Diagnóstico de Criterio Real</span>
                </h2>
                <p className="text-biem-dark text-xl md:text-2xl font-semibold max-w-3xl mx-auto leading-relaxed mb-4">
                  "Generamos la claridad estructural necesaria para escalar tu negocio al siguiente nivel."
                </p>
                <div className="flex flex-wrap justify-center gap-6 text-biem-neutral text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-biem-orange" /> Diagnóstico de Criterio Real
                  </span>
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-biem-orange" /> 1 diagnóstico gratuito disponible
                  </span>
                </div>
              </div>
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl mb-10 text-center font-medium max-w-2xl mx-auto leading-relaxed">
                  {error}
                  {usageCount >= 1 && (
                    <div className="mt-6">
                      <button 
                        onClick={() => window.open('https://wa.me/message/7U7KBWNX7E2CP1', '_blank')}
                        className="bg-biem-orange hover:bg-orange-700 text-white font-black py-4 px-8 rounded-xl shadow-xl transition-all flex items-center justify-center gap-3 mx-auto text-sm"
                      >
                        Agendar Sesión vía WhatsApp <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {usageCount < 1 && <InputForm onSubmit={handleSubmit} />}

              {/* Process Steps Section */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="relative flex flex-col items-center text-center px-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-biem-orange font-bold text-lg mb-4 z-10 bg-biem-dark transition-all group-hover:border-biem-orange/50 step-line relative">
                    1
                  </div>
                  <h4 className="text-white font-bold mb-1">Paso 1: Responde</h4>
                  <p className="text-gray-400 text-xs">Comparte tu visión y desafíos actuales.</p>
                </div>
                <div className="relative flex flex-col items-center text-center px-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-biem-orange font-bold text-lg mb-4 z-10 bg-biem-dark transition-all group-hover:border-biem-orange/50 step-line relative">
                    2
                  </div>
                  <h4 className="text-white font-bold mb-1">Paso 2: Diagnóstico en vivo</h4>
                  <p className="text-gray-400 text-xs">Nuestro sistema analiza tu huella digital.</p>
                </div>
                <div className="relative flex flex-col items-center text-center px-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-biem-orange font-bold text-lg mb-4 z-10 bg-biem-dark transition-all group-hover:border-biem-orange/50">
                    3
                  </div>
                  <h4 className="text-white font-bold mb-1">Paso 3: Ruta de acción</h4>
                  <p className="text-gray-400 text-xs">Recibe recomendaciones priorizadas.</p>
                </div>
              </div>
            </div>
          )}

          {step === 'loading' && (
            <div className="flex flex-col items-center justify-center py-32 animate-in fade-in duration-500">
              <div className="relative mb-10">
                <div className="absolute inset-0 bg-biem-orange/20 blur-3xl rounded-full"></div>
                <Loader2 className="w-20 h-20 text-biem-orange animate-spin relative z-10" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white">Generando Insight Estratégico...</h3>
              <p className="text-gray-400 text-center max-w-sm leading-relaxed">
                Estamos analizando brechas de mercado y oportunidades de crecimiento específicas para tu negocio.
              </p>
              <div className="mt-12 w-full max-w-xs space-y-4">
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-biem-orange w-full animate-[loading_3s_ease-in-out_infinite] origin-left"></div>
                </div>
              </div>
            </div>
          )}

          {step === 'result' && result && (
            <Dashboard result={result} />
          )}
        </main>

        <footer className="py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} BIEM Insight • Inteligencia de Crecimiento
          </div>
          <div className="flex gap-8">
            <a href="https://biem.agency" target="_blank" className="text-gray-500 hover:text-biem-orange transition-colors text-xs font-bold uppercase">Web Oficial</a>
            <a href="https://biem.agency/contacto" target="_blank" className="text-gray-500 hover:text-biem-orange transition-colors text-xs font-bold uppercase">Contacto</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
