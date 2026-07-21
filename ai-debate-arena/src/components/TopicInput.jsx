import { motion } from "framer-motion";
import { MessageSquareText } from "lucide-react";

export default function TopicInput({ value, onChange, disabled }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-input flex w-full items-center gap-3 rounded-2xl px-5 py-4 sm:px-6 sm:py-5"
    >
      <MessageSquareText size={20} className="shrink-0 text-white/40" />
      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter a debate topic..."
        maxLength={200}
        className="w-full bg-transparent text-base font-medium text-white placeholder:text-white/30 focus:outline-none disabled:cursor-not-allowed sm:text-lg"
      />
      {value.length > 0 && (
        <span className="hidden shrink-0 text-xs text-white/30 sm:block">
          {value.length}/200
        </span>
      )}
    </motion.div>
  );
}
