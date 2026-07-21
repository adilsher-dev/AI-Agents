/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        arena: {
          void: "#05060A",
          surface: "#0B0D14",
          line: "#1C2030",
        },
        pro: {
          DEFAULT: "#22C55E",
          soft: "#86EFAC",
          glow: "#10B981",
        },
        con: {
          DEFAULT: "#F43F5E",
          soft: "#FDA4AF",
          glow: "#EF4444",
        },
        judge: {
          DEFAULT: "#F5B942",
          soft: "#FDE68A",
          glow: "#EAB308",
        },
      },
      backgroundImage: {
        "arena-radial":
          "radial-gradient(circle at 20% 15%, rgba(34,197,94,0.14), transparent 40%), radial-gradient(circle at 80% 15%, rgba(244,63,94,0.14), transparent 40%), radial-gradient(circle at 50% 100%, rgba(245,185,66,0.10), transparent 45%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.45)",
        "glow-pro": "0 0 40px -10px rgba(34, 197, 94, 0.45)",
        "glow-con": "0 0 40px -10px rgba(244, 63, 94, 0.45)",
        "glow-judge": "0 0 60px -10px rgba(245, 185, 66, 0.55)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 8s ease-in-out infinite",
        "spin-slow": "spin 6s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
      },
    },
  },
  plugins: [],
};
