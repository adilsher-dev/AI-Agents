import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, AlertTriangle } from "lucide-react";

import Hero from "../components/Hero.jsx";
import TopicInput from "../components/TopicInput.jsx";
import RoundSelector from "../components/RoundSelector.jsx";
import Loader from "../components/Loader.jsx";
import DebateCard from "../components/DebateCard.jsx";
import JudgeCard from "../components/JudgeCard.jsx";
import { streamDebate } from "../services/api";
export default function Home({ onDebateStateChange }) {
  const [topic, setTopic] = useState("");
  const [rounds, setRounds] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [history, setHistory] = useState([]);
const [thinking, setThinking] = useState(null);
const [judgeThinking, setJudgeThinking] = useState(false);
const [verdict, setVerdict] = useState(null);
  

  const canStart = topic.trim().length > 0 && !loading;

  
  async function handleStart() {
  if (!canStart) return;

  setLoading(true);
  setError(null);

  setHistory([]);
  setVerdict(null);
  setThinking(null);
  setJudgeThinking(false);

  onDebateStateChange?.(true);

  try {
    await streamDebate(
      {
        topic: topic.trim(),
        rounds,
      },
      (event) => {
        console.log(event);

        switch (event.type) {
          case "thinking":
            setThinking(event);
            break;

          case "argument":
            setThinking(null);

            setHistory((prev) => {
              const updated = [...prev];

              let round = updated.find(
                (r) => r.round === event.round
              );

              if (!round) {
                round = {
                  round: event.round,
                  pro: "",
                  con: "",
                };

                updated.push(round);
              }

              if (event.agent === "FOR") {
                round.pro = event.text;
              } else {
                round.con = event.text;
              }

              return [...updated];
            });

            break;

          case "judge_thinking":
            setJudgeThinking(true);
            break;

          case "verdict":
            setJudgeThinking(false);
            setVerdict(event.verdict);
            setLoading(false);
            onDebateStateChange?.(false);
            break;

          default:
            break;
        }
      }
    );
  } catch (err) {
    setLoading(false);
    setError(err.message);
  }
}

  function handleReset() {

  console.log("RESET EXECUTED");


  setTopic("");

  setRounds(3);


  setHistory([]);

  setThinking(null);

  setJudgeThinking(false);

  setVerdict(null);


  setError(null);

  setLoading(false);


  onDebateStateChange?.(false);

}
  // Exposed to parent (Sidebar "Reset Debate" button) via resetSignal bump.
  // Skips the initial mount so it only fires on an actual reset click.
//   const isFirstRender = useRef(true);

useEffect(() => {

  const resetHandler = () => {

    setTopic("");
    setRounds(3);

    setHistory([]);
    setThinking(null);
    setJudgeThinking(false);
    setVerdict(null);

    setError(null);
    setLoading(false);

  };


  window.addEventListener(
    "RESET_DEBATE",
    resetHandler
  );


  return () => {
    window.removeEventListener(
      "RESET_DEBATE",
      resetHandler
    );
  };

}, []);
const debateStarted =
  history.length > 0 || thinking || judgeThinking || verdict;

return (
  <div className="mx-auto w-full max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">

    {!debateStarted && (
      <>
        <Hero />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mx-auto flex w-full max-w-2xl flex-col gap-4"
        >
          <TopicInput
            value={topic}
            onChange={setTopic}
            disabled={loading}
          />

          <div className="flex flex-col gap-4 sm:flex-row">
            <RoundSelector
              value={rounds}
              onChange={setRounds}
              disabled={loading}
            />

            <motion.button
              whileHover={canStart ? { scale: 1.02 } : {}}
              whileTap={canStart ? { scale: 0.98 } : {}}
              onClick={handleStart}
              disabled={!canStart}
              className="group flex flex-1 items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-pro via-judge to-con bg-[length:200%_100%] px-6 py-4 font-display text-base font-semibold text-arena-void shadow-glow-judge transition-all duration-500 hover:bg-[position:100%_0] disabled:cursor-not-allowed disabled:opacity-40 sm:py-5"
            >
              <Rocket
                size={20}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              Start Debate
            </motion.button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-xl border border-con/30 bg-con/10 px-4 py-3 text-sm text-con"
            >
              <AlertTriangle size={16} className="shrink-0" />
              {error}
            </motion.div>
          )}
        </motion.div>
      </>
    )}

    {loading && <Loader />}

    <AnimatePresence>
      {debateStarted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pt-10"
        >
          <div className="mb-8 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40">
              Debate Topic
            </p>

            <h2 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
              {topic}
            </h2>
          </div>

            <div className="flex flex-col gap-10">

  {history.map((round) => (
    <DebateCard
      key={round.round}
      round={round.round}
      pro={round.pro}
      con={round.con}
    />
  ))}

  {thinking && (
    <div className="glass-panel rounded-2xl p-6 border border-white/10">

      <h3 className="text-xl font-bold text-white">
        {thinking.agent === "FOR"
          ? "🟢 Dr. Alex Chen"
          : "🔴 Prof. Sarah Martinez"}
      </h3>

      <p className="mt-2 text-white/60">
        Thinking...
      </p>

      <div className="mt-4 flex gap-2">
        <div className="h-3 w-3 rounded-full bg-green-400 animate-bounce"></div>
        <div className="h-3 w-3 rounded-full bg-green-400 animate-bounce delay-150"></div>
        <div className="h-3 w-3 rounded-full bg-green-400 animate-bounce delay-300"></div>
      </div>

    </div>
  )}

</div>
            {judgeThinking && (
  <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
    <h2 className="text-2xl font-bold">
      ⚖ Judge is Reviewing Debate...
    </h2>

    <p className="mt-4 animate-pulse text-white/70">
      📖 Reading all arguments...
    </p>

    <p className="animate-pulse text-white/70">
      ⚖ Comparing logic...
    </p>

    <p className="animate-pulse text-white/70">
      🏆 Calculating final score...
    </p>

    <p className="animate-pulse text-white/70">
      ✍ Writing verdict...
    </p>
  </div>
)}

            {verdict && (
  <div className="mt-12">
    <JudgeCard verdict={verdict} />
  </div>
)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

