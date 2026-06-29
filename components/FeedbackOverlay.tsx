"use client";

interface FeedbackOverlayProps {
  isCorrect: boolean;
  explanation: string;
  correctAnswer: string;
  earnedPoints: number;
  comboBonus: number;
}

export default function FeedbackOverlay({
  isCorrect,
  explanation,
  correctAnswer,
  earnedPoints,
  comboBonus,
}: FeedbackOverlayProps) {
  return (
    <div
      className={`feedback-enter fixed inset-0 z-50 flex items-center justify-center px-4 ${
        isCorrect ? "bg-green-600/90" : "bg-red-600/90"
      }`}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
        <div className="mb-2 text-5xl">{isCorrect ? "✅" : "❌"}</div>
        <h3
          className={`mb-2 text-2xl font-bold ${
            isCorrect ? "text-green-600" : "text-red-600"
          }`}
        >
          {isCorrect ? "정답!" : "오답!"}
        </h3>

        {isCorrect && earnedPoints > 0 && (
          <p className="mb-1 text-lg font-semibold text-green-700">
            +{earnedPoints}점
          </p>
        )}

        {comboBonus > 0 && (
          <p className="mb-2 text-lg font-bold text-orange-500 animate-bounce">
            🔥 콤보 보너스 +{comboBonus}점!
          </p>
        )}

        {!isCorrect && (
          <p className="mb-2 text-sm font-medium text-gray-600">
            정답: <span className="text-green-700">{correctAnswer}</span>
          </p>
        )}

        <p className="text-sm leading-relaxed text-gray-600">{explanation}</p>
      </div>
    </div>
  );
}
