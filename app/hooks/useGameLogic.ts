import { useState } from 'react';
import { questions, Question } from '../data/questions';

export function useGameLogic() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [streak, setStreak] = useState(0);

    const currentQuestion = questions[currentIndex];
    const totalQuestions = questions.length;

    const handleAnswer = (selectedOption: string) => {
        const isCorrect = selectedOption === currentQuestion.answer;

        if (isCorrect) {
            setScore((prev) => prev + 10 + (streak * 2));
            setStreak((prev) => prev + 1);
        } else {
            setStreak(0);
        }

        if (currentIndex + 1 < totalQuestions) {
            setTimeout(() => {
                setCurrentIndex((prev) => prev + 1);
            }, 1000); // Small delay for feedback
        } else {
            setTimeout(() => {
                setIsGameOver(true);
            }, 1000);
        }

        return isCorrect;
    };

    const resetGame = () => {
        setCurrentIndex(0);
        setScore(0);
        setIsGameOver(false);
        setStreak(0);
    };

    return {
        currentQuestion,
        currentIndex,
        totalQuestions,
        score,
        streak,
        isGameOver,
        handleAnswer,
        resetGame,
        questions, // Export all questions if needed
    };
}
