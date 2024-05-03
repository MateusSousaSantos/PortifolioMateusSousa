import { useEffect, useRef, useState } from "react";
import "./terminal.css";
import { componentsMap } from "../terminal-list/terminal-list";
import ReactDOM from "react-dom"; // Import ReactDOM
import TerminalText from "../terminalText/terminalText";

const Terminal = () => {
  const [command, setCommandInput] = useState("");
  const inputCommand = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const terminalBody = document.querySelector(".terminal-body");
      if (command == "clear") {
        setCommandInput("");
        inputCommand.current?.focus();
        window.scrollTo(0, document.body.scrollHeight);
        terminalBody!.innerHTML = "";
      }
      else if (terminalBody) {
        const terminalTextNode = document.createElement("div");
        const terminalCommandNode = document.createElement("div");
        const ComponentToRender = componentsMap[command];

        terminalBody.appendChild(terminalTextNode);
        terminalBody.appendChild(terminalCommandNode);

        ReactDOM.render(<TerminalText command={command} />, terminalTextNode);
        ReactDOM.render(<ComponentToRender />, terminalCommandNode);

        setCommandInput("");
        inputCommand.current?.focus();
        window.scrollTo(0, document.body.scrollHeight);
      }
    }
  };

  useEffect(() => {
    inputCommand.current?.focus();
  }, []);

  return (
    <div>
      <div className="terminal-body"></div>
      <pre
        style={{
          fontFamily: "monospace",
          marginLeft: "25px",
          fontSize: "larger",
        }}
      >
        <span style={{ color: "rgb(96, 253, 255)" }}>player@</span>
        <span style={{ color: "rgb(0, 255, 156)" }}>
          radiantcompsystem-terminal:
        </span>
        <span>~$ </span>
        <input
          type="text"
          name="command-input"
          id="command-input"
          ref={inputCommand}
          value={command}
          onChange={(e) => setCommandInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </pre>
    </div>
  );
};

export default Terminal;
