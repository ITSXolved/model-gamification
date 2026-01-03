'use client';
import { useGameLogic } from '../hooks/useGameLogic';
import { ActivityLayout } from '../components/ActivityLayout';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Loader } from 'lucide-react';

export default function OrbitSelectorPage() {
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

    const [selected, setSelected] = useState<string | null>(null);

    const handleOrbitClick = (opt: string) => {
        if (selected) return;
        setSelected(opt);
        handleAnswer(opt);
        setTimeout(() => setSelected(null), 1000); // Reset selection visual for next round
    };

    return (
        <ActivityLayout
            title="Orbit Selector"
            description="Click the correct answer as it orbits the question!"
            score={score}
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentIndex}
            onReset={resetGame}
            isGameOver={isGameOver}
            streak={streak}
        >
            <div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">

                {/* Central Question (Sun) */}
                <div className="absolute z-20 w-48 h-48 bg-yellow-400 rounded-full flex items-center justify-center p-6 text-center shadow-[0_0_50px_rgba(250,204,21,0.5)] border-4 border-yellow-200">
                    <span className="font-bold text-yellow-900 text-lg">{currentQuestion.question}</span>
                </div>

                {/* Orbits */}
                <div className="absolute w-[300px] h-[300px] border border-gray-300 rounded-full opacity-30"></div>
                <div className="absolute w-[500px] h-[500px] border border-gray-300 rounded-full opacity-20"></div>

                {/* Orbiting Options */}
                {currentQuestion.options.map((opt, idx) => {
                    const radius = 160 + (idx % 2) * 60; // Alternate orbit paths
                    const duration = 15 + idx * 5; // Different speeds
                    const delay = idx * -5;

                    // Correct/Wrong coloring if selected
                    let bgClass = "bg-white text-gray-800 border-gray-200";
                    if (selected === opt) {
                        bgClass = opt === currentQuestion.answer ? "bg-green-500 text-white border-green-300" : "bg-red-500 text-white border-red-300";
                    }

                    return (
                        <motion.div
                            key={idx}
                            className="absolute top-1/2 left-1/2 w-0 h-0"
                            animate={{ rotate: 360 }}
                            transition={{
                                repeat: Infinity,
                                duration: duration,
                                ease: "linear",
                                delay: delay
                            }}
                        >
                            <motion.button
                                // Counter-rotate logic is tricky in pure CSS/Framer without complex nesting, 
                                // Simplified: The container rotates, button is offset.
                                // To keep text upright, the button needs to counter-rotate or we just accept rotation (space theme!)
                                style={{ x: radius }}
                                whileHover={{ scale: 1.2 }}
                                onClick={() => handleOrbitClick(opt)}
                                className={`
                            absolute -ml-12 -mt-12 w-24 h-24 rounded-full border-4 shadow-lg flex items-center justify-center p-2 text-xs font-bold text-center z-30 cursor-pointer
                            ${bgClass}
                        `}
                            >
                                <div className="transform rotate-0" style={{ writingMode: 'horizontal-tb' }}>
                                    {opt}
                                </div>
                            </motion.button>
                        </motion.div>
                    );
                })}

                <div className="absolute bottom-8 text-center text-gray-400 text-sm">
                    <Loader className="inline-block animate-spin mr-2" /> Timing is (not) everything. Just click!
                </div>

            </div>
        </ActivityLayout>
    );
}
