import { useEffect, useRef, useState } from "react";
import "./terminal.css";
import {
  argsMap,
  arguedCommands,
  componentsMap,
} from "../terminal-list/terminal-list";
import TerminalText from "../terminalText/terminalText";
import { createRoot } from "react-dom/client";

const Terminal = () => {
  const [command, setCommandInput] = useState("");
  const inputCommand = useRef<HTMLInputElement>(null);
  const [usedCommands, setUsedCommands] = useState<string[]>([]);
  const [historyCommand, setHistoryCommand] = useState<number>(-1)  

  const formatCommand = (command: string) => {
    const splitCommand = command.split(" ");
    if (splitCommand.length === 1) return { command: command, args: "" };
    return {
      command: splitCommand[0],
      args: splitCommand[1],
    };
  };

  const terminalBody = document.querySelector(".terminal-body");
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "ArrowUp") {
      if(usedCommands.length > 0) {
        if(historyCommand + 1 < usedCommands.length) {
          setHistoryCommand(historyCommand + 1)
          setCommandInput(usedCommands[historyCommand + 1])
        }
      }
    }
    if(e.key === "ArrowDown") {
      if(usedCommands.length > 0) {
        if(historyCommand - 1 >= 0) {
          setHistoryCommand(historyCommand - 1)
          setCommandInput(usedCommands[historyCommand - 1])
        }
      }
    }
    if (e.key === "Enter") {
      setUsedCommands([...usedCommands, command]);
      if (command == "clear" || command == "cls") {
        setCommandInput("");
        inputCommand.current?.focus();
        window.scrollTo(0, document.body.scrollHeight);
        terminalBody!.innerHTML = "";
      } else if (terminalBody) {
        const terminalTextNode = document.createElement("div");

        const terminalCommandNode = document.createElement("div");

        terminalBody.appendChild(terminalTextNode);

        const root = createRoot(terminalTextNode);

        const formatedCommand = formatCommand(command);
        const arquedCommand = arguedCommands.includes(formatedCommand.command);

        if (arquedCommand && argsMap[formatedCommand.args] == undefined) {
          return root.render(
            <TerminalText
              command={`Command "${command}" needs an argument, try help to get all the commands`}
            />
          );
        }

        if (
          componentsMap[
            arquedCommand == true
              ? formatedCommand.args
              : formatedCommand.command
          ] == undefined
        ) {
          return root.render(
            <TerminalText
              command={`Command "${command}" not found , try help to get all the commands`}
            />
          );
        }

        if (
          argsMap[formatedCommand.args] != formatedCommand.command &&
          arquedCommand
        ) {
          return root.render(
            <TerminalText
              command={`Command "${command}" not found , try help to get all the commands`}
            />
          );
        }

        const ComponentToRender =
          componentsMap[
            arquedCommand == true
              ? formatedCommand.args
              : formatedCommand.command
          ];

        terminalBody.appendChild(terminalCommandNode);
        const commandRoot = createRoot(terminalCommandNode);

        root.render(<TerminalText command={command} />);
        commandRoot.render(<ComponentToRender />);

        setCommandInput("");
        inputCommand.current?.focus();
      }
    }
  };
  

  useEffect(() => {
    inputCommand.current?.focus();
  }, []);
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [terminalBody?.children.length]);

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
        <span style={{ color: "rgb(96, 253, 255)" }}>user@</span>
        <span style={{ color: "rgb(0, 255, 156)" }}>
          mateussousasantos-terminal:
        </span>
        <span>~$ </span>
        <input
          autoComplete="off"
          autoFocus
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
