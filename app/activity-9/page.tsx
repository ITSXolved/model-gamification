'use client';
import { useGameLogic } from '../hooks/useGameLogic';
import { ActivityLayout } from '../components/ActivityLayout';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Footprints } from 'lucide-react';

export default function CanyonJumpPage() {
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

    const [position, setPosition] = useState(0); // 0 = start, 1 = stone 1 (success)
    const [jumpDirection, setJumpDirection] = useState<'left' | 'right' | null>(null);

    useEffect(() => {
        setPosition(0);
        setJumpDirection(null);
    }, [currentIndex]);

    const handleJump = (index: number, opt: string) => {
        if (jumpDirection) return;

        // Determine direction for animation
        setJumpDirection(index % 2 === 0 ? 'left' : 'right');

        // Delay logic to allow jump animation
        setTimeout(() => {
            const isCorrect = handleAnswer(opt);
            if (isCorrect) setPosition(1);
            // If wrong, we fall (logic handled by game hook transition, but visual could show fall)
        }, 400);
    };

    return (
        <ActivityLayout
            title="Canyon Jump"
            description="Jump to the correct stone to cross the canyon!"
            score={score}
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentIndex}
            onReset={resetGame}
            isGameOver={isGameOver}
            streak={streak}
        >
            <div className="relative w-full max-w-4xl h-[60vh] bg-stone-100 rounded-2xl overflow-hidden shadow-inner border-4 border-stone-300 flex flex-col">
                {/* Question Banner */}
                <div className="bg-stone-800 text-white p-6 text-center z-10 shadow-md">
                    <h2 className="text-xl font-bold">{currentQuestion.question}</h2>
                </div>

                {/* Canyon View */}
                <div className="flex-1 relative bg-gradient-to-b from-sky-200 to-sky-100 overflow-hidden flex items-end justify-center pb-8 perspective-1000">

                    {/* Cliffs */}
                    <div className="absolute left-0 top-20 bottom-0 w-12 sm:w-24 bg-stone-600 border-r-4 border-stone-700"></div>
                    <div className="absolute right-0 top-20 bottom-0 w-12 sm:w-24 bg-stone-600 border-l-4 border-stone-700"></div>

                    {/* Water/Abyss */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-blue-400 opacity-80 animate-pulse"></div>

                    {/* Character */}
                    <motion.div
                        className="absolute bottom-10 z-20 text-orange-600"
                        animate={{
                            y: jumpDirection ? [0, -100, 0] : 0,
                            x: jumpDirection === 'left' ? -100 : (jumpDirection === 'right' ? 100 : 0),
                            scale: jumpDirection ? [1, 1.2, 1] : 1
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <Footprints size={48} className="fill-current rotate-[-90deg]" />
                    </motion.div>

                    {/* Stones/Options */}
                    <div className="grid grid-cols-2 gap-8 md:gap-16 w-full max-w-2xl px-12 z-10 mb-20">
                        {currentQuestion.options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleJump(idx, opt)}
                                disabled={!!jumpDirection}
                                className={`
                            relative h-24 sm:h-32 rounded-full bg-stone-300 border-b-8 border-stone-400 
                            flex items-center justify-center p-4 text-center group transition-transform hover:scale-105 active:scale-95
                            shadow-xl
                        `}
                            >
                                <span className="font-bold text-stone-800 text-sm sm:text-lg group-hover:text-blue-900">{opt}</span>
                                {/* Moss/Detail */}
                                <div className="absolute top-2 left-4 w-4 h-2 bg-green-500/30 rounded-full"></div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </ActivityLayout>
    );
}
