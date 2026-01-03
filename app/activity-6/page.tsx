'use client';
import { useGameLogic } from '../hooks/useGameLogic';
import { ActivityLayout } from '../components/ActivityLayout';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HelpCircle, Zap } from 'lucide-react';

export default function QuizShowPage() {
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

    const [visibleOptions, setVisibleOptions] = useState<string[]>([]);
    const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    useEffect(() => {
        setVisibleOptions(currentQuestion.options);
        setSelected(null);
        setFiftyFiftyUsed(false); // Reset lifeline per question? Or per game? Usually per game.
        // For demo, let's reset per game, but logic here resets per question effectively if I don't store it in main hook.
        // I'll make lifeline single-use per question for fun (easier) or global? 
        // Let's make it infinite for demo purposes or track it locally if needed.
        // Actually, let's keep it simple: 50/50 is available every question for demonstration.
    }, [currentIndex, currentQuestion]);

    const useFiftyFifty = () => {
        if (fiftyFiftyUsed) return;
        const correct = currentQuestion.answer;
        const wrongOptions = currentQuestion.options.filter(o => o !== correct);
        const keptWrong = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        // Hide others
        const newOptions = currentQuestion.options.map(o => (o === correct || o === keptWrong) ? o : '');
        setVisibleOptions(newOptions);
        setFiftyFiftyUsed(true);
    };

    const handleSelect = (opt: string) => {
        if (selected || !opt) return;
        setSelected(opt);
        handleAnswer(opt);
    };

    return (
        <ActivityLayout
            title="Quiz Master"
            description="The high stakes quiz show! Use your lifelines wisely."
            score={score}
            totalQuestions={totalQuestions}
            currentQuestionIndex={currentIndex}
            onReset={resetGame}
            isGameOver={isGameOver}
            streak={streak}
        >
            <div className="w-full max-w-4xl bg-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-700 min-h-[60vh] flex flex-col justify-between text-white">
                <div className="flex justify-between items-start mb-8">
                    <div className="text-yellow-400 font-bold text-lg">QUESTION {currentIndex + 1}</div>
                    <div className="flex gap-2">
                        <button
                            onClick={useFiftyFifty}
                            disabled={fiftyFiftyUsed}
                            className={`flex items-center gap-1 px-3 py-1 rounded border ${fiftyFiftyUsed ? 'opacity-50 border-gray-600 text-gray-500' : 'border-blue-500 text-blue-400 hover:bg-blue-900'}`}
                        >
                            <Zap size={16} /> 50:50
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center leading-tight">
                        {currentQuestion.question}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((opt, idx) => {
                        const isHidden = visibleOptions[idx] === '';
                        const isSelected = selected === opt;
                        const isCorrect = opt === currentQuestion.answer;

                        let borderClass = 'border-gray-600 hover:border-yellow-400 hover:bg-gray-800';
                        if (isSelected) {
                            if (isCorrect) borderClass = 'border-green-500 bg-green-900/50';
                            else borderClass = 'border-red-500 bg-red-900/50';
                        }

                        return (
                            <button
                                key={idx}
                                disabled={isHidden || !!selected}
                                onClick={() => handleSelect(opt)}
                                className={`p-6 rounded-full border-2 text-left transition-all duration-200 flex items-center ${borderClass} ${isHidden ? 'invisible' : ''}`}
                            >
                                <span className="text-yellow-500 font-bold mr-4">{String.fromCharCode(65 + idx)}:</span>
                                <span className="text-lg font-medium">{opt}</span>
                            </button>
                        )
                    })}
                </div>
            </div>
        </ActivityLayout>
    );
}
