import { motion, AnimatePresence } from "framer-motion";
import { Swords, Github, RotateCcw, X, Info } from "lucide-react";

/**
 * Sidebar
 * Persistent on desktop (left rail), slide-in drawer on mobile.
 */
export default function Sidebar({ isOpen, onClose, onReset, hasDebate }) {
  const content = (
    <div className="flex h-full flex-col overflow-hidden">

      {/* Top Content */}
      <div className="flex-1 overflow-y-auto pr-1">
        
        {/* Logo */}
        <div className="flex items-center gap-3 px-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pro via-judge to-con shadow-glow-judge">
            <Swords size={20} className="text-arena-void" strokeWidth={2.5} />
          </div>

          <div>
            <p className="font-display text-base font-semibold leading-tight text-white">
              Debate Arena
            </p>
            <p className="text-[11px] uppercase tracking-widest text-white/40">
              AI vs AI
            </p>
          </div>
        </div>


        {/* About */}
        <div className="mt-8 glass-panel rounded-2xl p-4">
          <div className="mb-2 flex items-center gap-2 text-white/70">
            <Info size={14} />
            <span className="text-xs font-semibold uppercase tracking-wider">
              About
            </span>
          </div>

          <p className="text-sm leading-relaxed text-white/60">
            AI Debate Arena pits two autonomous LLM agents against each other —
            one arguing{" "}
            <span className="text-pro font-medium">for</span>{" "}
            a topic, the other{" "}
            <span className="text-con font-medium">against</span>{" "}
            it — across multiple rounds. A neutral AI judge then reviews every
            argument and delivers a verdict.
          </p>
        </div>

      </div>


      {/* Bottom Actions - Always Visible */}
      <div className="mt-4 flex shrink-0 flex-col gap-3">

        <button
  onClick={onReset}
  disabled={!hasDebate}
  className="
  group flex items-center justify-center gap-2 
  rounded-xl border border-white/10 
  bg-white/[0.03] px-4 py-3
  text-sm font-medium text-white/80
  transition-all duration-300
  hover:border-judge/40
  hover:bg-judge/10
  hover:text-judge
  disabled:cursor-not-allowed
  disabled:opacity-30
  "
>
          <RotateCcw
            size={16}
            className="transition-transform duration-500 group-hover:-rotate-180"
          />

          Reset Debate
        </button>


        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="
          flex items-center justify-center gap-2 
          rounded-xl border border-white/10 
          bg-white/[0.03] px-4 py-3 
          text-sm font-medium text-white/80 
          transition-all duration-300 
          hover:border-white/25 hover:bg-white/[0.08]
          "
        >
          <Github size={16} />
          View on GitHub
        </a>

      </div>

    </div>
  );


  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="
        sticky top-0 hidden 
        h-screen w-72 shrink-0 
        border-r border-white/5 
        bg-arena-surface/60 
        p-6 backdrop-blur-xl 
        lg:flex
        "
      >
        {content}
      </aside>


      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="
              fixed inset-0 z-40 
              bg-black/60 backdrop-blur-sm 
              lg:hidden
              "
            />


            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 260,
              }}
              className="
              fixed left-0 top-0 z-50 
              h-screen w-72 
              border-r border-white/10 
              bg-arena-surface p-6 
              lg:hidden
              "
            >

              <button
                onClick={onClose}
                className="
                absolute right-4 top-4 
                rounded-lg p-1.5 
                text-white/50 
                hover:bg-white/10 
                hover:text-white
                "
              >
                <X size={18} />
              </button>


              {content}

            </motion.aside>

          </>
        )}
      </AnimatePresence>
    </>
  );
}