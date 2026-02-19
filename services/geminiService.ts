
import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosticInput, DiagnosticResult } from "../types";

export async function runDiagnostic(input: DiagnosticInput): Promise<DiagnosticResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Actúa como un Senior Growth Coach de la agencia BIEM. Tu misión es analizar la visión y presencia digital de un emprendedor y ofrecerle claridad estratégica.
    
    INFORMACIÓN DEL EMPRENDEDOR:
    Negocio: ${input.businessName}
    Visión/Descripción: ${input.businessDescription}
    Sitio Web: ${input.websiteUrl}
    Redes: ${input.socialLinks}
    Objetivo: ${input.mainGoal}
    Presupuesto: ${input.budgetRange}
    Desafío Crítico: ${input.majorChallenge}

    TU TONO:
    - Eres un Mentor/Coach experto. No suenes como una máquina.
    - Inspirador, directo, profesional y empático con los retos del emprendedor.
    - Utiliza "nosotros" (referiéndote a BIEM como el equipo que lo apoyará).
    - No menciones que eres una IA. Habla desde la experiencia de BIEM.

    INSTRUCCIONES DE ANÁLISIS:
    1. Investiga discretamente el mercado y su presencia web (si aplica).
    2. Identifica brechas entre lo que el emprendedor quiere lograr y lo que está haciendo hoy.
    3. Genera un "Growth Score" que refleje su madurez digital actual.
    4. Crea un "Mensaje del Coach" (coachToneMessage) que resuma tu visión sobre su negocio y lo motive a dar el siguiente paso.

    FORMATO DE RESPUESTA:
    Devuelve un JSON con: overallScore, summary, categories (estrategia, conversión, branding, retención), strengths, weaknesses, topPriorities (con impacto y acción), educationalInsight y coachToneMessage.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overallScore: { type: Type.NUMBER },
          summary: { type: Type.STRING },
          coachToneMessage: { type: Type.STRING },
          categories: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                score: { type: Type.NUMBER },
                observation: { type: Type.STRING }
              },
              required: ["name", "score", "observation"]
            }
          },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
          topPriorities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                action: { type: Type.STRING },
                impact: { type: Type.STRING }
              },
              required: ["title", "action", "impact"]
            }
          },
          educationalInsight: { type: Type.STRING }
        },
        required: ["overallScore", "summary", "coachToneMessage", "categories", "strengths", "weaknesses", "topPriorities", "educationalInsight"]
      }
    }
  });

  const result = JSON.parse(response.text);
  
  if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
    result.groundingSources = response.candidates[0].groundingMetadata.groundingChunks;
  }

  return result;
}
