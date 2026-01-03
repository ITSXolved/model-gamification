import Link from 'next/link';
import {
  Zap,
  Layers,
  MousePointer,
  Move,
  CheckCircle,
  Tv,
  Grid,
  Rocket,
  Footprints,
  Box,
  Loader,
  CarFront,
  Lock,
  Map,
  FlaskConical,
  Terminal,
  Trophy,
  TrainTrack
} from 'lucide-react';

const activities = [
  {
    id: 1,
    title: "Speed Match",
    description: "Race against the clock to select the right answer.",
    icon: Zap,
    color: "bg-red-500",
    href: "/activity-1",
  },
  {
    id: 2,
    title: "Mastery Flashcards",
    description: "Flip cards to peek, then tick the correct answer.",
    icon: Layers,
    color: "bg-blue-500",
    href: "/activity-2",
  },
  {
    id: 3,
    title: "Bubble Pop",
    description: "Catch the floating answers before they disappear.",
    icon: MousePointer,
    color: "bg-cyan-500",
    href: "/activity-3",
  },
  {
    id: 4,
    title: "Sentence Builder",
    description: "Drag and drop words to complete the sentence.",
    icon: Move,
    color: "bg-purple-500",
    href: "/activity-4",
  },
  {
    id: 5,
    title: "Swipe Decisions",
    description: "Quickly swipe right for correct, left for incorrect.",
    icon: CheckCircle,
    color: "bg-green-500",
    href: "/activity-5",
  },
  {
    id: 6,
    title: "Quiz Master",
    description: "High stakes trivia with lifelines.",
    icon: Tv,
    color: "bg-indigo-500",
    href: "/activity-6",
  },
  {
    id: 7,
    title: "Mind Match",
    description: "Memory game: Pair questions with their answers.",
    icon: Grid,
    color: "bg-orange-500",
    href: "/activity-7",
  },
  {
    id: 8,
    title: "Space Mission",
    description: "Shoot the asteroids that contain the right answer.",
    icon: Rocket,
    color: "bg-gray-800",
    href: "/activity-8",
  },
  {
    id: 9,
    title: "Canyon Jump",
    description: "Jump to the correct stone to cross the wide canyon.",
    icon: Footprints,
    color: "bg-stone-500",
    href: "/activity-9",
  },
  {
    id: 10,
    title: "Tower Builder",
    description: "Stack blocks higher by choosing the right answers.",
    icon: Box,
    color: "bg-orange-600",
    href: "/activity-10",
  },
  {
    id: 11,
    title: "Orbit Selector",
    description: "Catch the correct option as it orbits the sun.",
    icon: Loader,
    color: "bg-yellow-500",
    href: "/activity-11",
  },
  {
    id: 12,
    title: "Lane Racer",
    description: "Switch lanes to collect the right answer.",
    icon: CarFront,
    color: "bg-red-600",
    href: "/activity-12",
  },
  {
    id: 13,
    title: "Safe Cracker",
    description: "Turn the dial to crack the code.",
    icon: Lock,
    color: "bg-gray-700",
    href: "/activity-13",
  },
  {
    id: 14,
    title: "Treasure Map",
    description: "Dig for treasure, avoid the traps.",
    icon: Map,
    color: "bg-amber-600",
    href: "/activity-14",
  },
  {
    id: 15,
    title: "Potion Lab",
    description: "Brew the correct ingredient exlir.",
    icon: FlaskConical,
    color: "bg-purple-600",
    href: "/activity-15",
  },
  {
    id: 16,
    title: "Code Rain",
    description: "Hack the matrix by catching the right code.",
    icon: Terminal,
    color: "bg-green-700",
    href: "/activity-16",
  },
  {
    id: 17,
    title: "Penalty Kick",
    description: "Score a goal by aiming at the right target.",
    icon: Trophy,
    color: "bg-emerald-500",
    href: "/activity-17",
  },
  {
    id: 18,
    title: "Train Switch",
    description: "Guide the train to the correct station.",
    icon: TrainTrack,
    color: "bg-stone-700",
    href: "/activity-18",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            English Gamification Lab
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore 8 different ways to gamify Multiple Choice Questions.
            Select an activity below to start learning.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity) => (
            <Link
              key={activity.id}
              href={activity.href}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 block"
            >
              <div className={`w-14 h-14 rounded-xl ${activity.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <activity.icon size={28} />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {activity.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                {activity.description}
              </p>

              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-gray-300">
                <activity.icon size={48} className="opacity-10" />
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-16 text-center text-gray-400 text-sm">
          Built with Next.js & Tailwind CSS
        </footer>
      </div>
    </div>
  );
}
