import type { Grade, GradeInfo, Question } from "./types";

export const TIMER_SECONDS = 15;
export const MAX_LIVES = 3;
export const BASE_SCORE = 100;
export const TIME_BONUS_MULTIPLIER = 5;
export const COMBO_THRESHOLD = 3;
export const COMBO_BONUS = 50;

export function calculateScore(timeLeft: number): number {
  return BASE_SCORE + timeLeft * TIME_BONUS_MULTIPLIER;
}

export function isCorrectAnswer(
  question: Question,
  answer: boolean | number | null,
): boolean {
  if (answer === null) return false;

  if (question.type === "ox") {
    return answer === question.answer;
  }

  return answer === question.correctIndex;
}

export function formatUserAnswer(
  question: Question,
  answer: boolean | number | null,
): string {
  if (answer === null) return "시간 초과";

  if (question.type === "ox") {
    return answer === true ? "O" : "X";
  }

  if (typeof answer !== "number") return "—";

  return `${answer + 1}. ${question.options[answer]}`;
}

export function formatCorrectAnswer(question: Question): string {
  if (question.type === "ox") {
    return question.answer ? "O" : "X";
  }

  return `${question.correctIndex + 1}. ${question.options[question.correctIndex]}`;
}

export function getGrade(score: number): GradeInfo {
  if (score >= 2500) {
    return {
      grade: "eagle",
      label: "이글",
      emoji: "🦅",
      description: "완벽에 가까운 골프 룰 마스터!",
    };
  }
  if (score >= 2000) {
    return {
      grade: "birdie",
      label: "버디",
      emoji: "🐦",
      description: "훌륭한 실력! 조금만 더 연습하면 이글이에요.",
    };
  }
  if (score >= 1500) {
    return {
      grade: "par",
      label: "파",
      emoji: "⛳",
      description: "기본기가 탄탄합니다. 복습하면 더 좋아질 거예요.",
    };
  }
  if (score >= 1000) {
    return {
      grade: "bogey",
      label: "보기",
      emoji: "🏌️",
      description: "기본 규칙은 알고 있어요. 틀린 문제를 복습해 보세요.",
    };
  }
  return {
    grade: "double-bogey",
    label: "더블보기",
    emoji: "😅",
    description: "골프 룰을 다시 공부해 볼까요? 다시 도전해 보세요!",
  };
}
