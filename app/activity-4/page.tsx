'use client';
import { useGameLogic } from '../hooks/useGameLogic';
import { ActivityLayout } from '../components/ActivityLayout';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function DragDropPage() {
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

    const [droppedAnswer, setDroppedAnswer] = useState<string | null>(null);

    useEffect(() => {
        setDroppedAnswer(null);
    }, [currentIndex]);

    const handleDrop = (opt: string) => {
        setDroppedAnswer(opt);
        // Wait a moment then submit
        setTimeout(() => {
            handleAnswer(opt);
        }, 500);
    };

    return (
        <ActivityLayout
            title="Sentence Builder"
            description="Drag the correct word to complete the sentence."
            score={score}
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentIndex}
            onReset={resetGame}
            isGameOver={isGameOver}
            streak={streak}
        >
            <div className="w-full max-w-3xl flex flex-col items-center justify-center min-h-[50vh]">
                {/* Sentence Area (Droppable) */}
                <div className="mb-16 p-8 bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-300 w-full text-center">
                    <h2 className="text-2xl font-medium text-gray-700 leading-relaxed">
                        {currentQuestion.question.includes('___') ?
                            currentQuestion.question.split('___').map((part, i, arr) => (
                                <span key={i}>
                                    {part}
                                    {i < arr.length - 1 && (
                                        <span className={`inline-flex items-center justify-center w-32 h-12 mx-2 align-middle rounded-lg border-b-4 transition-colors ${droppedAnswer ? (droppedAnswer === currentQuestion.answer ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700') : 'bg-gray-100 border-gray-300'}`}>
                                            {droppedAnswer || "?"}
                                        </span>
                                    )}
                                </span>
                            ))
                            : (
                                // Fallback for questions without blanks
                                <>
                                    <span>{currentQuestion.question}</span>
                                    <div className={`mt-4 w-full h-16 rounded-xl flex items-center justify-center border-2 transition-colors ${droppedAnswer ? (droppedAnswer === currentQuestion.answer ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500') : 'bg-gray-50 border-dashed border-gray-300'}`}>
                                        {droppedAnswer ? <span className="text-xl font-bold">{droppedAnswer}</span> : <span className="text-gray-400">Drag answer here</span>}
                                    </div>
                                </>
                            )}
                    </h2>
                </div>

                {/* Draggable Options (Mock Drag via Click for simple demo reliability, or true drag) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                    {currentQuestion.options.map((opt, idx) => (
                        <motion.div
                            key={idx}
                            layoutId={`option-${idx}`}
                            whileHover={{ scale: 1.05, cursor: 'grab' }}
                            whileTap={{ scale: 0.95, cursor: 'grabbing' }}
                            drag
                            dragSnapToOrigin
                            onDragEnd={(e, info) => {
                                // Simple collision detection based on drag distance/direction (upwards)
                                if (info.offset.y < -50) {
                                    handleDrop(opt);
                                }
                            }}
                            className="bg-white p-4 rounded-xl shadow-md border border-gray-200 text-center font-bold text-gray-700 select-none z-20"
                        >
                            {opt}
                        </motion.div>
                    ))}
                </div>
                <p className="mt-8 text-sm text-gray-400">Drag a word up to the blank space!</p>
            </div>
        </ActivityLayout>
    );
}
