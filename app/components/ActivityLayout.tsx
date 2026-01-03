import React from 'react';
import Link from 'next/link';
import { RefreshCw, Home } from 'lucide-react';

interface LayoutProps {
    title: string;
    description: string;
    score: number;
    totalQuestions: number;
    currentQuestionIndex: number; // 0-indexed
    children: React.ReactNode;
    onReset: () => void;
    isGameOver: boolean;
    streak?: number;
}

export function ActivityLayout({
    title,
    description,
    score,
    totalQuestions,
    currentQuestionIndex,
    children,
    onReset,
    isGameOver,
    streak = 0,
}: LayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-4 font-sans">
            {/* Header */}
            <header className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-gray-500 hover:text-blue-600 transition">
                        <Home size={24} />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
                        <p className="text-sm text-gray-500 hidden sm:block">{description}</p>
                    </div>
                </div>
                <div className="flex gap-4 text-right">
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-400 uppercase font-bold">Score</span>
                        <span className="text-2xl font-bold text-blue-600">{score}</span>
                    </div>
                    {streak > 1 && (
                        <div className="flex flex-col items-end animate-pulse text-orange-500">
                            <span className="text-xs uppercase font-bold">Streak</span>
                            <span className="text-2xl font-bold">x{streak}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Progress Bar */}
            {!isGameOver && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${((currentQuestionIndex) / totalQuestions) * 100}%` }}
                    ></div>
                    <div className="text-right text-xs text-gray-500 mt-1">
                        Question {currentQuestionIndex + 1} of {totalQuestions}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center">
                {isGameOver ? (
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center max-w-md w-full animate-in fade-in zoom-in duration-500">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Activity Complete!</h2>
                        <p className="text-gray-500 mb-6">You scored <span className="text-blue-600 font-bold text-xl">{score}</span> points!</p>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={onReset}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-transform active:scale-95"
                            >
                                <RefreshCw size={20} /> Play Again
                            </button>
                            <Link
                                href="/"
                                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-transform active:scale-95"
                            >
                                <Home size={20} /> Menu
                            </Link>
                        </div>
                    </div>
                ) : (
                    children
                )}
            </main>
        </div>
    );
}
