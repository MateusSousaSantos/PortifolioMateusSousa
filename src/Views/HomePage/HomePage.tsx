import "./homepage.css";
import Terminal from "../../components/terminal/terminal";
import TerminalText from "../../components/terminalText/terminalText";

const HomePage: React.FC = () => {
  const Bar = () => {
    return <p className="terminal-welcome">-----</p>;
  };
  const radcomp = `
██████╗  █████╗ ██████╗ ██╗ █████╗ ███╗   ██╗████████╗     ██████╗ ██████╗ ███╗   ███╗██████╗     ███████╗██╗   ██╗███████╗████████╗███████╗███╗   ███╗
██╔══██╗██╔══██╗██╔══██╗██║██╔══██╗████╗  ██║╚══██╔══╝    ██╔════╝██╔═══██╗████╗ ████║██╔══██╗    ██╔════╝╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝████╗ ████║
██████╔╝███████║██║  ██║██║███████║██╔██╗ ██║   ██║       ██║     ██║   ██║██╔████╔██║██████╔╝    ███████╗ ╚████╔╝ ███████╗   ██║   █████╗  ██╔████╔██║
██╔══██╗██╔══██║██║  ██║██║██╔══██║██║╚██╗██║   ██║       ██║     ██║   ██║██║╚██╔╝██║██╔═══╝     ╚════██║  ╚██╔╝  ╚════██║   ██║   ██╔══╝  ██║╚██╔╝██║
██║  ██║██║  ██║██████╔╝██║██║  ██║██║ ╚████║   ██║       ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║         ███████║   ██║   ███████║   ██║   ███████╗██║ ╚═╝ ██║
╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝        ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝         ╚══════╝   ╚═╝   ╚══════╝   ╚═╝   ╚══════╝╚═╝     ╚═╝`;
  return (
    <div className="body">
      <TerminalText command="welcome" />
      <pre id="asc-art">{radcomp}</pre>
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
