"use client";

interface CircularTimerProps {
  timeLeft: number;
  totalTime: number;
}

export default function CircularTimer({
  timeLeft,
  totalTime,
}: CircularTimerProps) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / totalTime;
  const strokeDashoffset = circumference * (1 - progress);
  const isUrgent = timeLeft <= 5;

  return (
    <div className="relative flex h-16 w-16 items-center justify-center">
      <svg
        className="-rotate-90 transform"
        width="64"
        height="64"
        viewBox="0 0 64 64"
      >
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="4"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke={isUrgent ? "#ef4444" : "#16a34a"}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-300 ease-linear"
        />
      </svg>
      <span
        className={`absolute text-lg font-bold tabular-nums ${
          isUrgent ? "text-red-500 animate-pulse" : "text-green-700"
        }`}
      >
        {timeLeft}
      </span>
    </div>
  );
}
