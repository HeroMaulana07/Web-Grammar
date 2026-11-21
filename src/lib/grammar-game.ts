export type GrammarQuestion = {
  id: string;
  topic: string;
  sentence: string;
  options: string[];
  answer: string;
  explanation: string;
};

export type ScoreEntry = {
  name: string;
  score: number;
  total: number;
  playedAt: string;
};

export const QUESTION_COUNT = 3;
export const LEADERBOARD_STORAGE_KEY = "grammar-detective-leaderboard-v1";

export const questionBank: GrammarQuestion[] = [
  {
    id: "present-simple",
    topic: "Present simple",
    sentence: "She ___ to school each day.",
    options: ["walks", "walk", "walking"],
    answer: "walks",
    explanation: "With she, he, or it in the present simple, the verb takes -s.",
  },
  {
    id: "past-continuous",
    topic: "Past continuous",
    sentence: "They ___ dinner when the phone rang.",
    options: ["were having", "have", "was having"],
    answer: "were having",
    explanation: "Use were + verb-ing for an action in progress with they.",
  },
  {
    id: "present-perfect",
    topic: "Present perfect",
    sentence: "I have lived here ___ 2020.",
    options: ["since", "for", "during"],
    answer: "since",
    explanation: "Use since with the starting point of a period of time.",
  },
  {
    id: "quantifiers",
    topic: "Quantifiers",
    sentence: "There isn't ___ milk left.",
    options: ["much", "many", "few"],
    answer: "much",
    explanation: "Milk is uncountable, so much is the right quantifier here.",
  },
  {
    id: "second-conditional",
    topic: "Second conditional",
    sentence: "If I ___ more time, I'd learn Japanese.",
    options: ["had", "have", "will have"],
    answer: "had",
    explanation: "The second conditional uses if + past simple, then would + verb.",
  },
  {
    id: "passive-voice",
    topic: "Passive voice",
    sentence: "The book ___ by Maya last week.",
    options: ["was written", "wrote", "is writing"],
    answer: "was written",
    explanation: "For a past passive, use was or were + the past participle.",
  },
  {
    id: "comparatives",
    topic: "Comparatives",
    sentence: "He speaks English ___ than his brother.",
    options: ["more fluently", "most fluently", "fluenter"],
    answer: "more fluently",
    explanation: "Long adverbs use more to form the comparative.",
  },
  {
    id: "subject-verb-agreement",
    topic: "Subject–verb agreement",
    sentence: "Neither the teacher nor the students ___ ready.",
    options: ["were", "was", "is"],
    answer: "were",
    explanation: "With neither…nor, the verb agrees with the nearest subject: students.",
  },
  {
    id: "indirect-questions",
    topic: "Indirect questions",
    sentence: "She asked me where ___ the keys.",
    options: ["I had put", "had I put", "did I put"],
    answer: "I had put",
    explanation: "Indirect questions use statement word order: subject before verb.",
  },
  {
    id: "prepositions",
    topic: "Prepositions",
    sentence: "We arrived ___ the station before noon.",
    options: ["at", "in", "on"],
    answer: "at",
    explanation: "Use arrive at for a specific place such as a station.",
  },
];

export function shuffleItems<T>(items: T[], random: () => number = Math.random): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.min(index, Math.floor(random() * (index + 1)));
    const current = shuffled[index];
    const candidate = shuffled[swapIndex];

    if (current !== undefined && candidate !== undefined) {
      shuffled[index] = candidate;
      shuffled[swapIndex] = current;
    }
  }

  return shuffled;
}

export function createRound(random: () => number = Math.random): GrammarQuestion[] {
  return shuffleItems(questionBank, random)
    .slice(0, QUESTION_COUNT)
    .map((question) => ({ ...question, options: shuffleItems(question.options, random) }));
}

export function rankLeaderboard(entries: ScoreEntry[]): ScoreEntry[] {
  return [...entries].sort((left, right) => right.score - left.score).slice(0, 5);
}

export function getPerformanceMessage(score: number, total: number) {
  const percentage = total > 0 ? (score / total) * 100 : 0;

  if (percentage === 100) {
    return {
      title: "Case closed!",
      message: "Every clue was right on the mark. Your grammar instincts are sharp.",
    };
  }

  if (percentage >= 67) {
    return {
      title: "Great detective work.",
      message: "You spotted most of the clues. A little more practice will crack the rest.",
    };
  }

  return {
    title: "The case is still open.",
    message: "Every great detective learns from the clues. Give the next case a try.",
  };
}