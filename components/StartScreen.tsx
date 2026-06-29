"use client";

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="screen-enter flex flex-col items-center gap-8 px-4 py-10">
      <div className="text-center">
        <div className="mb-4 text-6xl">⛳</div>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          골프 룰 퀴즈
        </h1>
        <p className="mt-2 text-green-100">Golf Rules Quiz</p>
      </div>

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-bold text-green-700">게임 규칙</h2>
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span>📝</span>
            <span>
              총 <strong>20문제</strong> — O/X 10문제 → 4지선다 10문제 순서
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span>❤️</span>
            <span>
              목숨 <strong>3개</strong> — 틀리거나 시간 초과 시 1개 감소
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span>⏱️</span>
            <span>
              문제당 <strong>15초</strong> — 남은 시간 × 5점 보너스
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span>🔥</span>
            <span>
              <strong>3연속 정답</strong> 시 콤보 보너스 +50점
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span>💯</span>
            <span>
              정답 기본 <strong>100점</strong> + 시간 보너스
            </span>
          </li>
        </ul>
      </div>

      <button
        onClick={onStart}
        className="w-full max-w-md rounded-full bg-white px-8 py-4 text-lg font-bold text-green-700 shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        시작하기 🏌️
      </button>
    </div>
  );
}
