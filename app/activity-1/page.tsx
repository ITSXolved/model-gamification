'use client';
import { useGameLogic } from '../hooks/useGameLogic';
import { ActivityLayout } from '../components/ActivityLayout';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function SpeedMatchPage() {
    const {
        currentQuestion,
        currentIndex,
        totalQuestions,
        score,
        streak,
        isGameOver,
        handleAnswer,
        resetGame,
    } = useGameLogic();

    const [timeLeft, setTimeLeft] = useState(10);
    const [selected, setSelected] = useState<string | null>(null);

    // Reset timer on new question
    useEffect(() => {
        setTimeLeft(10);
        setSelected(null);
    }, [currentIndex]);

    // Timer Countdown
    useEffect(() => {
        if (isGameOver || selected) return;

        if (timeLeft <= 0) {
            handleAnswer('TIMEOUT'); // Force wrong answer
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isGameOver, selected]);

    const onSelect = (opt: string) => {
        if (selected) return;
        setSelected(opt);
        handleAnswer(opt);
    };

    return (
        <ActivityLayout
            title="Speed Match"
            description="Answer quickly before time runs out! Streaks multiply your score."
            score={score}
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentIndex}
            onReset={resetGame}
            isGameOver={isGameOver}
            streak={streak}
        >
            <div className="w-full max-w-2xl flex flex-col items-center">
                {/* Timer Bar */}
                <div className="w-full bg-gray-200 h-4 rounded-full mb-8 overflow-hidden border border-gray-300">
                    <motion.div
                        className="h-full bg-red-500"
                        initial={{ width: "100%" }}
                        animate={{ width: `${(timeLeft / 10) * 100}%` }}
                        transition={{ ease: "linear", duration: 1 }}
                    />
                </div>

                {/* Question Card */}
                <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-2xl shadow-md w-full mb-8 text-center"
                >
                    <h2 className="text-2xl font-bold text-gray-800">{currentQuestion.question}</h2>
                </motion.div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {currentQuestion.options.map((opt, idx) => {
                        let bgClass = "bg-white hover:bg-blue-50 border-gray-200";
                        if (selected) {
                            if (opt === currentQuestion.answer) bgClass = "bg-green-100 border-green-500 text-green-700";
                            else if (opt === selected) bgClass = "bg-red-100 border-red-500 text-red-700";
                            else bgClass = "bg-gray-100 text-gray-400";
                        }

                        return (
                            <motion.button
                                key={idx}
                                whileHover={!selected ? { scale: 1.02 } : {}}
                                whileTap={!selected ? { scale: 0.98 } : {}}
                                onClick={() => onSelect(opt)}
                                className={`p-6 rounded-xl border-2 text-lg font-semibold shadow-sm transition-colors duration-200 ${bgClass}`}
                            >
                                {opt}
                            </motion.button>
                        )
                    })}
                </div>
            </div>
        </ActivityLayout>
    );
}
