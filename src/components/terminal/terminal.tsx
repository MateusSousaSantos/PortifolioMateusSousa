import React, { useEffect, useRef, useState, useCallback } from "react";
import "./terminal.css";
import {
  argsMap,
  arguedCommands,
  componentsMap,
  aboutArgsMap,
  getHelloContent,
  getWelcomeContent,
  getHelpContent,
  getAboutMeContent,
  getAboutSkillsContent,
  getAboutProjectsContent,
} from "../terminal-list/terminal-list";
import TerminalText from "../terminalText/terminalText";
import TerminalErrorBoundary from "./TerminalErrorBoundary";
import CommandErrorBoundary from "./CommandErrorBoundary";

// Type definitions for better type safety
interface CommandEntry {
  id: string;
  command: string;
  component: React.ReactElement | null;
  timestamp: number;
}

interface ParsedCommand {
  command: string;
  args: string;
}

interface TerminalProps {
  onOpenVim?: (fileName: string, initialContent?: string) => void;
  terminalHistory?: CommandEntry[];
  setTerminalHistory?: React.Dispatch<React.SetStateAction<CommandEntry[]>>;
  usedCommands?: string[];
  setUsedCommands?: React.Dispatch<React.SetStateAction<string[]>>;
}

const Terminal: React.FC<TerminalProps> = ({ 
  onOpenVim,
  terminalHistory: externalTerminalHistory,
  setTerminalHistory: setExternalTerminalHistory,
  usedCommands: externalUsedCommands,
  setUsedCommands: setExternalUsedCommands
}) => {
  const [command, setCommandInput] = useState("");
  const inputCommand = useRef<HTMLInputElement>(null);
  
  // Use external state if provided, otherwise use local state
  const [localUsedCommands, setLocalUsedCommands] = useState<string[]>([]);
  const [localTerminalHistory, setLocalTerminalHistory] = useState<CommandEntry[]>([]);
  
  const usedCommands = externalUsedCommands || localUsedCommands;
  const setUsedCommands = setExternalUsedCommands || setLocalUsedCommands;
  const terminalHistory = externalTerminalHistory || localTerminalHistory;
  const setTerminalHistory = setExternalTerminalHistory || setLocalTerminalHistory;
  
  const [historyCommand, setHistoryCommand] = useState<number>(-1);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Pure function for command parsing
  const formatCommand = useCallback((command: string): ParsedCommand => {
    const splitCommand = command.split(" ");
    if (splitCommand.length === 1) return { command: command, args: "" };
    return {
      command: splitCommand[0],
      args: splitCommand.slice(1).join(" "), // Join all remaining parts as args
    };
  }, []);

  // Pure function for command validation
  const validateCommand = useCallback((parsedCommand: ParsedCommand): { isValid: boolean; errorMessage?: string } => {
    const { command: cmd, args } = parsedCommand;
    
    // Handle simple commands (no arguments)
    if (!args && componentsMap[cmd]) {
      return { isValid: true };
    }
    
    // Handle argued commands
    const isArguedCommand = arguedCommands.includes(cmd);
    
    if (isArguedCommand) {
      if (!args) {
        return {
          isValid: false,
          errorMessage: `Command "${cmd}" requires an argument. Try 'help' for available commands.`
        };
      }
      
      // Check if the argument is valid for this command
      if (argsMap[args] !== cmd) {
        return {
          isValid: false,
          errorMessage: `Command "${cmd} ${args}" not found. Try 'help' for available commands.`
        };
      }
    } else if (args) {
      // Command doesn't take arguments but arguments were provided
      return {
        isValid: false,
        errorMessage: `Command "${cmd}" doesn't take arguments. Try 'help' for available commands.`
      };
    }

    return { isValid: true };
  }, []);

  // Function to create command entry
  const createCommandEntry = useCallback((inputCommand: string): CommandEntry => {
    const parsedCommand = formatCommand(inputCommand);
    const validation = validateCommand(parsedCommand);
    
    if (!validation.isValid) {
      return {
        id: `${Date.now()}-${Math.random()}`,
        command: inputCommand,
        component: <TerminalText command={validation.errorMessage!} />,
        timestamp: Date.now()
      };
    }

    try {
      const { command: cmd, args } = parsedCommand;
      let ComponentToRender;
      let componentProps = {};

      if (!args && componentsMap[cmd]) {
        ComponentToRender = componentsMap[cmd];
      }
      else if (args) {
        if (cmd === "about") {
          const componentKey = aboutArgsMap[args];
          if (componentKey) {
            ComponentToRender = componentsMap[componentKey];
          } else {
            throw new Error(`Invalid about argument: ${args}`);
          }
        } else if (cmd === "vim") {
          // If onOpenVim is available, use full-page mode
          if (onOpenVim) {
            let initialContent = "";
            switch (args) {
              case "hello.md":
                initialContent = getHelloContent();
                break;
              case "welcome.md":
                initialContent = getWelcomeContent();
                break;
              case "help.md":
                initialContent = getHelpContent();
                break;
              case "about-me.md":
                initialContent = getAboutMeContent();
                break;
              case "skills.md":
                initialContent = getAboutSkillsContent();
                break;
              case "projects.md":
                initialContent = getAboutProjectsContent();
                break;
              default:
                initialContent = "";
            }
            
            // Call onOpenVim to open full-page vim
            onOpenVim(args, initialContent);
            
            // Return a simple acknowledgment component
            return {
              id: `${Date.now()}-${Math.random()}`,
              command: inputCommand,
              component: (
                <div>
                  <TerminalText command={inputCommand} />
                  <div style={{ fontFamily: 'monospace', color: 'rgb(0, 255, 156)' }}>
                    📝 Opening "{args}" in vim editor...
                  </div>
                </div>
              ),
              timestamp: Date.now()
            };
          } else {
            // Fallback to inline vim editor
            ComponentToRender = componentsMap["vim"];
            
            let initialContent = "";
            switch (args) {
              case "hello.md":
                initialContent = getHelloContent();
                break;
              case "welcome.md":
                initialContent = getWelcomeContent();
                break;
              case "help.md":
                initialContent = getHelpContent();
                break;
              case "about-me.md":
                initialContent = getAboutMeContent();
                break;
              case "skills.md":
                initialContent = getAboutSkillsContent();
                break;
              case "projects.md":
                initialContent = getAboutProjectsContent();
                break;
              default:
                initialContent = "";
            }
            
            componentProps = { fileName: args, initialContent };
          }
        } else {
          throw new Error(`Unknown argued command: ${cmd}`);
        }
      } else {
        throw new Error(`Command not found: ${cmd}`);
      }

      return {
        id: `${Date.now()}-${Math.random()}`,
        command: inputCommand,
        component: (
          <div>
            <TerminalText command={inputCommand} />
            <CommandErrorBoundary commandName={inputCommand}>
              <ComponentToRender {...componentProps} />
            </CommandErrorBoundary>
          </div>
        ),
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error creating command component:', error);
      return {
        id: `${Date.now()}-${Math.random()}`,
        command: inputCommand,
        component: (
          <TerminalText 
            command={`Error: Failed to execute command "${inputCommand}". Please try again.`} 
          />
        ),
        timestamp: Date.now()
      };
    }
  }, [formatCommand, validateCommand, onOpenVim]);

  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    if (usedCommands.length === 0) return;

    if (direction === 'up') {
      if (historyCommand + 1 < usedCommands.length) {
        const newIndex = historyCommand + 1;
        setHistoryCommand(newIndex);
        setCommandInput(usedCommands[newIndex]);
      }
    } else {
      if (historyCommand - 1 >= 0) {
        const newIndex = historyCommand - 1;
        setHistoryCommand(newIndex);
        setCommandInput(usedCommands[newIndex]);
      } else if (historyCommand === 0) {
        setHistoryCommand(-1);
        setCommandInput("");
      }
    }
  }, [usedCommands, historyCommand]);

  const clearTerminal = useCallback(() => {
    setTerminalHistory([]);
    setCommandInput("");
    inputCommand.current?.focus();
  }, []);

  const executeCommand = useCallback((inputCommand: string) => {
    if (!inputCommand.trim()) return;

    setUsedCommands(prev => [inputCommand, ...prev]);
    setHistoryCommand(-1);

    if (inputCommand === "clear" || inputCommand === "cls") {
      clearTerminal();
      return;
    }

    const newEntry = createCommandEntry(inputCommand);
    setTerminalHistory(prev => [...prev, newEntry]);
    setCommandInput("");
  }, [createCommandEntry, clearTerminal]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        navigateHistory('up');
        break;
      case "ArrowDown":
        e.preventDefault();
        navigateHistory('down');
        break;
      case "Enter":
        e.preventDefault();
        executeCommand(command);
        break;
    }
  }, [command, navigateHistory, executeCommand]);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
    window.scrollTo(0, document.body.scrollHeight);
  }, [terminalHistory]);

  useEffect(() => {
    inputCommand.current?.focus();
  }, []);

  const handleErrorReset = useCallback(() => {
    setTerminalHistory([]);
    setCommandInput("");
    setUsedCommands([]);
    setHistoryCommand(-1);
    inputCommand.current?.focus();
  }, []);

  return (
    <TerminalErrorBoundary onReset={handleErrorReset}>
      <div>
        <div className="terminal-body" ref={terminalBodyRef}>
          {terminalHistory.map((entry) => (
            <div key={entry.id} className="terminal-entry">
              {entry.component}
            </div>
          ))}
        </div>
        
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
    </TerminalErrorBoundary>
  );
};

export default Terminal;