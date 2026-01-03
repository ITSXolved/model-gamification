'use client';
import { useGameLogic } from '../hooks/useGameLogic';
import { ActivityLayout } from '../components/ActivityLayout';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Lock, Unlock } from 'lucide-react';

export default function SafeCrackerPage() {
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

    const [rotation, setRotation] = useState(0);

    const handleDial = (opt: string, idx: number) => {
        // Visual feedback via rotation
        const degrees = (360 / 4) * idx;
        setRotation(degrees);

        // Submit answer logic
        setTimeout(() => {
            handleAnswer(opt);
        }, 600);
    };

    return (
        <ActivityLayout
            title="Safe Cracker"
            description="Turn the dial to the correct option to unlock the vault."
            score={score}
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentIndex}
            onReset={resetGame}
            isGameOver={isGameOver}
            streak={streak}
        >
            <div className="w-full max-w-md flex flex-col items-center justify-center">

                <div className="bg-gray-200 p-8 rounded-3xl shadow-inner border-4 border-gray-300 w-full text-center mb-8">
                    <h2 className="text-xl font-bold text-gray-800">{currentQuestion.question}</h2>
                </div>

                {/* The Safe Dial */}
                <div className="relative w-80 h-80">
                    {/* Dial Background */}
                    <motion.div
                        className="w-full h-full rounded-full bg-gradient-to-br from-gray-700 to-black shadow-2xl border-8 border-gray-500 relative flex items-center justify-center"
                        animate={{ rotate: rotation }}
                        transition={{ type: 'spring', stiffness: 50 }}
                    >
                        {/* Center Knob */}
                        <div className="w-24 h-24 rounded-full bg-gray-300 shadow-inner flex items-center justify-center z-20">
                            <Lock size={32} className="text-gray-600" />
                        </div>

                        {/* Marker */}
                        <div className="absolute top-2 w-4 h-8 bg-red-500 rounded-b-lg z-10"></div>
                    </motion.div>

                    {/* Options positioned around the dial (Static, clickable) */}
                    {/* We overlay clickable areas or buttons around the circle */}
                    {currentQuestion.options.map((opt, idx) => {
                        // Position buttons at 0, 90, 180, 270 degrees visual
                        // 12, 3, 6, 9 o'clock
                        // idx 0 = Top, 1 = Right, 2 = Bottom, 3 = Left
                        const positions = [
                            "top-0 left-1/2 -translate-x-1/2 -translate-y-12", // Top
                            "top-1/2 right-0 translate-x-12 -translate-y-1/2", // Right
                            "bottom-0 left-1/2 -translate-x-1/2 translate-y-12", // Bottom
                            "top-1/2 left-0 -translate-x-12 -translate-y-1/2", // Left
                        ];

                        return (
                            <button
                                key={idx}
                                onClick={() => handleDial(opt, idx)}
                                className={`absolute ${positions[idx]} w-32 px-4 py-2 bg-white border-2 border-gray-300 rounded-xl shadow-lg hover:bg-blue-50 active:scale-95 transition text-sm font-bold z-30 text-center`}
                            >
                                {String.fromCharCode(65 + idx)}: {opt}
                            </button>
                        )
                    })}
                </div>

                <div className="mt-16 text-gray-400 text-sm">
                    Click an option to turn the dial
                </div>
            </div>
        </ActivityLayout>
    );
}
