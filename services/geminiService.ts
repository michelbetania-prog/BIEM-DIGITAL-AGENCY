
import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosticInput, DiagnosticResult } from "../types";

export async function runDiagnostic(input: DiagnosticInput): Promise<DiagnosticResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Actúa como un Consultor Estratégico Senior con criterio real. Tu objetivo es analizar el negocio del usuario y entregar una "Radiografía Real" que genere claridad y tensión profesional.
    
    TONO:
    - Cercano pero estratégico.
    - Habla directamente al dueño del negocio.
    - No técnico, no robótico.
    - Directo pero respetuoso. Realista sin desmotivar.
    - Enfocado en patrones de comportamiento y conflictos reales, no solo métricas.
    - Pequeños toques creativos y elegancia.

    REGLAS CRÍTICAS:
    1. Si las respuestas son vagas o insuficientes para un análisis serio, marca isSuperficial: true y pide más datos con elegancia.
    2. No reveles la solución completa en la respuesta inmediata.
    3. Genera "preliminarySignals" con 2 observaciones automáticas generales y 1 posible conflicto estructural identificado (sin desarrollar).
    4. La sección "Radiografía Real" debe explicar: Qué pasa realmente, Por qué pasa, El conflicto interno que revela y La decisión que se está postergando.
    5. El "Punto Ciego Principal" debe ser UNA SOLA COSA dominante: "Tú conflicto estructural hoy es...".
    6. La "Mini Ruta 7 Días" debe ser un paso a paso diario concreto (Día 1 al 7).

    DATOS DEL NEGOCIO:
    - Nombre: ${input.businessName}
    - Tipo: ${input.businessType}
    - Detalles específicos: ${input.specificDetails}
    - Qué vende: ${input.whatTheySell}
    - Facturación mensual: ${input.monthlyRevenue}
    - Meta a 6 meses: ${input.sixMonthGoal}
    - Qué ha intentado: ${input.whatTheyHaveTried}
    - Principal freno: ${input.mainBrake}
    - Nivel de organización: ${input.organizationLevel}
    - Fuente de clientes: ${input.clientSource}

    RESPONDE ÚNICAMENTE EN JSON con este esquema:
    {
      "isSuperficial": boolean,
      "superficialMessage": "string (solo si isSuperficial es true)",
      "preliminarySignals": {
        "observations": ["string", "string"],
        "possibleStructuralConflict": "string"
      },
      "radiography": {
        "whatIsHappening": "string",
        "whyIsHappening": "string",
        "internalConflict": "string",
        "postponedDecision": "string"
      },
      "mainBlindSpot": "string (Tú conflicto estructural hoy es...)",
      "sevenDayRoute": {
        "day1": "string",
        "day2": "string",
        "day3": "string",
        "day4": "string",
        "day5": "string",
        "day6": "string",
        "day7": "string"
      },
      "strategicLevel": "Crítico" | "Inestable" | "En desarrollo" | "Sólido",
      "strategicScore": number (0-100),
      "internalClassification": {
        "maturity": "string",
        "urgency": "string",
        "investmentPotential": "string",
        "recommendation": "Prioritario" | "Potencial" | "Descartar",
        "estimatedScore": number
      },
      "summary": "string breve"
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          isSuperficial: { type: Type.BOOLEAN },
          superficialMessage: { type: Type.STRING },
          preliminarySignals: {
            type: Type.OBJECT,
            properties: {
              observations: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              possibleStructuralConflict: { type: Type.STRING }
            },
            required: ["observations", "possibleStructuralConflict"]
          },
          radiography: {
            type: Type.OBJECT,
            properties: {
              whatIsHappening: { type: Type.STRING },
              whyIsHappening: { type: Type.STRING },
              internalConflict: { type: Type.STRING },
              postponedDecision: { type: Type.STRING }
            },
            required: ["whatIsHappening", "whyIsHappening", "internalConflict", "postponedDecision"]
          },
          mainBlindSpot: { type: Type.STRING },
          sevenDayRoute: {
            type: Type.OBJECT,
            properties: {
              day1: { type: Type.STRING },
              day2: { type: Type.STRING },
              day3: { type: Type.STRING },
              day4: { type: Type.STRING },
              day5: { type: Type.STRING },
              day6: { type: Type.STRING },
              day7: { type: Type.STRING }
            },
            required: ["day1", "day2", "day3", "day4", "day5", "day6", "day7"]
          },
          strategicLevel: { type: Type.STRING },
          strategicScore: { type: Type.NUMBER },
          internalClassification: {
            type: Type.OBJECT,
            properties: {
              maturity: { type: Type.STRING },
              urgency: { type: Type.STRING },
              investmentPotential: { type: Type.STRING },
              recommendation: { type: Type.STRING },
              estimatedScore: { type: Type.NUMBER }
            },
            required: ["maturity", "urgency", "investmentPotential", "recommendation", "estimatedScore"]
          },
          summary: { type: Type.STRING }
        },
        required: ["isSuperficial", "preliminarySignals", "radiography", "mainBlindSpot", "sevenDayRoute", "strategicLevel", "strategicScore", "internalClassification", "summary"]
      }
    }
  });

  const result = JSON.parse(response.text);
  return result;
}
