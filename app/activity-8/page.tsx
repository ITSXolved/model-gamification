'use client';
import { useGameLogic } from '../hooks/useGameLogic';
import { ActivityLayout } from '../components/ActivityLayout';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Rocket, Target } from 'lucide-react';

export default function SpaceDefenderPage() {
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

    // Simple game state
    const [enemies, setEnemies] = useState<{ id: string, opt: string, x: number, y: number }[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Spawn enemies for current question
        const newEnemies = currentQuestion.options.map((opt, i) => ({
            id: `${currentIndex}-${i}`,
            opt,
            x: (i + 1) * 20 - 10, // 10%, 30%, 50%, 70% simple distribution
            y: 0,
        }));
        setEnemies(newEnemies);
    }, [currentIndex, currentQuestion]);

    // Game Loop (very simplified for React compatibility)
    useEffect(() => {
        if (isGameOver) return;

        const interval = setInterval(() => {
            setEnemies(prev => prev.map(e => ({
                ...e,
                y: e.y + 0.5 // Fall speed
            })));
        }, 50);

        return () => clearInterval(interval);
    }, [isGameOver]);

    const shoot = (enemy: typeof enemies[0]) => {
        // Immediate hit for demo (no projectile travel time)
        handleAnswer(enemy.opt);
    };

    return (
        <ActivityLayout
            title="Space Mission"
            description="Shoot the correct asteroid! Do not let them hit the ship."
            score={score}
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentIndex}
            onReset={resetGame}
            isGameOver={isGameOver}
            streak={streak}
        >
            <div ref={containerRef} className="relative w-full h-[60vh] bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-gray-800">
                {/* Starfield effect */}
                <div className="absolute inset-0 opacity-50" style={{ background: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                {/* HUD */}
                <div className="absolute top-4 left-0 right-0 text-center z-10">
                    <span className="bg-black/50 text-white px-4 py-2 rounded-full border border-white/20 text-lg font-bold">
                        {currentQuestion.question}
                    </span>
                </div>

                {/* Enemies */}
                {enemies.map((enemy) => (
                    <motion.button
                        key={enemy.id}
                        className="absolute w-24 h-24 rounded-full flex items-center justify-center p-2 text-xs font-bold text-white bg-gray-800 border-2 border-red-500 hover:border-white transition-colors z-20"
                        style={{ left: `${enemy.x}%` }}
                        animate={{ top: `${enemy.y}%` }}
                        onClick={() => shoot(enemy)}
                        whileHover={{ scale: 1.1 }}
                    >
                        <div className="absolute inset-0 animate-pulse bg-red-900/40 rounded-full"></div>
                        <span className="z-10 text-center">{enemy.opt}</span>
                    </motion.button>
                ))}

                {/* Player Ship */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-blue-400">
                    <Rocket size={48} className="fill-current" />
                </div>
            </div>
        </ActivityLayout>
    );
}
