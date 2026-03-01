
export interface DiagnosticInput {
  businessName: string;
  question1: string; // What do you do / business type
  question2: string; // Biggest problem
  email: string;
}

export type BusinessType = 'Tienda física' | 'E-commerce' | 'Servicios profesionales' | 'Agencia' | 'Marca personal' | 'Otro';

export interface DiagnosticInput {
  businessName: string;
  businessType: BusinessType;
  specificDetails: string; // Specifics based on business type
  whatTheySell: string;
  monthlyRevenue: string;
  sixMonthGoal: string;
  whatTheyHaveTried: string;
  mainBrake: string;
  organizationLevel: string;
  clientSource: string;
  email: string;
}

export interface GrowthRoute {
  name: string;
  description: string;
}

export interface InternalClassification {
  maturity: 'Bajo' | 'Medio' | 'Alto';
  urgency: 'Baja' | 'Media' | 'Alta';
  investmentPotential: string;
  recommendation: 'Prioritario' | 'Seguimiento' | 'No prioritario';
  estimatedScore: number;
}

export interface DiagnosticResult {
  isSuperficial: boolean;
  superficialMessage?: string;
  preliminarySignals: {
    observations: string[]; // Exactly 2
    possibleStructuralConflict: string; // Exactly 1
  };
  radiography: {
    whatIsHappening: string;
    whyIsHappening: string;
    internalConflict: string;
    postponedDecision: string;
  };
  mainBlindSpot: string;
  sevenDayRoute: {
    day1: string;
    day2: string;
    day3: string;
    day4: string;
    day5: string;
    day6: string;
    day7: string;
  };
  strategicLevel: 'Crítico' | 'Inestable' | 'En desarrollo' | 'Sólido';
  strategicScore: number;
  internalClassification: InternalClassification;
  summary: string;
}
