"use client";

import CircularTimer from "./CircularTimer";
import type { Question } from "@/lib/types";
import { TIMER_SECONDS } from "@/lib/game-utils";

interface QuizScreenProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  lives: number;
  score: number;
  combo: number;
  timeLeft: number;
  onAnswer: (answer: boolean | number) => void;
  disabled: boolean;
}

export default function QuizScreen({
  question,
  questionIndex,
  totalQuestions,
  lives,
  score,
  combo,
  timeLeft,
  onAnswer,
  disabled,
}: QuizScreenProps) {
  const isOx = question.type === "ox";
  const sectionLabel = isOx ? "O/X 퀴즈" : "4지선다";

  return (
    <div className="screen-enter flex flex-col gap-4 px-4 py-6">
      {/* 상태 바 */}
      <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-lg">
        <div className="flex items-center gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className={`text-xl transition-opacity ${
                i < lives ? "opacity-100" : "opacity-20 grayscale"
              }`}
            >
              ❤️
            </span>
          ))}
        </div>

        <div className="text-center">
          <div className="text-xs text-gray-500">점수</div>
          <div className="text-lg font-bold text-green-700 tabular-nums">
            {score.toLocaleString()}
          </div>
        </div>

        <div className="text-center">
          <div className="text-xs text-gray-500">콤보</div>
          <div
            className={`text-lg font-bold tabular-nums ${
              combo >= 2 ? "text-orange-500" : "text-gray-400"
            }`}
          >
            {combo > 0 ? `🔥${combo}` : "—"}
          </div>
        </div>

        <CircularTimer timeLeft={timeLeft} totalTime={TIMER_SECONDS} />
      </div>

      {/* 진행 표시 */}
      <div className="flex items-center justify-between text-sm text-green-100">
        <span>
          {sectionLabel} · {questionIndex + 1}/{totalQuestions}
        </span>
        <div className="h-2 flex-1 mx-3 rounded-full bg-green-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-white transition-all duration-500"
            style={{
              width: `${((questionIndex + 1) / totalQuestions) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* 문제 카드 */}
      <div className="flex-1 rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          Q{questionIndex + 1}
        </div>
        <h2 className="mb-6 text-lg font-semibold leading-relaxed text-gray-800 sm:text-xl">
          {question.question}
        </h2>

        {isOx ? (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onAnswer(true)}
              disabled={disabled}
              className="rounded-2xl border-2 border-green-200 bg-green-50 py-8 text-4xl font-bold text-green-700 transition-all hover:border-green-500 hover:bg-green-100 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              O
            </button>
            <button
              onClick={() => onAnswer(false)}
              disabled={disabled}
              className="rounded-2xl border-2 border-red-200 bg-red-50 py-8 text-4xl font-bold text-red-600 transition-all hover:border-red-400 hover:bg-red-100 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              X
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswer(index)}
                disabled={disabled}
                className="flex w-full items-center gap-3 rounded-xl border-2 border-gray-200 px-4 py-4 text-left transition-all hover:border-green-500 hover:bg-green-50 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                  {index + 1}
                </span>
                <span className="text-gray-800">{option}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
