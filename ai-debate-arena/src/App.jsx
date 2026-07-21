import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Controls Reset button state
  const [hasDebate, setHasDebate] = useState(false);

  return (
    <div className="flex min-h-screen bg-arena-void">

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        hasDebate={hasDebate}
        onReset={() => {
          window.dispatchEvent(new Event("RESET_DEBATE"));
          setHasDebate(false);
        }}
      />


      <main className="flex-1 overflow-y-auto">
        <Home
          onDebateStateChange={setHasDebate}
        />
      </main>

    </div>
  );
}