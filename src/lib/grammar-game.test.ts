import { describe, expect, it } from "vitest";

import {
  QUESTION_COUNT,
  createRound,
  getPerformanceMessage,
  questionBank,
  rankLeaderboard,
  shuffleItems,
  type ScoreEntry,
} from "@/lib/grammar-game";

describe("Grammar Detective game rules", () => {
  it("keeps at least eight grammar clues in the question bank", () => {
    expect(questionBank.length).toBeGreaterThanOrEqual(8);
  });

  it("starts each mission with exactly three distinct questions", () => {
    const round = createRound();

    expect(round).toHaveLength(QUESTION_COUNT);
    expect(new Set(round.map((question) => question.id)).size).toBe(QUESTION_COUNT);
    expect(round.every((question) => question.options.length === 3)).toBe(true);
  });

  it("shuffles with Fisher–Yates without changing the source list", () => {
    const clues = [1, 2, 3, 4];
    const shuffled = shuffleItems(clues, () => 0);

    expect(shuffled).toEqual([2, 3, 4, 1]);
    expect(clues).toEqual([1, 2, 3, 4]);
  });

  it("ranks scores from highest to lowest and keeps only five", () => {
    const entries: ScoreEntry[] = [
      { name: "Ari", score: 1, total: 3, playedAt: "2026-01-01" },
      { name: "Bea", score: 5, total: 5, playedAt: "2026-01-02" },
      { name: "Cal", score: 3, total: 3, playedAt: "2026-01-03" },
      { name: "Dee", score: 2, total: 3, playedAt: "2026-01-04" },
      { name: "Eli", score: 4, total: 4, playedAt: "2026-01-05" },
      { name: "Fox", score: 0, total: 3, playedAt: "2026-01-06" },
    ];

    expect(rankLeaderboard(entries).map((entry) => entry.score)).toEqual([5, 4, 3, 2, 1]);
    expect(entries).toHaveLength(6);
  });

  it("returns a distinct message for a perfect score", () => {
    expect(getPerformanceMessage(3, 3).title).toBe("Case closed!");
  });
});