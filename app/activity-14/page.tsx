'use client';
import { useGameLogic } from '../hooks/useGameLogic';
import { ActivityLayout } from '../components/ActivityLayout';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Map, XCircle, Gem, Skull } from 'lucide-react';

export default function TreasureMapPage() {
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

    const [dugIndex, setDugIndex] = useState<number | null>(null);

    const handleDig = (opt: string, idx: number) => {
        if (dugIndex !== null) return;
        setDugIndex(idx);

        setTimeout(() => {
            handleAnswer(opt);
            setDugIndex(null); // Reset for next Q (though game hook will likely remount or change Q)
        }, 1000);
    };

    return (
        <ActivityLayout
            title="Treasure Map"
            description="Dig at the 'X' to find the treasure! Beware of traps."
            score={score}
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentIndex}
            onReset={resetGame}
            isGameOver={isGameOver}
            streak={streak}
        >
            <div className="relative w-full max-w-4xl h-[60vh] bg-amber-100 rounded-3xl overflow-hidden shadow-2xl border-8 border-amber-900/50 flex flex-col items-center">

                {/* Map Texture Overlay */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#8B4513 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                <div className="absolute inset-0 pointer-events-none border-[32px] border-amber-200/50 blur-sm"></div>

                <div className="z-10 mt-8 bg-amber-50/90 p-6 rounded-xl border border-amber-900/30 shadow-lg text-center max-w-2xl">
                    <h2 className="text-xl font-bold text-amber-900 font-serif">{currentQuestion.question}</h2>
                </div>

                <div className="flex-1 w-full grid grid-cols-2 gap-8 p-12 items-center justify-items-center z-10">
                    {currentQuestion.options.map((opt, idx) => {
                        const isDug = dugIndex === idx;
                        const isCorrect = opt === currentQuestion.answer;

                        // Randomize slightly positions later? For now grid is fine.
                        return (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative w-full max-w-[200px] aspect-square group cursor-pointer"
                                onClick={() => handleDig(opt, idx)}
                            >
                                {/* The Ground / X Mark */}
                                <div className={`absolute inset-0 bg-amber-300 rounded-2xl border-4 border-amber-400 border-dashed flex items-center justify-center transition-opacity duration-500 ${isDug ? 'opacity-0' : 'opacity-100'}`}>
                                    <XCircle className="text-amber-700/50 w-24 h-24" strokeWidth={1} />
                                    <span className="absolute bottom-4 font-bold text-amber-800 bg-amber-200/80 px-2 py-1 rounded">
                                        {opt}
                                    </span>
                                </div>

                                {/* The Hole (Revealed Content) */}
                                <div className="absolute inset-0 bg-amber-900/40 rounded-full shadow-inner flex items-center justify-center">
                                    {isDug && (
                                        <motion.div
                                            initial={{ scale: 0, y: 20 }}
                                            animate={{ scale: 1, y: 0 }}
                                            transition={{ type: "spring" }}
                                        >
                                            {isCorrect ? (
                                                <Gem size={64} className="text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.8)]" />
                                            ) : (
                                                <Skull size={64} className="text-gray-200" />
                                            )}
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="absolute bottom-4 right-4 text-amber-900/40 flex items-center gap-2">
                    <Map size={24} /> <span className="font-serif italic">Captain's Log: Day {currentIndex + 1}</span>
                </div>

            </div>
        </ActivityLayout>
    );
}
