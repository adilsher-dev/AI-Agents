import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/5 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-white/40 sm:flex-row">
        <p>
          Created by{" "}
          <span className="font-medium text-white/70">Adil Sher</span>
        </p>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-judge/40 hover:bg-judge/10 hover:text-judge"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
