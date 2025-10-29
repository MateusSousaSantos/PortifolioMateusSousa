import "./homepage.css";
import Terminal from "../../components/terminal/terminal";

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
  setUsedCommands 
}) => {

  return (
    <div className="body">
      <Terminal 
        onOpenVim={onOpenVim}
        terminalHistory={terminalHistory}
        setTerminalHistory={setTerminalHistory}
        usedCommands={usedCommands}
        setUsedCommands={setUsedCommands}
      />
    </div>
  );
};

export default HomePage;
