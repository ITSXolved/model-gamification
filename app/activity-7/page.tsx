'use client';
import { questions } from '../data/questions';
import { ActivityLayout } from '../components/ActivityLayout';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HelpCircle, Star, MessageCircle, Hash, BookOpen } from 'lucide-react';

interface Card {
    id: string; // unique
    content: string;
    type: 'question' | 'answer';
    pairId: number; // to match Q and A
    isFlipped: boolean;
    isMatched: boolean;
    icon?: any;
}

export default function MemoryPairsPage() {
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<Card[]>([]);
    const [matches, setMatches] = useState(0);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        // Select first 6 questions for the grid (12 cards total)
        const selectedQuestions = questions.slice(0, 6);

        let generatedCards: Card[] = [];
        selectedQuestions.forEach((q) => {
            generatedCards.push({
                id: `q-${q.id}`,
                content: q.question,
                type: 'question',
                pairId: q.id,
                isFlipped: false,
                isMatched: false,
                icon: HelpCircle
            });
            generatedCards.push({
                id: `a-${q.id}`,
                content: q.answer,
                type: 'answer',
                pairId: q.id,
                isFlipped: false,
                isMatched: false,
                icon: Star
            });
        });

        // Shuffle
        generatedCards = generatedCards.sort(() => Math.random() - 0.5);
        setCards(generatedCards);
    }, []);

    const handleCardClick = (card: Card) => {
        if (card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

        // Flip the card
        const newCards = cards.map(c => c.id === card.id ? { ...c, isFlipped: true } : c);
        setCards(newCards);

        const newFlipped = [...flippedCards, card];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            const [c1, c2] = newFlipped;
            if (c1.pairId === c2.pairId && c1.type !== c2.type) {
                // Match!
                setTimeout(() => {
                    setCards(prev => prev.map(c => (c.id === c1.id || c.id === c2.id) ? { ...c, isMatched: true, isFlipped: true } : c));
                    setFlippedCards([]);
                    setMatches(prev => {
                        const newMatches = prev + 1;
                        setScore(s => s + 50);
                        if (newMatches === 6) setIsGameOver(true);
                        return newMatches;
                    });
                }, 500);
            } else {
                // No Match
                setTimeout(() => {
                    setCards(prev => prev.map(c => (c.id === c1.id || c.id === c2.id) ? { ...c, isFlipped: false } : c));
                    setFlippedCards([]);
                    setScore(s => Math.max(0, s - 5));
                }, 1000);
            }
        }
    };

    const resetGame = () => {
        window.location.reload();
    };

    return (
        <ActivityLayout
            title="Mind Match"
            description="Find the pairs! Match the Question to its Answer."
            score={score}
            totalQuestions={6}
            currentQuestionIndex={matches}
            onReset={resetGame}
            isGameOver={isGameOver}
        >
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 w-full max-w-4xl p-4">
                {cards.map((card) => (
                    <div key={card.id} className="relative h-36 sm:h-44 w-full perspective-1000 cursor-pointer group" onClick={() => handleCardClick(card)}>
                        <motion.div
                            initial={false}
                            animate={{ rotateY: card.isFlipped ? 180 : 0, opacity: card.isMatched ? 0.5 : 1 }}
                            transition={{ duration: 0.6 }}
                            className="w-full h-full relative preserve-3d transition-transform"
                        >
                            {/* Back (Face Down) */}
                            <div className="absolute inset-0 backface-hidden bg-gradient-to-tr from-purple-600 to-blue-600 rounded-xl shadow-lg flex items-center justify-center border-2 border-white/20 group-hover:scale-105 transition-transform">
                                <Hash className="text-white opacity-50 w-12 h-12" />
                            </div>

                            {/* Front (Face Up) */}
                            <div className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-lg flex flex-col items-center justify-center p-3 text-center border-2 border-indigo-200 rotate-y-180 overflow-hidden">
                                <div className={`mb-2 ${card.type === 'question' ? 'text-purple-500' : 'text-yellow-500'}`}>
                                    {card.type === 'question' ? <HelpCircle size={24} /> : <Star size={24} />}
                                </div>
                                <span className={`text-xs sm:text-sm font-semibold leading-tight ${card.type === 'question' ? 'text-gray-800' : 'text-blue-700 font-bold'}`}>
                                    {card.content}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </ActivityLayout>
    );
}
