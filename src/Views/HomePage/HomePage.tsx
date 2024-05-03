import "./homepage.css";
import Terminal from "../../components/terminal/terminal";
import TerminalText from "../../components/terminalText/terminalText";
import { asc_art } from "./asc-art";

const HomePage: React.FC = () => {
  const Bar = () => {
    return <p className="terminal-welcome">-----</p>;
  };

  return (
    <div className="body">
      <TerminalText command="welcome" />
      <pre id="asc-art">{asc_art}</pre>
      <Bar />
      <p className="terminal-welcome">
        Welcome to the Radiant Comp System! Here you can find the best comps
        for valorant premier
      </p>
      <Bar />
      <p className="terminal-welcome">
        To get started, type{" "}
        <span style={{ color: "rgb(0, 255, 156)" }}>"help" </span>to see the
        available commands
      </p>
      <Terminal />
    </div>
  );
};

export default HomePage;
