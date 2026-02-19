
import React, { useState } from 'react';
import { DiagnosticInput, DiagnosticResult } from './types';
import Header from './components/Header';
import InputForm from './components/InputForm';
import Dashboard from './components/Dashboard';
import { runDiagnostic } from './services/geminiService';
import { Loader2, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<'form' | 'loading' | 'result'>('form');
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: DiagnosticInput) => {
    setStep('loading');
    setError(null);
    try {
      const diagnosticResult = await runDiagnostic(data);
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
        
        <main className="mt-16 mb-24">
          {step === 'form' && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-1000">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-biem-orange/10 border border-biem-orange/20 px-4 py-2 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-biem-orange" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-biem-orange">Claridad Estratégica para Emprendedores</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                  Toma el control del <br/><span className="text-biem-orange">Crecimiento de tu Negocio</span>
                </h2>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                  Cuéntanos tu visión. Nuestros estrategas analizarán tu presencia digital para entregarte una hoja de ruta con impacto real.
                </p>
              </div>
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-10 text-center font-medium">
                  {error}
                </div>
              )}
              
              <InputForm onSubmit={handleSubmit} />
            </div>
          )}

          {step === 'loading' && (
            <div className="flex flex-col items-center justify-center py-32 animate-in fade-in duration-500">
              <div className="relative mb-10">
                <div className="absolute inset-0 bg-biem-orange/20 blur-3xl rounded-full"></div>
                <Loader2 className="w-20 h-20 text-biem-orange animate-spin relative z-10" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white">Trazando tu Estrategia...</h3>
              <p className="text-gray-500 text-center max-w-sm leading-relaxed">
                Nuestros estrategas están revisando tu visión, analizando tus canales y buscando las mejores oportunidades para tu crecimiento.
              </p>
              <div className="mt-12 w-full max-w-xs space-y-4">
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-biem-orange w-full animate-[loading_3s_ease-in-out_infinite] origin-left"></div>
                </div>
                <div className="flex justify-between text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                  <span>Analizando Visión</span>
                  <span>Escalando Resultados</span>
                </div>
              </div>
            </div>
          )}

          {step === 'result' && result && (
            <Dashboard result={result} onReset={handleReset} />
          )}
        </main>

        <footer className="py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} BIEM Agency • Estrategas de Crecimiento
          </div>
          <div className="flex gap-8">
            <a href="https://biem.agency" target="_blank" className="text-gray-600 hover:text-biem-orange transition-colors text-xs font-bold uppercase">Web Oficial</a>
            <a href="https://biem.agency/portafolio" target="_blank" className="text-gray-600 hover:text-biem-orange transition-colors text-xs font-bold uppercase">Casos de Éxito</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
