'use client';
import { useGameLogic } from '../hooks/useGameLogic';
import { ActivityLayout } from '../components/ActivityLayout';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { TrainTrack } from 'lucide-react';

export default function TrainSwitchPage() {
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

    const [trainMoving, setTrainMoving] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState<number | null>(null);

    const handleSwitch = (idx: number, opt: string) => {
        if (trainMoving) return;
        setSelectedTrack(idx);
        setTrainMoving(true);

        setTimeout(() => {
            handleAnswer(opt);
            setTrainMoving(false);
            setSelectedTrack(null);
        }, 1000);
    };

    return (
        <ActivityLayout
            title="Train Switch"
            description="Select the correct track to guide the train to its destination."
            score={score}
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentIndex}
            onReset={resetGame}
            isGameOver={isGameOver}
            streak={streak}
        >
            <div className="w-full max-w-4xl h-[60vh] bg-stone-200 rounded-xl overflow-hidden shadow-inner border-4 border-stone-400 relative flex flex-col items-center pt-8">

                {/* Question Sign */}
                <div className="bg-yellow-400 text-black p-4 border-4 border-black font-bold text-xl rounded shadow-lg z-20">
                    {currentQuestion.question}
                </div>

                {/* Tracks Layout */}
                <div className="flex-1 w-full relative flex justify-center items-end pb-8">
                    {/* Main Line */}
                    <div className="absolute bottom-0 top-[20%] w-4 bg-stone-600 left-1/2 -translate-x-1/2"></div>

                    {/* Branching Options */}
                    <div className="absolute top-[30%] w-full flex justify-between px-16 h-full">
                        {currentQuestion.options.map((opt, idx) => {
                            // Angles for 4 tracks
                            const rotation = (idx - 1.5) * 20;

                            return (
                                <div key={idx} className="relative flex-1 h-full flex flex-col items-center justify-end">
                                    {/* Track drawing */}
                                    <div className="absolute bottom-0 top-0 w-2 bg-stone-500 origin-bottom" style={{ transform: `rotate(${rotation}deg)` }}></div>

                                    {/* Station/Option */}
                                    <button
                                        onClick={() => handleSwitch(idx, opt)}
                                        className={`
                                        mb-20 z-10 p-4 rounded-xl border-4 font-bold transition-transform hover:scale-110 active:scale-95 bg-white shadow-lg
                                        ${selectedTrack === idx ? 'border-green-500 bg-green-50' : 'border-stone-500 text-stone-700'}
                                    `}
                                        style={{ transform: `translateX(${rotation * 3}px)` }}
                                    >
                                        {opt}
                                    </button>
                                </div>
                            )
                        })}
                    </div>

                    {/* Train */}
                    <motion.div
                        className="absolute bottom-0 z-20"
                        animate={trainMoving && selectedTrack !== null ? {
                            y: -300,
                            x: (selectedTrack - 1.5) * 100, // Approximate divergence
                            scale: 0.5
                        } : { y: 0, x: 0, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="w-16 h-24 bg-red-600 rounded-t-xl border-4 border-black relative">
                            <div className="absolute bottom-2 left-1 right-1 h-2 bg-yellow-400"></div>
                            <div className="absolute bottom-4 left-2 w-4 h-4 bg-yellow-200 rounded-full animate-pulse"></div>
                            <div className="absolute bottom-4 right-2 w-4 h-4 bg-yellow-200 rounded-full animate-pulse"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </ActivityLayout>
    );
}
