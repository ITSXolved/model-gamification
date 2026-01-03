'use client';
import { useGameLogic } from '../hooks/useGameLogic';
import { ActivityLayout } from '../components/ActivityLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

export default function SwipeQuizPage() {
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

    // Stack of options to swipe through
    const [optionStack, setOptionStack] = useState<string[]>([]);
    const [currentOption, setCurrentOption] = useState<string | null>(null);

    useEffect(() => {
        // Shuffle options for the stack
        const shuffled = [...currentQuestion.options].sort(() => Math.random() - 0.5);
        setOptionStack(shuffled);
        setCurrentOption(shuffled[0]);
    }, [currentIndex, currentQuestion]);

    const handleSwipe = (direction: 'left' | 'right') => {
        if (!currentOption) return;

        if (direction === 'right') {
            // User selected this option
            handleAnswer(currentOption);
        } else {
            // User discarded this option
            // If it WAS the answer, that's a mistake (or we just go to next?)
            // If we discard the correct answer, it's a fail.
            if (currentOption === currentQuestion.answer) {
                // Discarded the right answer -> WRONG
                handleAnswer('DISCARDED_CORRECT');
            } else {
                // Discarded a wrong answer -> Good job, show next
                const nextStack = optionStack.slice(1);
                if (nextStack.length === 0) {
                    // No more options? Should not happen if logic matches
                    // If we run out and haven't picked, maybe fail?
                    // Re-shuffle? or just fail.
                    handleAnswer('NO_SELECTION');
                } else {
                    setOptionStack(nextStack);
                    setCurrentOption(nextStack[0]);
                }
            }
        }
    };

    return (
        <ActivityLayout
            title="Swipe Decisions"
            description="Swipe RIGHT to choose the answer, LEFT to discard."
            score={score}
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentIndex}
            onReset={resetGame}
            isGameOver={isGameOver}
            streak={streak}
        >
            <div className="w-full max-w-md flex flex-col items-center">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">{currentQuestion.question}</h2>
                </div>

                <div className="relative w-full h-80 flex items-center justify-center">
                    <AnimatePresence mode="popLayout">
                        {currentOption && (
                            <motion.div
                                key={currentOption}
                                initial={{ scale: 0.8, opacity: 0, x: 0 }}
                                animate={{ scale: 1, opacity: 1, x: 0 }}
                                exit={{ x: 200, opacity: 0, rotate: 20 }}
                                className="absolute w-64 h-80 bg-white rounded-3xl shadow-2xl border border-gray-100 flex items-center justify-center p-6 text-center z-10"
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipeThreshold = 50;
                                    if (offset.x > swipeThreshold) {
                                        handleSwipe('right');
                                    } else if (offset.x < -swipeThreshold) {
                                        handleSwipe('left');
                                    }
                                }}
                            >
                                <span className="text-3xl font-bold text-gray-800">{currentOption}</span>

                                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8 text-gray-400">
                                    <div className="flex flex-col items-center">
                                        <X className="text-red-500 mb-1" />
                                        <span className="text-xs">Discard</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <Check className="text-green-500 mb-1" />
                                        <span className="text-xs">Select</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Background card stacks for visuals */}
                    <div className="absolute w-64 h-80 bg-gray-100 rounded-3xl shadow-sm border border-gray-200 transform rotate-3 -z-10"></div>
                    <div className="absolute w-64 h-80 bg-gray-50 rounded-3xl shadow-inner border border-gray-100 transform -rotate-3 -z-20"></div>
                </div>

                <div className="flex gap-4 mt-8">
                    <button onClick={() => handleSwipe('left')} className="p-4 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition">
                        <X size={32} />
                    </button>
                    <button onClick={() => handleSwipe('right')} className="p-4 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition">
                        <Check size={32} />
                    </button>
                </div>
            </div>
        </ActivityLayout>
    );
}
