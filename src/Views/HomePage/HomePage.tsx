import "./homepage.css";
import Terminal from "../../components/terminal/terminal";
import FaultyTerminal from "../../components/FaultyTerminal/FaultyTerminal";
import { useEffect, useMemo } from "react";
import { useTerminal } from "../../components/terminal/useTerminal";

export const Bar = () => {
  return <p className="terminal-welcome">-----</p>;
};

// Terminal history types
interface CommandEntry {
  id: string;
  command: string;
  component: React.ReactElement | null;
  timestamp: number;
}

interface HomePageProps {
  onOpenVim: (fileName: string, initialContent?: string) => void;
  terminalHistory: CommandEntry[];
  setTerminalHistory: React.Dispatch<React.SetStateAction<CommandEntry[]>>;
  usedCommands: string[];
  setUsedCommands: React.Dispatch<React.SetStateAction<string[]>>;
}

const HomePage: React.FC<HomePageProps> = ({
  onOpenVim,
  terminalHistory,
  setTerminalHistory,
  usedCommands,
  setUsedCommands,
}) => {
  const useT = useTerminal();
  useEffect(() => {
    useT.executeCommand("Hello");
  }, []);
  const faultyTerminal = useMemo(
    () => (
      <FaultyTerminal
        scale={3}
        gridMul={[2, 1]}
        digitSize={1.2}
        timeScale={1}
        pause={false}
        scanlineIntensity={0}
        glitchAmount={0.5}
        flickerAmount={1}
        noiseAmp={1}
        chromaticAberration={0}
        dither={0}
        curvature={0.2}
        tint="#ffffff"
        mouseReact={true}
        mouseStrength={0.5}
        brightness={0.3}
      />
    ),
    []
  );
  return (
    <div className="body">
      <div className="background-container">
        {faultyTerminal}
      </div>
      <div className="terminal-container">
        <Terminal
          onOpenVim={onOpenVim}
          terminalHistory={terminalHistory}
          setTerminalHistory={setTerminalHistory}
          usedCommands={usedCommands}
          setUsedCommands={setUsedCommands}
        />
      </div>
    </div>
  );
};

export default HomePage;
