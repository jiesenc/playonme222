export interface UploadData {
  id: string;
  filename: string;
  uploadDate: Date;
  model: 'Standard' | 'Federer' | 'Nadal';
  analyzed: boolean;
  score?: number;
}

export interface AnalysisResult {
  id: string;
  uploadId: string;
  score: number;
  feedback: string[];
  mistakes: {
    timestamp: number;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }[];
  improvements: string[];
}

export type TabType = 'upload' | 'analysis' | 'profile' | 'pricing';

export interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  limitations?: string[];
  popular?: boolean;
  color: string;
  bgColor: string;
}

export interface Subscription {
  plan: string;
  billing: 'monthly' | 'yearly';
  status: 'active' | 'cancelled' | 'expired';
  nextBilling?: Date;
}