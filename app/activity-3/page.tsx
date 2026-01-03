'use client';
import { useGameLogic } from '../hooks/useGameLogic';
import { ActivityLayout } from '../components/ActivityLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function BubblePopPage() {
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

    // Create unique keys for bubbles to force re-render on new question
    const [bubbles, setBubbles] = useState<any[]>([]);

    useEffect(() => {
        // Generate random positions and delays for bubbles
        const newBubbles = currentQuestion.options.map((opt, i) => ({
            opt,
            id: `${currentIndex}-${i}`,
            left: Math.random() * 80 + 10, // 10% to 90%
            delay: i * 0.5,
            speed: Math.random() * 5 + 10, // 10-15s duration (slow)
        }));
        setBubbles(newBubbles);
    }, [currentIndex, currentQuestion]);

    const popBubble = (opt: string) => {
        handleAnswer(opt);
    };

    return (
        <ActivityLayout
            title="Bubble Pop"
            description="Click the correct bubble before it floats away!"
            score={score}
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentIndex}
            onReset={resetGame}
            isGameOver={isGameOver}
            streak={streak}
        >
            <div className="relative w-full h-[60vh] bg-gradient-to-b from-blue-50 to-blue-200 rounded-2xl overflow-hidden border border-blue-100 shadow-inner">
                {/* Question Header pinned inside game area */}
                <div className="absolute top-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-sm z-10 text-center border-b border-white/50">
                    <h2 className="text-xl font-bold text-gray-800">{currentQuestion.question}</h2>
                </div>

                {/* Bubbles Area */}
                <div className="absolute inset-0 pt-20">
                    <AnimatePresence mode="wait">
                        {bubbles.map((bubble) => (
                            <motion.button
                                key={bubble.id}
                                initial={{ y: 500, opacity: 0, x: `${bubble.left}%` }}
                                animate={{
                                    y: -100,
                                    opacity: 1,
                                    transition: {
                                        duration: bubble.speed,
                                        ease: "linear",
                                        delay: bubble.delay,
                                        repeat: Infinity,
                                    }
                                }}
                                exit={{ scale: 0, opacity: 0 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => popBubble(bubble.opt)}
                                className="absolute w-32 h-32 rounded-full flex items-center justify-center p-4 bg-white/90 shadow-lg border-2 border-blue-300 text-blue-900 font-bold text-center leading-tight hover:border-blue-500 cursor-pointer"
                                style={{ left: 0 }} /* Positioned via x in animate */
                            >
                                {bubble.opt}
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </ActivityLayout>
    );
}
