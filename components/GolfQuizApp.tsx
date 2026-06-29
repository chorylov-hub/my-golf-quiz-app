"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import StartScreen from "./StartScreen";
import QuizScreen from "./QuizScreen";
import FeedbackOverlay from "./FeedbackOverlay";
import ResultScreen from "./ResultScreen";
import { QUESTIONS, TOTAL_QUESTIONS } from "@/lib/questions";
import {
  MAX_LIVES,
  TIMER_SECONDS,
  COMBO_THRESHOLD,
  COMBO_BONUS,
  calculateScore,
  isCorrectAnswer,
  formatUserAnswer,
  formatCorrectAnswer,
  getGrade,
} from "@/lib/game-utils";
import type { GamePhase, WrongAnswer } from "@/lib/types";

interface FeedbackState {
  isCorrect: boolean;
  explanation: string;
  correctAnswer: string;
  earnedPoints: number;
  comboBonus: number;
}

const FEEDBACK_DURATION = 2000;

export default function GolfQuizApp() {
  const [phase, setPhase] = useState<GamePhase>("start");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [answering, setAnswering] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleTimeoutRef = useRef<(() => void) | null>(null);

  const currentQuestion = QUESTIONS[questionIndex];

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const fireConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#16a34a", "#22c55e", "#ffffff", "#fbbf24"],
    });
  }, []);

  const goToResult = useCallback(() => {
    clearTimer();
    setPhase("result");
  }, [clearTimer]);

  const proceedAfterFeedback = useCallback(
    (remainingLives: number) => {
      const nextIndex = questionIndex + 1;

      if (remainingLives <= 0 || nextIndex >= TOTAL_QUESTIONS) {
        goToResult();
        return;
      }

      setQuestionIndex(nextIndex);
      setTimeLeft(TIMER_SECONDS);
      setAnswering(false);
      setFeedback(null);
      setPhase("playing");
    },
    [questionIndex, goToResult],
  );

  const showFeedback = useCallback(
    (
      isCorrect: boolean,
      currentTimeLeft: number,
      newCombo: number,
      remainingLives: number,
    ) => {
      const question = QUESTIONS[questionIndex];
      let earnedPoints = 0;
      let comboBonus = 0;

      if (isCorrect) {
        earnedPoints = calculateScore(currentTimeLeft);
        if (newCombo >= COMBO_THRESHOLD && newCombo % COMBO_THRESHOLD === 0) {
          comboBonus = COMBO_BONUS;
        }
        fireConfetti();
      }

      setFeedback({
        isCorrect,
        explanation: question.explanation,
        correctAnswer: formatCorrectAnswer(question),
        earnedPoints,
        comboBonus,
      });
      setPhase("feedback");

      feedbackTimeoutRef.current = setTimeout(() => {
        proceedAfterFeedback(remainingLives);
      }, FEEDBACK_DURATION);
    },
    [questionIndex, fireConfetti, proceedAfterFeedback],
  );

  const processAnswer = useCallback(
    (answer: boolean | number | null) => {
      if (answering || phase !== "playing") return;

      setAnswering(true);
      clearTimer();

      const question = QUESTIONS[questionIndex];
      const correct = isCorrectAnswer(question, answer);
      const currentTimeLeft = timeLeft;

      if (correct) {
        const newCombo = combo + 1;
        let points = calculateScore(currentTimeLeft);

        if (newCombo >= COMBO_THRESHOLD && newCombo % COMBO_THRESHOLD === 0) {
          points += COMBO_BONUS;
        }

        setScore((prev) => prev + points);
        setCombo(newCombo);
        setCorrectCount((prev) => prev + 1);
        showFeedback(true, currentTimeLeft, newCombo, lives);
      } else {
        const newLives = lives - 1;
        setLives(newLives);
        setCombo(0);
        setWrongAnswers((prev) => [
          ...prev,
          {
            question,
            userAnswer: formatUserAnswer(question, answer),
          },
        ]);
        showFeedback(false, currentTimeLeft, 0, newLives);
      }
    },
    [
      answering,
      phase,
      clearTimer,
      questionIndex,
      timeLeft,
      combo,
      lives,
      showFeedback,
    ],
  );

  const handleTimeout = useCallback(() => {
    processAnswer(null);
  }, [processAnswer]);

  handleTimeoutRef.current = handleTimeout;

  const startGame = useCallback(() => {
    clearTimer();
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }

    setPhase("playing");
    setQuestionIndex(0);
    setLives(MAX_LIVES);
    setScore(0);
    setCombo(0);
    setTimeLeft(TIMER_SECONDS);
    setCorrectCount(0);
    setWrongAnswers([]);
    setFeedback(null);
    setAnswering(false);
  }, [clearTimer]);

  // 타이머
  useEffect(() => {
    if (phase !== "playing" || answering) {
      clearTimer();
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          handleTimeoutRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [phase, answering, questionIndex, clearTimer]);

  useEffect(() => {
    return () => {
      clearTimer();
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, [clearTimer]);

  return (
    <div className="mx-auto min-h-screen w-full max-w-lg">
      {phase === "start" && <StartScreen onStart={startGame} />}

      {phase === "playing" && currentQuestion && (
        <QuizScreen
          question={currentQuestion}
          questionIndex={questionIndex}
          totalQuestions={TOTAL_QUESTIONS}
          lives={lives}
          score={score}
          combo={combo}
          timeLeft={timeLeft}
          onAnswer={processAnswer}
          disabled={answering}
        />
      )}

      {phase === "feedback" && feedback && (
        <>
          {currentQuestion && (
            <QuizScreen
              question={currentQuestion}
              questionIndex={questionIndex}
              totalQuestions={TOTAL_QUESTIONS}
              lives={lives}
              score={score}
              combo={combo}
              timeLeft={timeLeft}
              onAnswer={processAnswer}
              disabled={true}
            />
          )}
          <FeedbackOverlay
            isCorrect={feedback.isCorrect}
            explanation={feedback.explanation}
            correctAnswer={feedback.correctAnswer}
            earnedPoints={feedback.earnedPoints}
            comboBonus={feedback.comboBonus}
          />
        </>
      )}

      {phase === "result" && (
        <ResultScreen
          score={score}
          gradeInfo={getGrade(score)}
          correctCount={correctCount}
          totalQuestions={TOTAL_QUESTIONS}
          wrongAnswers={wrongAnswers}
          onRestart={startGame}
        />
      )}
    </div>
  );
}
