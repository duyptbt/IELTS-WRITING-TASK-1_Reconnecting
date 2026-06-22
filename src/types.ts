export type CEFRLevel = 'B1' | 'B2' | 'C1' | 'Under B1';

export interface TaskAchievement {
  rememberedVisit: boolean;
  toldNews: boolean;
  regardsToPete: boolean;
  comment: string;
}

export interface GrammarCorrection {
  original: string;
  corrected: string;
  explanation: string;
}

export interface SentenceUpgrade {
  original: string;
  upgraded: string;
  level: 'B2' | 'C1';
  reason: string;
}

export interface AIFeedback {
  level: CEFRLevel;
  wordCount: number;
  overallScoreDescription: string;
  overallFeedback: string;
  taskAchievement: TaskAchievement;
  grammarCorrections: GrammarCorrection[];
  sentenceUpgrades: SentenceUpgrade[];
  celebrationMessage?: string;
}
