"use client";

import type { GradeInfo, WrongAnswer } from "@/lib/types";
import { formatCorrectAnswer } from "@/lib/game-utils";

interface ResultScreenProps {
  score: number;
  gradeInfo: GradeInfo;
  correctCount: number;
  totalQuestions: number;
  wrongAnswers: WrongAnswer[];
  onRestart: () => void;
}

export default function ResultScreen({
  score,
  gradeInfo,
  correctCount,
  totalQuestions,
  wrongAnswers,
  onRestart,
}: ResultScreenProps) {
  return (
    <div className="screen-enter flex flex-col gap-6 px-4 py-8">
      <div className="rounded-2xl bg-white p-6 text-center shadow-xl">
        <div className="text-6xl mb-2">{gradeInfo.emoji}</div>
        <h2 className="text-2xl font-bold text-gray-800">게임 종료!</h2>
        <p className="mt-1 text-4xl font-bold text-green-700 tabular-nums">
          {score.toLocaleString()}점
        </p>
        <div className="mt-3 inline-block rounded-full bg-green-100 px-4 py-1">
          <span className="text-lg font-bold text-green-700">
            {gradeInfo.label}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-600">{gradeInfo.description}</p>
        <p className="mt-4 text-sm text-gray-500">
          정답 {correctCount} / {totalQuestions}
        </p>
      </div>

      {wrongAnswers.length > 0 && (
        <div className="rounded-2xl bg-white p-6 shadow-xl">
          <h3 className="mb-4 text-lg font-bold text-red-600">
            📋 틀린 문제 복습 ({wrongAnswers.length}개)
          </h3>
          <div className="max-h-64 space-y-4 overflow-y-auto">
            {wrongAnswers.map((item, index) => (
              <div
                key={item.question.id}
                className="rounded-xl border border-red-100 bg-red-50 p-4"
              >
                <p className="mb-2 text-xs font-semibold text-red-400">
                  Q{item.question.id}
                </p>
                <p className="mb-2 text-sm font-medium text-gray-800">
                  {item.question.question}
                </p>
                <p className="text-xs text-gray-500">
                  내 답:{" "}
                  <span className="font-medium text-red-600">
                    {item.userAnswer}
                  </span>
                </p>
                <p className="text-xs text-gray-500">
                  정답:{" "}
                  <span className="font-medium text-green-700">
                    {formatCorrectAnswer(item.question)}
                  </span>
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  {item.question.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {wrongAnswers.length === 0 && (
        <div className="rounded-2xl bg-white p-6 text-center shadow-xl">
          <p className="text-lg font-semibold text-green-700">
            🎉 모든 문제를 맞혔습니다!
          </p>
        </div>
      )}

      <button
        onClick={onRestart}
        className="w-full rounded-full bg-white px-8 py-4 text-lg font-bold text-green-700 shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        다시하기 🔄
      </button>
    </div>
  );
}
