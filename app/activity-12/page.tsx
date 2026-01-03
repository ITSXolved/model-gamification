'use client';
import { useGameLogic } from '../hooks/useGameLogic';
import { ActivityLayout } from '../components/ActivityLayout';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CarFront } from 'lucide-react';

export default function LaneRacerPage() {
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

    const [lane, setLane] = useState(1); // 0, 1, 2, 3 (4 lanes for 4 options)
    const [isDriving, setIsDriving] = useState(true);

    // Map options to lanes
    const lanes = [0, 1, 2, 3];

    useEffect(() => {
        setIsDriving(true);
        setLane(1); // Reset to center-ish
    }, [currentIndex]);

    const handleSelectLane = (l: number) => {
        setLane(l);
    };

    const submitLane = () => {
        // Logic: After X seconds, the car hits the 'finish line' of this segment
        // For demo, we click a button to 'Drive Through' or just click the lane itself.
        // Let's click the lane to move, and maybe a "Go" button or auto-commit?
        // Better: Infinite runner style, options coming DOWN.
        // SIMPLIFIED: Click lane to move car. Button "Hit Gas" to confirm.

        const selectedOpt = currentQuestion.options[lane];
        handleAnswer(selectedOpt || "");
    };

    return (
        <ActivityLayout
            title="Lane Racer"
            description="Switch lanes to line up with the correct answer, then Hit Gas!"
            score={score}
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentIndex}
            onReset={resetGame}
            isGameOver={isGameOver}
            streak={streak}
        >
            <div className="relative w-full max-w-2xl h-[60vh] bg-gray-800 rounded-xl overflow-hidden border-4 border-gray-700 flex flex-col items-center">

                {/* Road */}
                <div className="relative flex-1 w-full flex justify-between px-8 perspective-1000 overflow-hidden">
                    {/* Lane Markers */}
                    <div className="absolute top-0 bottom-0 left-1/4 w-2 border-l-2 border-dashed border-white/30"></div>
                    <div className="absolute top-0 bottom-0 left-2/4 w-2 border-l-2 border-dashed border-white/30"></div>
                    <div className="absolute top-0 bottom-0 left-3/4 w-2 border-l-2 border-dashed border-white/30"></div>

                    {/* Moving Road Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>

                    {/* Options at the 'Horizon' (Top) */}
                    <div className="absolute top-10 left-0 right-0 flex justify-between px-4 z-10">
                        {currentQuestion.options.map((opt, idx) => (
                            <div key={idx} className="w-1/4 flex justify-center">
                                <div className="bg-blue-600 text-white text-xs sm:text-sm p-2 rounded shadow-2xl border-2 border-blue-400 w-24 text-center">
                                    {opt}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Question HUD */}
                    <div className="absolute top-0 left-0 right-0 bg-black/80 text-white p-2 text-center text-sm border-b border-gray-600 z-20">
                        {currentQuestion.question}
                    </div>

                    {/* Car */}
                    <motion.div
                        className="absolute bottom-20 w-1/4 flex justify-center text-red-500 z-30 transition-all duration-300"
                        style={{ left: `${lane * 25}%` }}
                    >
                        <CarFront size={64} className="fill-current drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
                    </motion.div>
                </div>

                {/* Controls */}
                <div className="bg-gray-900 w-full p-4 flex gap-4 justify-center items-center border-t border-gray-700">
                    <div className="flex gap-2">
                        {lanes.map((l) => (
                            <button
                                key={l}
                                onClick={() => handleSelectLane(l)}
                                className={`w-12 h-12 rounded-lg font-bold border-2 ${lane === l ? 'bg-yellow-500 text-black border-yellow-400' : 'bg-gray-700 text-gray-300 border-gray-600'}`}
                            >
                                {l + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={submitLane}
                        className="ml-8 px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg active:translate-y-1 transition"
                    >
                        HIT GAS
                    </button>
                </div>
            </div>
        </ActivityLayout>
    );
}
