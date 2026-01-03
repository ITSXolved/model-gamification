'use client';
import { useGameLogic } from '../hooks/useGameLogic';
import { ActivityLayout } from '../components/ActivityLayout';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Box } from 'lucide-react';

export default function TowerBuilderPage() {
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

    // Stack of blocks built so far (just visual representation of progress)
    const [towerHeight, setTowerHeight] = useState(0);

    useEffect(() => {
        // Sync tower height with current question index (successes build up)
        setTowerHeight(currentIndex);
    }, [currentIndex]);

    const handleBlockSelect = (opt: string) => {
        handleAnswer(opt);
    };

    return (
        <ActivityLayout
            title="Tower Builder"
            description="Select the solid blocks to build your tower higher!"
            score={score}
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentIndex}
            onReset={resetGame}
            isGameOver={isGameOver}
            streak={streak}
        >
            <div className="flex flex-col md:flex-row w-full max-w-5xl h-[70vh] gap-4">

                {/* Construction Zone (Left/Top) */}
                <div className="flex-1 bg-sky-50 rounded-2xl border-2 border-sky-100 relative overflow-hidden flex flex-col-reverse items-center justify-end pb-0">
                    {/* Ground */}
                    <div className="w-full h-4 bg-green-600 absolute bottom-0"></div>

                    {/* Tower */}
                    <div className="flex flex-col-reverse items-center transition-all duration-500 mb-4 w-full px-4">
                        {/* Base */}
                        <div className="w-full max-w-[120px] h-4 bg-gray-400 rounded-sm"></div>

                        {/* Blocks */}
                        {Array.from({ length: towerHeight }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: -500, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                className="w-24 h-12 bg-gradient-to-r from-orange-400 to-orange-500 border-2 border-orange-600 rounded-md flex items-center justify-center shadow-lg mb-1"
                            >
                                <Box className="text-orange-800 opacity-20" size={20} />
                            </motion.div>
                        ))}

                        {/* Current Question Block Placeholder */}
                        <div className="w-24 h-12 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-xs text-gray-400 mb-1 animate-pulse">
                            Target
                        </div>
                    </div>

                    {/* Clouds */}
                    <div className="absolute top-10 left-10 text-sky-200"><Box size={64} className="rounded-full" /></div>
                    <div className="absolute top-20 right-20 text-sky-200"><Box size={48} className="rounded-full" /></div>
                </div>

                {/* Controls (Right/Bottom) */}
                <div className="w-full md:w-1/3 flex flex-col justify-center bg-white p-6 rounded-2xl shadow-lg border border-gray-200 z-10">
                    <h2 className="text-lg font-bold text-gray-800 mb-6 text-center">{currentQuestion.question}</h2>

                    <div className="flex flex-col gap-3">
                        {currentQuestion.options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleBlockSelect(opt)}
                                className="p-4 bg-gray-50 border-2 border-gray-200 rounded-xl hover:bg-orange-50 hover:border-orange-400 transition-all font-semibold text-gray-700 text-left active:scale-95"
                            >
                                {String.fromCharCode(65 + idx)}. {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </ActivityLayout>
    );
}
