import { motion } from "framer-motion";
import { Shield, Swords, Sword } from "lucide-react";

export default function Loader() {
  return (
    <div className="py-20 text-center">

      <h2 className="text-3xl font-bold text-white">
        Initializing Debate...
      </h2>

      <p className="mt-4 text-white/60">
        Preparing AI agents...
      </p>

      <div className="mt-8 flex justify-center gap-3">

        <div className="w-4 h-4 rounded-full bg-cyan-400 animate-bounce"></div>

        <div className="w-4 h-4 rounded-full bg-cyan-400 animate-bounce delay-150"></div>

        <div className="w-4 h-4 rounded-full bg-cyan-400 animate-bounce delay-300"></div>

      </div>

    </div>
  );
}