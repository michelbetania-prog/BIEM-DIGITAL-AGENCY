
import React, { useState } from 'react';
import { DiagnosticInput } from '../types';
import { Send, Target, Globe, Instagram, MessageCircle, DollarSign, AlertCircle, Quote } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: DiagnosticInput) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<DiagnosticInput>({
    businessName: '',
    websiteUrl: '',
    socialLinks: '',
    contactChannel: 'WhatsApp',
    mainGoal: '',
    budgetRange: '',
    majorChallenge: '',
    businessDescription: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-biem-card border border-white/5 p-6 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-biem-orange/5 blur-3xl rounded-full -mr-32 -mt-32"></div>
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
            <Quote className="w-4 h-4 text-biem-orange" /> Cuéntanos sobre tu visión o negocio
          </label>
          <textarea
            required
            name="businessDescription"
            value={formData.businessDescription}
            onChange={handleChange}
            rows={4}
            placeholder="¿Qué hace latir a tu negocio? Describe tu idea, tu mercado o qué te diferencia..."
            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-biem-orange transition-all placeholder:text-gray-600 resize-none"
          />
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-2">
              <Target className="w-4 h-4 text-biem-orange" /> Nombre de tu Proyecto
            </label>
            <input
              required
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Ej: Marca de Ropa Sostenible"
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-biem-orange transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-2">
              <Globe className="w-4 h-4 text-biem-orange" /> Web o Landing (si tienes)
            </label>
            <input
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              placeholder="https://tupagina.com"
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-biem-orange transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-2">
              <Instagram className="w-4 h-4 text-biem-orange" /> Redes Sociales
            </label>
            <input
              name="socialLinks"
              value={formData.socialLinks}
              onChange={handleChange}
              placeholder="@usuario o link perfil"
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-biem-orange transition-all"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-2">
              <Target className="w-4 h-4 text-biem-orange" /> ¿Cuál es tu meta ahora?
            </label>
            <input
              required
              name="mainGoal"
              value={formData.mainGoal}
              onChange={handleChange}
              placeholder="Ej: Escalar ventas en Instagram"
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-biem-orange transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-biem-orange" /> Inversión Mensual Aproximada
            </label>
            <input
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleChange}
              placeholder="Ej: $1,000 USD / mes"
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-biem-orange transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-biem-orange" /> Tu mayor obstáculo
            </label>
            <input
              required
              name="majorChallenge"
              value={formData.majorChallenge}
              onChange={handleChange}
              placeholder="Ej: No sé cómo cerrar las ventas..."
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-biem-orange transition-all"
            />
          </div>
        </div>

        <div className="md:col-span-2 mt-6">
          <button
            type="submit"
            className="w-full bg-biem-orange hover:bg-orange-500 text-white font-bold py-5 rounded-2xl shadow-xl transform active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-xl group"
          >
            Obtener Claritud Estratégica <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
          <div className="flex justify-center items-center gap-2 mt-6 text-gray-500 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Estrategas Biem listos para analizar tu visión
          </div>
        </div>
      </div>
    </form>
  );
};

export default InputForm;
