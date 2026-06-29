export type QuestionType = "ox" | "mcq";

export interface OxQuestion {
  id: number;
  type: "ox";
  question: string;
  answer: boolean;
  explanation: string;
}

export interface McqQuestion {
  id: number;
  type: "mcq";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type Question = OxQuestion | McqQuestion;

export type GamePhase = "start" | "playing" | "feedback" | "result";

export interface WrongAnswer {
  question: Question;
  userAnswer: string;
}

export type Grade = "eagle" | "birdie" | "par" | "bogey" | "double-bogey";

export interface GradeInfo {
  grade: Grade;
  label: string;
  emoji: string;
  description: string;
}
