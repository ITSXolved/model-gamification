'use client';
import { useGameLogic } from '../hooks/useGameLogic';
import { ActivityLayout } from '../components/ActivityLayout';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FlaskConical } from 'lucide-react';

export default function PotionLabPage() {
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

    const [pouring, setPouring] = useState<string | null>(null);

    const handlePour = (opt: string) => {
        if (pouring) return;
        setPouring(opt);

        setTimeout(() => {
            handleAnswer(opt);
            setPouring(null);
        }, 1200);
    };

    return (
        <ActivityLayout
            title="Potion Lab"
            description="Brew the correct ingredient to create the elixir of knowledge!"
            score={score}
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentIndex}
            onReset={resetGame}
            isGameOver={isGameOver}
            streak={streak}
        >
            <div className="flex flex-col items-center justify-center w-full max-w-4xl h-[70vh]">

                {/* Question Scroll */}
                <div className="mb-10 bg-purple-900 text-purple-100 p-6 rounded-lg shadow-xl border-2 border-purple-500 max-w-2xl text-center relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-purple-800 rounded-full border border-purple-600"></div>
                    <h2 className="text-xl font-bold font-mono">{currentQuestion.question}</h2>
                </div>

                {/* Cauldron */}
                <div className="relative w-48 h-40 mb-16">
                    <div className="absolute inset-0 bg-gray-800 rounded-b-full rounded-t-lg border-x-4 border-b-4 border-gray-700 shadow-2xl overflow-hidden">
                        {/* Liquid */}
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 bg-green-500 opacity-80"
                            animate={{ height: ['40%', '45%', '40%'] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        />
                        {/* Bubbles */}
                        <div className="absolute bottom-4 left-8 w-4 h-4 bg-green-300 rounded-full animate-bounce"></div>
                        <div className="absolute bottom-8 right-12 w-2 h-2 bg-green-200 rounded-full animate-pulse"></div>
                    </div>
                    {/* Rim */}
                    <div className="absolute -top-2 left-0 right-0 h-4 bg-gray-700 rounded-full border border-gray-600"></div>

                    {/* Smoke/Reaction on pour */}
                    {pouring && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: 0 }}
                            animate={{ opacity: [0, 1, 0], scale: [0.5, 2, 3], y: -100 }}
                            transition={{ duration: 1 }}
                            className={`absolute -top-20 left-10 text-6xl font-bold ${pouring === currentQuestion.answer ? 'text-green-400' : 'text-gray-500'}`}
                        >
                            {pouring === currentQuestion.answer ? '✨' : '💨'}
                        </motion.div>
                    )}
                </div>

                {/* Shelves / Ingredients */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full px-8">
                    {currentQuestion.options.map((opt, idx) => {
                        const colors = ["bg-red-500", "bg-blue-500", "bg-yellow-500", "bg-pink-500"];
                        const color = colors[idx % colors.length];
                        const isPouringThis = pouring === opt;

                        return (
                            <div key={idx} className="flex flex-col items-center group">
                                <motion.button
                                    onClick={() => handlePour(opt)}
                                    disabled={!!pouring}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    animate={isPouringThis ? { rotate: 45, y: 50, x: (idx < 2 ? 50 : -50) } : {}}
                                    className={`relative w-16 h-24 ${color} rounded-t-full rounded-b-md shadow-md border-2 border-white/30 flex items-center justify-center mb-2 z-20`}
                                >
                                    <div className="w-full h-4 absolute top-4 bg-white/20"></div>
                                    <FlaskConical className="text-white/50 w-8 h-8" />
                                </motion.button>

                                {/* Label */}
                                <div className={`text-center bg-white border border-gray-200 px-3 py-2 rounded-lg shadow-sm text-sm font-semibold text-gray-700 group-hover:bg-purple-50 transition-colors ${isPouringThis ? 'opacity-0' : 'opacity-100'}`}>
                                    {opt}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Shelf Plank */}
                <div className="w-full h-4 bg-amber-800 rounded-full shadow-lg mt-[-10px] z-10 mx-8"></div>

            </div>
        </ActivityLayout>
    );
}
