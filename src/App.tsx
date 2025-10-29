import React, { useState, useCallback, useEffect } from "react";
import HomePage from "./Views/HomePage/HomePage";
import VimEditor from "./components/vim-editor/VimEditor";
import StartupAnimation from "./components/startup/StartupAnimation";

interface VimSession {
  fileName: string;
  initialContent?: string;
}

// Terminal history types
interface CommandEntry {
  id: string;
  command: string;
  component: React.ReactElement | null;
  timestamp: number;
}

function App() {
  const [vimSession, setVimSession] = useState<VimSession | null>(null);
  const [terminalHistory, setTerminalHistory] = useState<CommandEntry[]>([]);
  const [usedCommands, setUsedCommands] = useState<string[]>([]);
  const [showStartup, setShowStartup] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  // Check if this is the first visit
  useEffect(() => {
      setShowStartup(true);
  }, []);

  const handleStartupComplete = useCallback(() => {
    // Mark as visited and hide startup animation
    localStorage.setItem('mateus-portfolio-visited', 'true');
    setShowStartup(false);
    setIsFirstVisit(false);
  }, []);

  const handleOpenVim = useCallback((fileName: string, initialContent?: string) => {
    setVimSession({ fileName, initialContent });
  }, []);

  const handleCloseVim = useCallback(() => {
    setVimSession(null);
  }, []);

  // Show startup animation on first visit
  if (showStartup && isFirstVisit) {
    return <StartupAnimation onComplete={handleStartupComplete} />;
  }

  if (vimSession) {
    return (
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: '#000', 
        zIndex: 1000 
      }}>
        <VimEditor
          fileName={vimSession.fileName}
          initialContent={vimSession.initialContent}
          onExit={handleCloseVim}
          isFullPage={true}
        />
      </div>
    );
  }

  return (
    <>
      <HomePage 
        onOpenVim={handleOpenVim}
        terminalHistory={terminalHistory}
        setTerminalHistory={setTerminalHistory}
        usedCommands={usedCommands}
        setUsedCommands={setUsedCommands}
      />
      <div>

      </div>
    </>
  );
}

export default App;
