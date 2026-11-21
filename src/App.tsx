import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Check,
  Crown,
  Lightbulb,
  Medal,
  ScanSearch,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";

import detectiveOwl from "@/assets/grammar-detective-owl.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LEADERBOARD_STORAGE_KEY,
  QUESTION_COUNT,
  createRound,
  getPerformanceMessage,
  rankLeaderboard,
  type GrammarQuestion,
  type ScoreEntry,
} from "@/lib/grammar-game";

type Screen = "home" | "game" | "result" | "leaderboard";
type AnswerFeedback = "correct" | "wrong" | null;

function readLeaderboard(): ScoreEntry[] {
  try {
    const stored = window.localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : [];

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (entry): entry is ScoreEntry =>
        typeof entry === "object" &&
        entry !== null &&
        "name" in entry &&
        typeof entry.name === "string" &&
        "score" in entry &&
        typeof entry.score === "number" &&
        "total" in entry &&
        typeof entry.total === "number" &&
        "playedAt" in entry &&
        typeof entry.playedAt === "string",
    );
  } catch {
    return [];
  }
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [playerName, setPlayerName] = useState("");
  const [round, setRound] = useState<GrammarQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<AnswerFeedback>(null);
  const [leaderboard, setLeaderboard] = useState<ScoreEntry[]>(() => rankLeaderboard(readLeaderboard()));
  const [resultSaved, setResultSaved] = useState(false);

  const startMission = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!playerName.trim()) return;

    setRound(createRound());
    setQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setFeedback(null);
    setResultSaved(false);
    setScreen("game");
  };

  const chooseAnswer = (option: string, question: GrammarQuestion) => {
    if (selectedOption !== null) return;

    setSelectedOption(option);
    if (option === question.answer) {
      setScore((currentScore) => currentScore + 1);
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }
  };

  const moveToNextQuestion = () => {
    if (questionIndex + 1 === round.length) {
      setScreen("result");
      return;
    }

    setQuestionIndex((currentIndex) => currentIndex + 1);
    setSelectedOption(null);
    setFeedback(null);
  };

  const saveResult = () => {
    if (resultSaved) {
      setScreen("leaderboard");
      return;
    }

    const newEntry: ScoreEntry = {
      name: playerName.trim(),
      score,
      total: round.length,
      playedAt: new Date().toISOString(),
    };
    const nextLeaderboard = rankLeaderboard([newEntry, ...leaderboard]);

    try {
      window.localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(nextLeaderboard));
    } catch {
      // The in-memory board still works for this visit if browser storage is unavailable.
    }

    setLeaderboard(nextLeaderboard);
    setResultSaved(true);
    setScreen("leaderboard");
  };

  const openLeaderboard = () => {
    setLeaderboard(rankLeaderboard(readLeaderboard()));
    setScreen("leaderboard");
  };

  const currentQuestion = round[questionIndex];

  return (
    <div className="game-backdrop min-h-screen text-foreground">
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 sm:px-8">
        <header className="flex items-center justify-between py-6 sm:py-8">
          <button
            type="button"
            className="brand-mark flex items-center gap-3 text-left"
            onClick={() => setScreen("home")}
            aria-label="Back to the Grammar Detective home"
          >
            <span className="grid size-10 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
              <ScanSearch aria-hidden="true" className="size-5" />
            </span>
            <span className="font-display text-base font-bold sm:text-lg">Grammar Detective</span>
          </button>
          <Button
            variant="ghost"
            className="gap-2 rounded-lg px-3 text-muted-foreground hover:text-foreground"
            onClick={openLeaderboard}
          >
            <Trophy aria-hidden="true" className="size-4 text-primary" />
            <span className="hidden sm:inline">Leaderboard</span>
          </Button>
        </header>

        <main className="flex flex-1 items-center justify-center pb-12 pt-3 sm:pb-16">
          {screen === "home" && (
            <section className="glass-panel animate-rise grid w-full max-w-5xl overflow-hidden md:grid-cols-[1.08fr_0.92fr]">
              <div className="flex flex-col justify-center p-7 sm:p-10 md:p-14">
                <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                  <Sparkles aria-hidden="true" className="size-3.5" />
                  CASE FILE 001 · ENGLISH GRAMMAR
                </div>
                <h1 className="font-display max-w-xl text-4xl font-extrabold leading-tight sm:text-5xl">
                  Every sentence leaves a clue.
                </h1>
                <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
                  Spot the grammar glitch, trust your instincts, and solve three clues before the trail goes cold.
                </p>

                <form className="mt-9 max-w-md" onSubmit={startMission}>
                  <label htmlFor="detective-name" className="mb-2 block text-sm font-semibold">
                    Detective name
                  </label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      id="detective-name"
                      value={playerName}
                      onChange={(event) => setPlayerName(event.target.value)}
                      placeholder="Enter your name"
                      maxLength={24}
                      autoComplete="nickname"
                      className="h-12 rounded-lg border-border/80 bg-background/55 px-4"
                    />
                    <Button
                      type="submit"
                      size="lg"
                      disabled={!playerName.trim()}
                      className="spring-hover h-12 shrink-0 rounded-lg px-5 font-bold"
                    >
                      Start Mission <ArrowRight aria-hidden="true" className="size-4" />
                    </Button>
                  </div>
                </form>

                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-border/60 pt-5 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <BookOpenCheck aria-hidden="true" className="size-4 text-primary" />
                    10 grammar clues
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Medal aria-hidden="true" className="size-4 text-primary" />
                    3 per mission
                  </span>
                </div>
              </div>

              <div className="mascot-stage relative flex min-h-72 items-center justify-center overflow-hidden border-t border-border/60 px-4 py-7 md:min-h-full md:border-l md:border-t-0">
                <div className="mascot-halo" aria-hidden="true" />
                <img
                  src={detectiveOwl}
                  alt="Detective owl mascot inspecting punctuation"
                  className="mascot-float relative z-10 w-[min(82%,360px)] object-contain drop-shadow-2xl"
                />
                <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-2 text-xs font-semibold text-muted-foreground backdrop-blur-xl sm:bottom-9 sm:right-9">
                  <Lightbulb aria-hidden="true" className="size-4 text-primary" />
                  Think like a detective
                </div>
              </div>
            </section>
          )}

          {screen === "game" && currentQuestion && (
            <section className="animate-rise w-full max-w-3xl">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-bold text-primary">MISSION IN PROGRESS</p>
                  <h1 className="font-display text-2xl font-bold sm:text-3xl">Find the grammar glitch</h1>
                </div>
                <div className="rounded-lg border border-border/70 bg-card/55 px-4 py-2 text-sm">
                  <span className="text-muted-foreground">Score</span>
                  <span className="ml-3 font-mono font-bold text-primary">{score}</span>
                </div>
              </div>

              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">Clue {questionIndex + 1} of {QUESTION_COUNT}</span>
                <div
                  role="progressbar"
                  aria-label="Mission progress"
                  aria-valuemin={0}
                  aria-valuemax={QUESTION_COUNT}
                  aria-valuenow={questionIndex + 1}
                  className="flex w-40 gap-2 sm:w-52"
                >
                  {Array.from({ length: QUESTION_COUNT }, (_, index) => (
                    <span
                      key={index}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${index <= questionIndex ? "bg-primary" : "bg-muted"}`}
                    />
                  ))}
                </div>
              </div>

              <div className={`glass-panel p-6 sm:p-9 ${feedback === "correct" ? "answer-correct" : ""}`}>
                <div className="mb-6 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-accent/35 bg-accent/15 px-3 py-1.5 text-xs font-semibold text-accent-foreground">
                    {currentQuestion.topic}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">CASE {String(questionIndex + 1).padStart(2, "0")}</span>
                </div>

                <h2 className="font-display text-xl font-semibold leading-relaxed sm:text-2xl">
                  {currentQuestion.sentence.split("___")[0]}
                  <span className="mx-1 inline-block min-w-14 border-b-2 border-primary px-1 text-center font-mono text-primary">____</span>
                  {currentQuestion.sentence.split("___")[1]}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">Choose the word or phrase that completes the sentence.</p>

                <div className="mt-7 grid gap-3">
                  {currentQuestion.options.map((option, index) => {
                    const isCorrect = selectedOption !== null && option === currentQuestion.answer;
                    const isWrongChoice = selectedOption === option && !isCorrect;
                    const stateClass = isCorrect
                      ? "border-success/60 bg-success/10 text-success"
                      : isWrongChoice
                        ? "border-destructive/60 bg-destructive/10 text-destructive"
                        : selectedOption !== null
                          ? "border-border/50 bg-background/20 text-muted-foreground"
                          : "border-border/70 bg-background/35 text-foreground hover:border-primary/60 hover:bg-primary/5";

                    return (
                      <div className="answer-option" key={option}>
                        <Button
                          type="button"
                          variant="outline"
                          disabled={selectedOption !== null}
                          aria-pressed={selectedOption === option}
                          onClick={() => chooseAnswer(option, currentQuestion)}
                          className={`h-auto min-h-14 w-full justify-start gap-4 rounded-lg px-4 py-3 text-left text-base transition-all ${stateClass}`}
                        >
                          <span className="grid size-8 shrink-0 place-items-center rounded-md border border-current/25 font-mono text-xs font-bold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="flex-1 whitespace-normal">{option}</span>
                          {isCorrect && <Check aria-hidden="true" className="size-5 shrink-0" />}
                          {isWrongChoice && <X aria-hidden="true" className="size-5 shrink-0" />}
                        </Button>
                      </div>
                    );
                  })}
                </div>

                {feedback && (
                  <div className="mt-5 flex items-start gap-3 border-t border-border/60 pt-5" aria-live="polite">
                    {feedback === "correct" ? (
                      <BadgeCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-success" />
                    ) : (
                      <Lightbulb aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                    )}
                    <div>
                      <p className={`font-semibold ${feedback === "correct" ? "text-success" : "text-foreground"}`}>
                        {feedback === "correct" ? "Clue solved." : `Not quite — the answer is “${currentQuestion.answer}.”`}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{currentQuestion.explanation}</p>
                    </div>
                  </div>
                )}

                <div className="mt-7 flex justify-end">
                  {selectedOption !== null && (
                    <Button onClick={moveToNextQuestion} className="spring-hover rounded-lg px-5 font-bold">
                      {questionIndex + 1 === round.length ? "See my results" : "Next clue"}
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Button>
                  )}
                </div>
              </div>
            </section>
          )}

          {screen === "result" && (
            <section className="glass-panel animate-rise w-full max-w-3xl p-7 text-center sm:p-12">
              <div className="mx-auto mb-6 grid size-16 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                <Trophy aria-hidden="true" className="size-8" />
              </div>
              <p className="text-xs font-bold text-primary">MISSION COMPLETE</p>
              <h1 className="font-display mt-3 text-3xl font-extrabold sm:text-4xl">
                {getPerformanceMessage(score, round.length).title}
              </h1>
              <p className="mx-auto mt-3 max-w-lg leading-7 text-muted-foreground">
                {getPerformanceMessage(score, round.length).message}
              </p>
              <div className="mx-auto my-8 flex w-fit items-center gap-4 rounded-xl border border-border/70 bg-background/30 px-6 py-4">
                <span className="font-mono text-4xl font-bold text-primary">{score}</span>
                <span className="text-left text-sm text-muted-foreground">out of<br /><strong className="text-foreground">{round.length} clues</strong></span>
              </div>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Button onClick={saveResult} className="spring-hover h-12 rounded-lg px-5 font-bold">
                  {resultSaved ? "View Leaderboard" : "Save & View Leaderboard"}
                  <Trophy aria-hidden="true" className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setScreen("home")}
                  className="h-12 rounded-lg border-border/80 bg-background/40 px-5"
                >
                  <ArrowLeft aria-hidden="true" className="size-4" /> Play again
                </Button>
              </div>
            </section>
          )}

          {screen === "leaderboard" && (
            <section className="glass-panel animate-rise w-full max-w-2xl p-6 sm:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-bold text-primary">THE TOP DETECTIVES</p>
                  <h1 className="font-display text-3xl font-extrabold">Leaderboard</h1>
                  <p className="mt-2 text-sm text-muted-foreground">Best five scores saved in this browser.</p>
                </div>
                <div className="grid size-12 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <Crown aria-hidden="true" className="size-6" />
                </div>
              </div>

              {leaderboard.length > 0 ? (
                <ol className="mt-7 divide-y divide-border/60">
                  {leaderboard.map((entry, index) => (
                    <li key={`${entry.playedAt}-${entry.name}-${index}`} className="flex items-center gap-4 py-4">
                      <span className={`grid size-9 shrink-0 place-items-center rounded-lg border font-mono text-sm font-bold ${index === 0 ? "border-primary/40 bg-primary/10 text-primary" : "border-border/70 bg-background/35 text-muted-foreground"}`}>
                        {index === 0 ? <Crown aria-hidden="true" className="size-4" /> : String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1 truncate font-semibold">{entry.name}</span>
                      <span className="shrink-0 font-mono text-sm font-bold text-primary">{entry.score}<span className="ml-1 font-normal text-muted-foreground">/{entry.total}</span></span>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="my-8 border-y border-border/60 py-8 text-center">
                  <ScanSearch aria-hidden="true" className="mx-auto size-8 text-muted-foreground" />
                  <p className="mt-3 font-semibold">No cases solved yet.</p>
                  <p className="mt-1 text-sm text-muted-foreground">Your first mission can put you on the board.</p>
                </div>
              )}

              <div className="mt-7 flex flex-col justify-between gap-3 sm:flex-row">
                <Button variant="outline" onClick={() => setScreen("home")} className="rounded-lg border-border/80 bg-background/40">
                  <ArrowLeft aria-hidden="true" className="size-4" /> Back to start
                </Button>
                {round.length > 0 && (
                  <Button onClick={() => setScreen("result")} className="spring-hover rounded-lg">
                    Back to results <ArrowRight aria-hidden="true" className="size-4" />
                  </Button>
                )}
              </div>
            </section>
          )}
        </main>

        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-border/35 py-4 text-xs text-muted-foreground">
          <span>Grammar Detective</span>
          <span>One case. Three clues. Trust your instincts.</span>
        </footer>
      </div>
    </div>
  );
}