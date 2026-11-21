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
    id: "present-simple-01",
    topic: "Present simple",
    sentence: "Dion ___ hard to get a good score on his math exam.",
    options: ["studying", "study", "studies"],
    answer: "studies",
    explanation:
      "Subjek 'Dion' adalah tunggal (he), maka kata kerja mendapat akhiran -s/-es.",
  },
  {
    id: "present-simple-02",
    topic: "Present simple",
    sentence:
      "My friends and I ___ every weekend to chase the latest meta in Valorant.",
    options: ["plays", "play", "playing"],
    answer: "play",
    explanation:
      "'My friends and I' = 'we' (jamak), jadi kata kerja tetap dalam bentuk dasar tanpa -s.",
  },
  {
    id: "present-simple-03",
    topic: "Present simple",
    sentence:
      "Everyone in the classroom ___ the answer, but no one dares to raise their hand.",
    options: ["know", "knows", "knowing"],
    answer: "knows",
    explanation:
      "'Everyone' terdengar jamak tapi secara grammar dianggap tunggal (singular), jadi pakai 'knows'.",
  },
  {
    id: "present-simple-04",
    topic: "Present simple",
    sentence:
      "The new season of my favorite series ___ every Friday at midnight.",
    options: ["drop", "drops", "dropping"],
    answer: "drops",
    explanation:
      "Subjek 'The new season' adalah tunggal (it), sehingga kata kerja mendapat -s.",
  },
  {
    id: "present-simple-05",
    topic: "Present simple",
    sentence: "She ___ coffee in the morning because it makes her anxious.",
    options: ["don't drink", "doesn't drink", "isn't drink"],
    answer: "doesn't drink",
    explanation:
      "Kalimat negatif dengan subjek 'she' menggunakan auxiliary 'does not' (doesn't) + verb 1.",
  },
  {
    id: "present-simple-06",
    topic: "Present simple",
    sentence: "___ your brother work at the coffee shop near campus?",
    options: ["Do", "Does", "Is"],
    answer: "Does",
    explanation:
      "Kalimat tanya dengan subjek 'your brother' (he) menggunakan auxiliary 'Does'.",
  },
  {
    id: "present-simple-07",
    topic: "Present simple",
    sentence:
      "I ___ a night owl; I usually stay up until 2 AM scrolling TikTok.",
    options: ["am", "is", "are"],
    answer: "am",
    explanation: "Subjek 'I' selalu berpasangan dengan 'to be' → 'am'.",
  },
  {
    id: "present-simple-08",
    topic: "Present simple",
    sentence:
      "My little sister always ___ my charger without asking. So annoying!",
    options: ["borrow", "borrows", "is borrowing"],
    answer: "borrows",
    explanation:
      "Kata 'always' menandakan kebiasaan (simple present). Subjek 'sister' (she) → verb + s.",
  },
  {
    id: "present-simple-09",
    topic: "Present simple",
    sentence:
      "Blackpink ___ a comeback next month, and I'm already saving money for the album.",
    options: ["announce", "announces", "announcing"],
    answer: "announces",
    explanation:
      "Nama grup/band dianggap sebagai satu kesatuan (singular), jadi pakai 'announces'.",
  },
  {
    id: "present-simple-10",
    topic: "Present simple",
    sentence: "My phone battery ___ so fast, I need to buy a new powerbank.",
    options: ["die", "dies", "are dying"],
    answer: "dies",
    explanation:
      "'My phone battery' = it (tunggal), sehingga verb mendapat akhiran -s.",
  },
  {
    id: "present-simple-11",
    topic: "Present simple",
    sentence:
      "They ___ like horror movies; they prefer romantic comedies instead.",
    options: ["doesn't", "don't", "aren't"],
    answer: "don't",
    explanation:
      "Subjek 'they' (jamak) dalam kalimat negatif simple present menggunakan 'do not' (don't).",
  },
  {
    id: "present-simple-12",
    topic: "Present simple",
    sentence: "Where ___ your parents usually go on vacation?",
    options: ["do", "does", "are"],
    answer: "do",
    explanation:
      "Wh-question dengan subjek 'your parents' (they/jamak) menggunakan auxiliary 'do'.",
  },
  {
    id: "present-simple-13",
    topic: "Present simple",
    sentence: "The Earth ___ around the Sun once every 365 days.",
    options: ["revolve", "revolves", "revolving"],
    answer: "revolves",
    explanation:
      "Fakta ilmiah/universal truth selalu menggunakan simple present. 'The Earth' = it → verb + s.",
  },
  {
    id: "present-simple-14",
    topic: "Present simple",
    sentence: "The last train to Bogor ___ at 10.45 PM, so don't be late!",
    options: ["leave", "leaves", "leaving"],
    answer: "leaves",
    explanation:
      "Jadwal transportasi (timetable) menggunakan simple present. 'The last train' = it → verb + s.",
  },
  {
    id: "present-simple-15",
    topic: "Present simple",
    sentence: "Each of the students ___ to submit the assignment by Friday.",
    options: ["have", "has", "having"],
    answer: "has",
    explanation:
      "'Each' selalu dianggap singular, jadi pasangan yang tepat adalah 'has', bukan 'have'.",
  },
  {
    id: "present-simple-16",
    topic: "Present simple",
    sentence: "My best friend ___ Instagram stories every single day, no cap.",
    options: ["post", "posts", "are posting"],
    answer: "posts",
    explanation:
      "'My best friend' = he/she (tunggal), sehingga kata kerja mendapat akhiran -s.",
  },
  {
    id: "present-simple-17",
    topic: "Present simple",
    sentence: "You ___ the assignment yet? The deadline is in 10 minutes!",
    options: ["finish", "finishes", "do finish"],
    answer: "finish",
    explanation:
      "Subjek 'you' selalu memakai verb bentuk dasar. Untuk kalimat tanya: 'Do you finish...?'",
  },
  {
    id: "present-simple-18",
    topic: "Present simple",
    sentence: "The coffee shop down the street ___ the best espresso in town.",
    options: ["serve", "serves", "serving"],
    answer: "serves",
    explanation:
      "'The coffee shop' = it (tunggal), sehingga verb mendapat akhiran -s.",
  },
  {
    id: "present-simple-19",
    topic: "Present simple",
    sentence: "Neither Rina nor Dani ___ how to use the new AI tool.",
    options: ["know", "knows", "knowing"],
    answer: "knows",
    explanation:
      "Pada struktur 'neither...nor', verb mengikuti subjek terdekat (Dani = singular) → 'knows'.",
  },
  {
    id: "present-simple-20",
    topic: "Present simple",
    sentence:
      "Water ___ at 100 degrees Celsius, a fact we all learned in science class.",
    options: ["boil", "boils", "is boiling"],
    answer: "boils",
    explanation:
      "Fakta ilmiah (general truth) memakai simple present. 'Water' = uncountable noun (singular) → verb + s.",
  },
];

export function shuffleItems<T>(
  items: T[],
  random: () => number = Math.random,
): T[] {
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

export function createRound(
  random: () => number = Math.random,
): GrammarQuestion[] {
  return shuffleItems(questionBank, random)
    .slice(0, QUESTION_COUNT)
    .map((question) => ({
      ...question,
      options: shuffleItems(question.options, random),
    }));
}

export function rankLeaderboard(entries: ScoreEntry[]): ScoreEntry[] {
  return [...entries]
    .sort((left, right) => right.score - left.score)
    .slice(0, 5);
}

export function getPerformanceMessage(score: number, total: number) {
  const percentage = total > 0 ? (score / total) * 100 : 0;

  if (percentage === 100) {
    return {
      title: "Case closed!",
      message:
        "Every clue was right on the mark. Your grammar instincts are sharp.",
    };
  }

  if (percentage >= 67) {
    return {
      title: "Great detective work.",
      message:
        "You spotted most of the clues. A little more practice will crack the rest.",
    };
  }

  return {
    title: "The case is still open.",
    message:
      "Every great detective learns from the clues. Give the next case a try.",
  };
}
