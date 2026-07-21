import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Layers } from "lucide-react";

const OPTIONS = [1, 2, 3, 4, 5];

export default function RoundSelector({ value, onChange, disabled }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full sm:w-56">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className="glass-input flex w-full items-center justify-between gap-3 rounded-2xl px-5 py-4 text-left disabled:cursor-not-allowed sm:px-6 sm:py-5"
      >
        <span className="flex items-center gap-3">
          <Layers size={20} className="text-white/40" />
          <span className="text-base font-medium text-white sm:text-lg">
            {value} {value === 1 ? "Round" : "Rounds"}
          </span>
        </span>
        <ChevronDown
          size={18}
          className={`text-white/40 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="glass-panel absolute z-20 mt-2 w-full overflow-hidden rounded-2xl p-1.5"
          >
            {OPTIONS.map((n) => (
              <li key={n}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(n);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${
                    n === value
                      ? "bg-judge/15 text-judge"
                      : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {n} {n === 1 ? "Round" : "Rounds"}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
