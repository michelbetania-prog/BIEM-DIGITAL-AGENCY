
export interface DiagnosticInput {
  businessName: string;
  websiteUrl: string;
  socialLinks: string;
  contactChannel: string;
  mainGoal: string;
  budgetRange: string;
  majorChallenge: string;
  businessDescription: string; // New field for business context
}

export interface CategoryScore {
  name: string;
  score: number;
  observation: string;
}

export interface PriorityAction {
  title: string;
  action: string;
  impact: 'Alto' | 'Medio' | 'Bajo';
}

export interface DiagnosticResult {
  overallScore: number;
  categories: CategoryScore[];
  strengths: string[];
  weaknesses: string[];
  topPriorities: PriorityAction[];
  educationalInsight: string;
  summary: string;
  coachToneMessage: string; // Added to capture the coach personality
  groundingSources?: any[];
}
