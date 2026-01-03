'use client';
import { useGameLogic } from '../hooks/useGameLogic';
import { ActivityLayout } from '../components/ActivityLayout';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Trophy } from 'lucide-react';

export default function PenaltyKickPage() {
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

    const [ballPosition, setBallPosition] = useState<'left' | 'center' | 'right' | null>(null);
    const [goaliePos, setGoaliePos] = useState<'left' | 'center' | 'right'>('center');

    const handleKick = (opt: string, pos: 'left' | 'center' | 'right') => {
        if (ballPosition) return;

        // Goalie AI (Randomly dive)
        const dives = ['left', 'center', 'right'] as const;
        const dive = dives[Math.floor(Math.random() * dives.length)];
        setGoaliePos(dive);
        setBallPosition(pos);

        // Animation & Result Logic
        setTimeout(() => {
            // You handleAnswer anyway (the fun is just visual). 
            // If you wanted actual mechanic: if goalie blocks, you fail even if answer correct?
            // Let's keep it simple: Correct answer = Goal (Goalie misses). Wrong answer = Miss/Block.
            // Visual override for fun: if correct, force goalie to miss.
            handleAnswer(opt);
            setTimeout(() => {
                setBallPosition(null);
                setGoaliePos('center');
            }, 1000);
        }, 500);
    };

    return (
        <ActivityLayout
            title="Penalty Kick"
            description="Aim for the corner with the correct answer to score!"
            score={score}
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentIndex}
            onReset={resetGame}
            isGameOver={isGameOver}
            streak={streak}
        >
            <div className="relative w-full max-w-4xl h-[60vh] bg-green-600 rounded-xl overflow-hidden shadow-xl border-4 border-white flex flex-col items-center">

                {/* Pitch Texture */}
                <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,255,255,0.1) 50px, transparent 51px)', backgroundSize: '100% 100px' }}></div>

                {/* Crowd / Stands */}
                <div className="w-full h-24 bg-gradient-to-b from-gray-800 to-gray-700 flex items-center justify-center text-white/20 font-bold text-4xl tracking-widest overflow-hidden">
                    CROWD CROWD CROWD
                </div>

                {/* Goal Post */}
                <div className="relative w-3/4 h-48 border-t-8 border-x-8 border-white mx-auto mt-[-10px] z-10 flex justify-between items-end">
                    {/* Net */}
                    <div className="absolute inset-0 bg-white/10" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>

                    {/* Goalie */}
                    <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-32 bg-yellow-400 rounded-full border-4 border-black"
                        animate={{
                            x: goaliePos === 'left' ? -100 : (goaliePos === 'right' ? 100 : '-50%'),
                            rotate: goaliePos === 'left' ? -20 : (goaliePos === 'right' ? 20 : 0)
                        }}
                    />

                    {/* Targets / Options */}
                    {/* Map up to 3 options to Left, Center, Right (or 4 options: top corners?) - Using 3 essential spots for visual simplicity or 4 grid */}
                    {/* Let's layout options as overlays on the goal */}
                    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 p-4 z-20">
                        {currentQuestion.options.map((opt, idx) => {
                            // Positions: Top Left, Top Right, Bottom Left, Bottom Right
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleKick(opt, idx % 2 === 0 ? 'left' : 'right')}
                                    className="bg-white/80 hover:bg-white text-black font-bold p-2 rounded shadow-lg opacity-80 hover:opacity-100 transition"
                                >
                                    {opt}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Question Board */}
                <div className="mt-8 bg-black/60 text-white p-4 rounded-xl backdrop-blur-md z-20">
                    <h2 className="text-xl font-bold">{currentQuestion.question}</h2>
                </div>

                {/* Ball */}
                <motion.div
                    className="absolute bottom-10 w-12 h-12 bg-white rounded-full border-2 border-gray-300 shadow-xl z-30"
                    style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, white, #ddd)' }}
                    animate={ballPosition ? {
                        y: -300,
                        x: ballPosition === 'left' ? -150 : (ballPosition === 'right' ? 150 : 0),
                        scale: 0.5
                    } : { y: 0, x: 0, scale: 1 }}
                />

            </div>
        </ActivityLayout>
    );
}
