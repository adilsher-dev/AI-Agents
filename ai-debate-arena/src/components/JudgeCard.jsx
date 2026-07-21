import { motion } from "framer-motion";
import { Gavel, Trophy, Target, FileText, Swords, Flag } from "lucide-react";

/**
 * The backend returns `verdict` as a single free-text string.
 * Since we must not fabricate structure the backend didn't send,
 * this best-effort parser looks for common labeled sections
 * (e.g. "Winner:", "Score:") the LLM judge may have produced,
 * and falls back to rendering the raw text untouched.
 */
function parseVerdict(raw) {
  if (!raw || typeof raw !== "string") {
    return { summary: raw || "" };
  }

  const patterns = {
    winner: /winner\s*:\s*(.+)/i,
    score: /score\s*:\s*(.+)/i,
    summary: /summary\s*:\s*(.+)/i,
    strongestFor: /strongest\s*(for|pro)\s*(argument)?\s*:\s*(.+)/i,
    strongestAgainst: /strongest\s*(against|con)\s*(argument)?\s*:\s*(.+)/i,
    conclusion: /conclusion\s*:\s*(.+)/i,
  };

  const lines = raw.split(/\r?\n+/).filter(Boolean);
  const result = {};
  const leftover = [];

  lines.forEach((line) => {
    let matched = false;
    for (const [key, regex] of Object.entries(patterns)) {
      const m = line.match(regex);
      if (m) {
        result[key] = m[m.length - 1].trim();
        matched = true;
        break;
      }
    }
    if (!matched) leftover.push(line);
  });

  const hasStructure = Object.keys(result).length > 0;
  if (!hasStructure) {
    return { summary: raw };
  }
  if (!result.summary && leftover.length > 0) {
    result.summary = leftover.join(" ");
  }
  return result;
}

function Field({ icon: Icon, label, value, accent }) {
  if (!value) return null;
  return (
    <div className="flex gap-3">
      <div
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] ${accent}`}
      >
        <Icon size={16} />
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40">
          {label}
        </p>
        <p className="mt-0.5 text-sm leading-relaxed text-white/80">{value}</p>
      </div>
    </div>
  );
}

export default function JudgeCard({ verdict }) {
  const parsed = parseVerdict(verdict);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl border border-judge/40 bg-white/[0.04] p-6 shadow-glow-judge backdrop-blur-xl sm:p-8"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-judge/10 blur-[80px]" />

      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-judge/15 text-judge">
          <Gavel size={22} />
        </div>
        <div>
          <p className="font-display text-lg font-bold text-white">
            Judge's Verdict
          </p>
          <p className="text-xs font-medium uppercase tracking-widest text-judge/70">
            Final ruling
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          icon={Trophy}
          label="Winner"
          value={parsed.winner}
          accent="text-judge"
        />
        <Field
          icon={Target}
          label="Score"
          value={parsed.score}
          accent="text-judge"
        />
        <Field
          icon={Swords}
          label="Strongest For argument"
          value={parsed.strongestFor}
          accent="text-pro"
        />
        <Field
          icon={Swords}
          label="Strongest Against argument"
          value={parsed.strongestAgainst}
          accent="text-con"
        />
      </div>

      {parsed.summary && (
        <div className="mt-6 border-t border-white/10 pt-5">
          <Field
            icon={FileText}
            label="Summary"
            value={parsed.summary}
            accent="text-white/60"
          />
        </div>
      )}

      {parsed.conclusion && (
        <div className="mt-5">
          <Field
            icon={Flag}
            label="Conclusion"
            value={parsed.conclusion}
            accent="text-judge"
          />
        </div>
      )}
    </motion.div>
  );
}
