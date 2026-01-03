export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
  tags?: string[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Select the synonym of 'Happy'.",
    options: ["Sad", "Joyful", "Angry", "Tired"],
    answer: "Joyful",
    tags: ["vocabulary", "synonyms"],
  },
  {
    id: 2,
    question: "Complete the sentence: 'She ___ to the market yesterday.'",
    options: ["go", "goes", "went", "gone"],
    answer: "went",
    tags: ["grammar", "past-tense"],
  },
  {
    id: 3,
    question: "Indentify the antonym of 'Brave'.",
    options: ["Couargeous", "Fearless", "Cowardly", "Strong"],
    answer: "Cowardly",
    tags: ["vocabulary", "antonyms"],
  },
  {
    id: 4,
    question: "Which word is a noun?",
    options: ["Run", "Quickly", "Happiness", "Blue"],
    answer: "Happiness",
    tags: ["grammar", "parts-of-speech"],
  },
  {
    id: 5,
    question: "Choose the correct spelling.",
    options: ["Recieve", "Receive", "Receeve", "Reccive"],
    answer: "Receive",
    tags: ["spelling"],
  },
  {
    id: 6,
    question: "Complete: 'I have been waiting ___ two hours.'",
    options: ["since", "for", "from", "at"],
    answer: "for",
    tags: ["grammar", "prepositions"],
  },
  {
    id: 7,
    question: "Select the correct plural form of 'Child'.",
    options: ["Childs", "Children", "Childrens", "Childes"],
    answer: "Children",
    tags: ["grammar", "plurals"],
  },
  {
    id: 8,
    question: "What is the past participle of 'Write'?",
    options: ["Wrote", "Written", "Writed", "Writing"],
    answer: "Written",
    tags: ["grammar", "verbs"],
  },
  {
    id: 9,
    question: "Which sentence is correct?",
    options: [
      "She don't like apples.",
      "She doesn't like apples.",
      "She no like apples.",
      "She not like apples.",
    ],
    answer: "She doesn't like apples.",
    tags: ["grammar", "sentence-structure"],
  },
  {
    id: 10,
    question: "Find the adjective: 'The red car is fast.'",
    options: ["The", "Red", "Car", "Is"],
    answer: "Red",
    tags: ["grammar", "adjectives"],
  },
];
