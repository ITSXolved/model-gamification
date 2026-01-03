'use client';
import { useGameLogic } from '../hooks/useGameLogic';
import { ActivityLayout } from '../components/ActivityLayout';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

export default function CodeRainPage() {
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

    // Falling streams
    const [streams, setStreams] = useState<any[]>([]);

    useEffect(() => {
        // Generate random streams, some containing options
        const newStreams = Array.from({ length: 10 }).map((_, i) => {
            const hasOption = i % 2 === 0 && (i / 2 < currentQuestion.options.length);
            return {
                id: i,
                text: hasOption ? currentQuestion.options[Math.floor(i / 2)] : String.fromCharCode(0x30A0 + Math.random() * 96), // Katakana or random
                isOption: hasOption,
                left: i * 10 + Math.random() * 5,
                speed: Math.random() * 5 + 5,
                delay: Math.random() * 5
            };
        });
        setStreams(newStreams);
    }, [currentIndex, currentQuestion]);

    const handleHack = (text: string, isOption: boolean) => {
        if (isOption) {
            handleAnswer(text);
        }
    };

    return (
        <ActivityLayout
            title="Code Rain"
            description="Hack the system! Catch the correct code packet falling from the stream."
            score={score}
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentIndex}
            onReset={resetGame}
            isGameOver={isGameOver}
            streak={streak}
        >
            <div className="relative w-full h-[60vh] bg-black font-mono overflow-hidden rounded-xl border-4 border-green-900 shadow-2xl flex flex-col items-center">

                <div className="z-10 bg-black/80 text-green-500 w-full p-4 text-center border-b border-green-800">
                    <span className="text-xl font-bold animate-pulse">&gt; {currentQuestion.question}_</span>
                </div>

                <div className="absolute inset-0">
                    {streams.map((stream) => (
                        <motion.div
                            key={`${currentIndex}-${stream.id}`}
                            initial={{ y: -100 }}
                            animate={{ y: '120%' }}
                            transition={{
                                duration: stream.speed,
                                repeat: Infinity,
                                ease: "linear",
                                delay: stream.delay
                            }}
                            className="absolute flex flex-col items-center"
                            style={{ left: `${stream.left}%` }}
                        >
                            {/* Trail */}
                            <div className="text-green-900 opacity-50 text-xs writing-vertical">
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <div key={j}>{String.fromCharCode(0x30A0 + Math.random() * 96)}</div>
                                ))}
                            </div>

                            {/* Head */}
                            <button
                                onClick={() => handleHack(stream.text, stream.isOption)}
                                disabled={!stream.isOption}
                                className={`
                            mt-2 p-2 rounded 
                            ${stream.isOption ? 'bg-green-500/20 text-green-100 font-bold border border-green-500 hover:bg-green-500 hover:text-black cursor-pointer' : 'text-green-800 pointer-events-none'}
                         `}
                            >
                                {stream.text}
                            </button>
                        </motion.div>
                    ))}
                </div>

                <div className="absolute bottom-4 left-4 text-green-700 text-xs">
                    <Terminal size={16} className="inline mr-2" /> SYSTEM STATUS: UNSTABLE
                </div>
            </div>
        </ActivityLayout>
    );
}
