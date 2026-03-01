
import React, { useState, useEffect } from 'react';
import { DiagnosticInput, BusinessType } from '../types';
import { Send, ArrowRight, ArrowLeft, Mail, Quote, Target, DollarSign, Users, Settings, AlertTriangle, Instagram, Globe, ShoppingBag, Radio, CheckSquare } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: DiagnosticInput) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<DiagnosticInput>({
    businessName: '',
    businessType: 'Servicios profesionales',
    specificDetails: '',
    whatTheySell: '',
    monthlyRevenue: '',
    sixMonthGoal: '',
    whatTheyHaveTried: '',
    mainBrake: '',
    organizationLevel: '',
    clientSource: '',
    email: ''
  });

  const [microMessage, setMicroMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    const messages = [
      "Analizando tu modelo de negocio...",
      "Comparando tu situación con patrones de crecimiento...",
      "Identificando oportunidades en tu sector...",
      "Evaluando tu potencial de escalabilidad...",
      "Diseñando tu ruta estratégica..."
    ];
    
    if (step > 0 && step % 2 === 0) {
      setMicroMessage(messages[Math.floor(Math.random() * messages.length)]);
    } else {
      setMicroMessage(null);
    }
  }, [step]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    // Validation for textareas
    const currentStepFields = steps[step];
    if (step === 2 || step === 3 || step === 6 || step === 7) {
      const fieldName = step === 2 ? 'specificDetails' : step === 3 ? 'whatTheySell' : step === 6 ? 'whatTheyHaveTried' : 'mainBrake';
      const value = formData[fieldName as keyof DiagnosticInput] as string;
      if (value.length < 25) {
        setValidationError('Por favor, desarrolla más tu respuesta. Un diagnóstico de criterio real requiere datos específicos para ser efectivo.');
        return;
      }
    }
    setValidationError(null);
    setStep(step + 1);
  };
  const prevStep = () => setStep(step - 1);

  const businessTypes: BusinessType[] = ['Tienda física', 'E-commerce', 'Servicios profesionales', 'Agencia', 'Marca personal', 'Otro'];

  const getSpecificQuestion = () => {
    switch (formData.businessType) {
      case 'Tienda física':
        return {
          label: "¿Cómo es el tráfico en tu local y cuál es tu ticket promedio?",
          placeholder: "Ej: Pasan 50 personas al día, ticket promedio de $25. Estamos en una zona céntrica..."
        };
      case 'E-commerce':
        return {
          label: "¿Cuál es tu tasa de conversión y qué pasa con los carritos abandonados?",
          placeholder: "Ej: Conversión del 1.5%, muchos carritos abandonados que no recuperamos..."
        };
      case 'Servicios profesionales':
      case 'Agencia':
        return {
          label: "¿Cómo es tu proceso de cierre y cuál es el valor de tus contratos?",
          placeholder: "Ej: Cierro por llamadas de Zoom, contratos de $500 a $2000..."
        };
      case 'Marca personal':
        return {
          label: "¿Cómo monetizas tu audiencia y cuál es tu mayor canal de interacción?",
          placeholder: "Ej: Vendo cursos por Instagram, mucha interacción en historias pero pocos clics..."
        };
      default:
        return {
          label: "Cuéntanos más sobre la operación diaria de tu negocio",
          placeholder: "Ej: Operamos principalmente por referidos, ticket variable..."
        };
    }
  };

  const specific = getSpecificQuestion();

  const steps = [
    {
      label: "¿A qué tipo de negocio perteneces?",
      icon: <Target className="w-6 h-6 text-biem-orange" />,
      component: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in slide-in-from-right-4">
          {businessTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => { setFormData({ ...formData, businessType: type }); nextStep(); }}
              className={`p-4 rounded-2xl border transition-all text-left text-sm font-semibold ${formData.businessType === type ? 'bg-biem-orange border-biem-orange text-white' : 'bg-white border-biem-light text-biem-neutral hover:border-biem-orange/50 shadow-sm'}`}
            >
              {type}
            </button>
          ))}
        </div>
      ),
      hideNext: true
    },
    {
      label: "¿Cómo se llama tu negocio?",
      icon: <Quote className="w-6 h-6 text-biem-orange" />,
      component: (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
          <input
            required
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Ej: Innova Tech Solutions"
            className="w-full bg-white border border-biem-light rounded-2xl p-6 text-xl focus:outline-none focus:ring-2 focus:ring-biem-orange transition-all text-biem-purple shadow-sm"
            autoFocus
          />
        </div>
      )
    },
    {
      label: specific.label,
      icon: <Settings className="w-6 h-6 text-biem-orange" />,
      component: (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
          <textarea
            required
            name="specificDetails"
            value={formData.specificDetails}
            onChange={handleChange}
            rows={4}
            placeholder={specific.placeholder}
            className="w-full bg-white border border-biem-light rounded-2xl p-6 text-lg focus:outline-none focus:ring-2 focus:ring-biem-orange transition-all placeholder:text-biem-neutral/50 resize-none text-biem-purple shadow-sm"
          />
        </div>
      )
    },
    {
      label: "¿Qué vendes exactamente y a qué precio?",
      icon: <ShoppingBag className="w-6 h-6 text-biem-orange" />,
      component: (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
          <textarea
            required
            name="whatTheySell"
            value={formData.whatTheySell}
            onChange={handleChange}
            rows={3}
            placeholder="Ej: Mentoría de negocios a $997 o Zapatos de cuero a $80..."
            className="w-full bg-white border border-biem-light rounded-2xl p-6 text-lg focus:outline-none focus:ring-2 focus:ring-biem-orange transition-all placeholder:text-biem-neutral/50 resize-none text-biem-purple shadow-sm"
          />
        </div>
      )
    },
    {
      label: "¿Cuál es tu facturación promedio mensual?",
      icon: <DollarSign className="w-6 h-6 text-biem-orange" />,
      component: (
        <div className="grid grid-cols-1 gap-3 animate-in fade-in slide-in-from-right-4">
          {['Menos de $1,000', '$1,000 - $5,000', '$5,000 - $15,000', '$15,000+'].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { setFormData({ ...formData, monthlyRevenue: opt }); nextStep(); }}
              className={`p-4 rounded-2xl border transition-all text-left text-lg font-semibold ${formData.monthlyRevenue === opt ? 'bg-biem-orange border-biem-orange text-white' : 'bg-white border-biem-light text-biem-neutral hover:border-biem-orange/50 shadow-sm'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      ),
      hideNext: true
    },
    {
      label: "¿Cuál es tu meta de facturación a 6 meses?",
      icon: <ArrowRight className="w-6 h-6 text-biem-orange" />,
      component: (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
          <input
            required
            name="sixMonthGoal"
            value={formData.sixMonthGoal}
            onChange={handleChange}
            placeholder="Ej: Llegar a $10,000 constantes..."
            className="w-full bg-white border border-biem-light rounded-2xl p-6 text-xl focus:outline-none focus:ring-2 focus:ring-biem-orange transition-all text-biem-purple shadow-sm"
          />
        </div>
      )
    },
    {
      label: "¿Qué has intentado para crecer y qué no funcionó?",
      icon: <AlertTriangle className="w-6 h-6 text-biem-orange" />,
      component: (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
          <textarea
            required
            name="whatTheyHaveTried"
            value={formData.whatTheyHaveTried}
            onChange={handleChange}
            rows={3}
            placeholder="Ej: Hice anuncios pero no vendí, o contraté a alguien y no funcionó..."
            className="w-full bg-white border border-biem-light rounded-2xl p-6 text-lg focus:outline-none focus:ring-2 focus:ring-biem-orange transition-all placeholder:text-biem-neutral/50 resize-none text-biem-purple shadow-sm"
          />
        </div>
      )
    },
    {
      label: "¿Cuál es tu principal freno percibido hoy?",
      icon: <AlertTriangle className="w-6 h-6 text-biem-orange" />,
      component: (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
          <textarea
            required
            name="mainBrake"
            value={formData.mainBrake}
            onChange={handleChange}
            rows={3}
            placeholder="Ej: No tengo tiempo para vender o no sé cómo captar clientes..."
            className="w-full bg-white border border-biem-light rounded-2xl p-6 text-lg focus:outline-none focus:ring-2 focus:ring-biem-orange transition-all placeholder:text-biem-neutral/50 resize-none text-biem-purple shadow-sm"
          />
        </div>
      )
    },
    {
      label: "¿Cuál es tu nivel de organización actual?",
      icon: <CheckSquare className="w-6 h-6 text-biem-orange" />,
      component: (
        <div className="grid grid-cols-1 gap-3 animate-in fade-in slide-in-from-right-4">
          {['Caos total (hago todo yo)', 'Algo de orden (tengo procesos)', 'Sistematizado (funciona casi solo)'].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { setFormData({ ...formData, organizationLevel: opt }); nextStep(); }}
              className={`p-4 rounded-2xl border transition-all text-left text-lg font-semibold ${formData.organizationLevel === opt ? 'bg-biem-orange border-biem-orange text-white' : 'bg-white border-biem-light text-biem-neutral hover:border-biem-orange/50 shadow-sm'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      ),
      hideNext: true
    },
    {
      label: "¿Cuál es tu fuente principal de clientes hoy?",
      icon: <Users className="w-6 h-6 text-biem-orange" />,
      component: (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
          <input
            required
            name="clientSource"
            value={formData.clientSource}
            onChange={handleChange}
            placeholder="Ej: Recomendados, Instagram orgánico, Ads..."
            className="w-full bg-white border border-biem-light rounded-2xl p-6 text-xl focus:outline-none focus:ring-2 focus:ring-biem-orange transition-all text-biem-purple shadow-sm"
          />
        </div>
      )
    },
    {
      label: "Por último, ¿dónde te enviamos el diagnóstico?",
      icon: <Mail className="w-6 h-6 text-biem-orange" />,
      component: (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tucorreo@empresa.com"
            className="w-full bg-white border border-biem-light rounded-2xl p-6 text-xl focus:outline-none focus:ring-2 focus:ring-biem-orange transition-all text-biem-purple shadow-sm"
          />
        </div>
      )
    }
  ];

  const currentStepData = steps[step];

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white border border-biem-light p-8 md:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden">
        
        {/* Progress bar */}
        <div className="absolute top-0 left-0 h-1.5 bg-biem-light w-full">
           <div 
             className="h-full bg-biem-orange transition-all duration-500 ease-out" 
             style={{ width: `${((step + 1) / steps.length) * 100}%` }}
           ></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-biem-orange/5 p-3 rounded-2xl border border-biem-orange/10">
              {currentStepData.icon}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-biem-purple tracking-tight leading-tight">
              {currentStepData.label}
            </h2>
          </div>

          <form onSubmit={handleFinalSubmit} className="min-h-[250px] flex flex-col justify-between">
            <div>
              {currentStepData.component}

              {validationError && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-500 font-bold leading-relaxed">
                    {validationError}
                  </p>
                </div>
              )}

              {microMessage && !validationError && (
                <div className="mt-8 p-4 bg-biem-orange/10 border border-biem-orange/20 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2">
                  <AlertTriangle className="w-5 h-5 text-biem-orange flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-biem-orange font-medium leading-relaxed">
                    {microMessage}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-12 flex justify-between items-center">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 text-biem-neutral hover:text-biem-purple transition-colors font-bold uppercase tracking-widest text-xs"
                >
                  <ArrowLeft className="w-4 h-4" /> Anterior
                </button>
              ) : <div></div>}

              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={step === 0 && !formData.businessName}
                  className="bg-biem-orange hover:bg-orange-700 text-white font-extrabold px-8 py-4 rounded-2xl shadow-xl transition-all flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-biem-orange hover:bg-orange-700 text-white font-extrabold px-10 py-5 rounded-2xl shadow-xl transition-all flex items-center gap-3 text-lg group"
                >
                  Finalizar Diagnóstico <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      
      <div className="mt-8 text-center text-biem-neutral text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-4">
        <span>⏱ Toma 3 minutos</span>
        <span className="w-1 h-1 bg-biem-light rounded-full"></span>
        <span>📊 Plan personalizado</span>
        <span className="w-1 h-1 bg-biem-light rounded-full"></span>
        <span>🎯 Acciones concretas</span>
      </div>
    </div>
  );
};

export default InputForm;
