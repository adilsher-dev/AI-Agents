import { motion } from "framer-motion";
import { Menu, Swords, Sparkles } from "lucide-react";

export default function Navbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-arena-void/70 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pro via-judge to-con">
              <Swords size={16} className="text-arena-void" />
            </div>
            <span className="font-display text-sm font-semibold">
              Debate Arena
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-white/60 sm:flex"
        >
          <Sparkles size={13} className="text-judge" />
          Powered by LangChain &amp; Groq
        </motion.div>
      </div>
    </header>
  );
}
