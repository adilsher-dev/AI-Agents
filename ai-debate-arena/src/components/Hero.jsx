import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-16 text-center sm:pt-24">
      {/* Ambient floating orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ y: [0, -24, 0], x: [0, 12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-pro/20 blur-[100px]"
        />
        <motion.div
          animate={{ y: [0, 28, 0], x: [0, -16, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-24 top-20 h-72 w-72 rounded-full bg-con/20 blur-[100px]"
        />
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-judge/10 blur-[100px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/50"
      >
        Two agents. One judge. Zero bias.
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mx-auto max-w-3xl text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl"
      >
        Watch two AIs{" "}
        <span className="bg-gradient-to-r from-pro via-white to-con bg-clip-text text-transparent">
          debate anything
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-white/50 sm:text-lg"
      >
        Give it any topic. A FOR agent and an AGAINST agent argue it out round
        by round, then an impartial AI judge weighs the arguments and hands
        down a verdict.
      </motion.p>
    </section>
  );
}
