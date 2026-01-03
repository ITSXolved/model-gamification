'use client';
import { useGameLogic } from '../hooks/useGameLogic';
import { ActivityLayout } from '../components/ActivityLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

export default function FlashCardsPage() {
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

    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [confirmedAnswer, setConfirmedAnswer] = useState<string | null>(null);

    useEffect(() => {
        setFlippedIndices([]);
        setConfirmedAnswer(null);
    }, [currentIndex]);

    const handleCardClick = (idx: number) => {
        if (confirmedAnswer) return;

        // Toggle flip
        if (flippedIndices.includes(idx)) {
            setFlippedIndices(prev => prev.filter(i => i !== idx));
        } else {
            setFlippedIndices(prev => [...prev, idx]);
        }
    };

    const attemptSelect = (e: React.MouseEvent, opt: string) => {
        e.stopPropagation(); // Prevent card flip when clicking tick
        if (confirmedAnswer) return;
        setConfirmedAnswer(opt);

        // Slight delay to show selection before moving on
        setTimeout(() => {
            handleAnswer(opt);
        }, 500);
    };

    return (
        <ActivityLayout
            title="Mastery Flashcards"
            description="Flip cards to reveal options. Tick the correct one to submit."
            score={score}
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentIndex}
            onReset={resetGame}
            isGameOver={isGameOver}
            streak={streak}
        >
            <div className="w-full max-w-5xl flex flex-col items-center">
                <motion.div
                    key={currentQuestion.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-8 text-center"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{currentQuestion.question}</h2>
                    <p className="text-gray-500">Tap cards to peek, Tick to select</p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    {currentQuestion.options.map((opt, idx) => {
                        const isFlipped = flippedIndices.includes(idx);
                        const isConfirmed = confirmedAnswer === opt;
                        const isCorrect = opt === currentQuestion.answer;
                        // Show result colors if confirmed
                        const showResult = !!confirmedAnswer;

                        let borderColor = 'border-white';
                        if (showResult && isFlipped) {
                            if (isCorrect) borderColor = 'border-green-500';
                            else if (isConfirmed) borderColor = 'border-red-500';
                        }

                        return (
                            <div key={idx} className="relative h-64 w-full perspective-1000 group cursor-pointer" onClick={() => handleCardClick(idx)}>
                                <motion.div
                                    className="w-full h-full relative preserve-3d transition-all duration-500"
                                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                                >
                                    {/* Front of Card (Face Down) */}
                                    <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl flex items-center justify-center text-white text-5xl font-bold border-4 border-white transform transition-transform group-hover:scale-105">
                                        <span className="opacity-50">{idx + 1}</span>
                                    </div>

                                    {/* Back of Card (Face Up) */}
                                    <div className={`absolute inset-0 backface-hidden bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-6 text-center border-4 ${borderColor} rotate-y-180`}>
                                        <div className="flex-1 flex items-center justify-center">
                                            <span className="text-xl font-bold text-gray-800">{opt}</span>
                                        </div>

                                        {/* Tick Selection Column/Button */}
                                        <div className="mt-4 pt-4 border-t border-gray-100 w-full flex justify-center">
                                            <button
                                                onClick={(e) => attemptSelect(e, opt)}
                                                className={`
                                    flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all
                                    ${isConfirmed
                                                        ? (isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white')
                                                        : 'bg-gray-100 text-gray-400 hover:bg-blue-500 hover:text-white'
                                                    }
                                `}
                                            >
                                                <Check size={18} />
                                                {isConfirmed ? (isCorrect ? 'Correct' : 'Wrong') : 'Select'}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </ActivityLayout>
    );
}
