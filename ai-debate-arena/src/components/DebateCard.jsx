import { motion } from "framer-motion";
import { ShieldCheck, ShieldX } from "lucide-react";

const cardVariants = {
  hiddenLeft: { opacity: 0, x: -40 },
  hiddenRight: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

function AgentCard({ side, argument }) {
  const isPro = side === "pro";

  return (
    <motion.div
      variants={cardVariants}
      initial={isPro ? "hiddenLeft" : "hiddenRight"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`glass-panel relative flex flex-1 flex-col gap-4 rounded-2xl p-5 sm:p-6 ${
        isPro
          ? "border-pro/20 hover:shadow-glow-pro"
          : "border-con/20 hover:shadow-glow-con"
      } transition-shadow duration-500`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            isPro
              ? "bg-pro/15 text-pro"
              : "bg-con/15 text-con"
          }`}
        >
          {isPro ? <ShieldCheck size={22} /> : <ShieldX size={22} />}
        </div>
        <div>
          <p className="font-display text-sm font-semibold text-white">
            {isPro ? "Agent Aurelius" : "Agent Vex"}
          </p>
          <p
            className={`text-[11px] font-semibold uppercase tracking-widest ${
              isPro ? "text-pro" : "text-con"
            }`}
          >
            {isPro ? "For" : "Against"}
          </p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-white/70 sm:text-[15px]">
        {argument}
      </p>
    </motion.div>
  );
}

export default function DebateCard({ round, pro, con }) {
  return (
    <div className="w-full">
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-white/40">
          Round {round}
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="relative flex flex-col gap-4 md:flex-row md:items-stretch">
        <AgentCard side="pro" argument={pro} />

        {/* VS medallion */}
        <div className="z-10 flex items-center justify-center md:mx-1">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-arena-surface font-display text-[11px] font-bold text-white/50 shadow-glass">
            VS
          </div>
        </div>

        <AgentCard side="con" argument={con} />
      </div>
    </div>
  );
}
