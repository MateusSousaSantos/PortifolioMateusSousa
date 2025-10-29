import { useState, useCallback, useRef, useEffect } from "react";
import {
  argsMap,
  arguedCommands,
  componentsMap,
} from "../terminal-list/terminal-list";
import TerminalText from "../terminalText/terminalText";

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

export const useTerminal = () => {
  const [command, setCommand] = useState("");
  const [usedCommands, setUsedCommands] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [terminalHistory, setTerminalHistory] = useState<CommandEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatCommand = useCallback((command: string): ParsedCommand => {
    const splitCommand = command.split(" ");
    if (splitCommand.length === 1) return { command: command, args: "" };
    return {
      command: splitCommand[0],
      args: splitCommand[1],
    };
  }, []);

  const validateCommand = useCallback((parsedCommand: ParsedCommand) => {
    const { command: cmd, args } = parsedCommand;
    const isArguedCommand = arguedCommands.includes(cmd);

    if (isArguedCommand && argsMap[args] === undefined) {
      return {
        isValid: false,
        errorMessage: `Command "${cmd} ${args}" needs an argument, try help to get all the commands`
      };
    }

    const componentKey = isArguedCommand ? args : cmd;
    if (componentsMap[componentKey] === undefined) {
      return {
        isValid: false,
        errorMessage: `Command "${cmd}${args ? ' ' + args : ''}" not found, try help to get all the commands`
      };
    }

    if (argsMap[args] !== cmd && isArguedCommand) {
      return {
        isValid: false,
        errorMessage: `Command "${cmd} ${args}" not found, try help to get all the commands`
      };
    }

    return { isValid: true };
  }, []);

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

    const isArguedCommand = arguedCommands.includes(parsedCommand.command);
    const componentKey = isArguedCommand ? parsedCommand.args : parsedCommand.command;
    const ComponentToRender = componentsMap[componentKey];

    return {
      id: `${Date.now()}-${Math.random()}`,
      command: inputCommand,
      component: (
        <div>
          <TerminalText command={inputCommand} />
          <ComponentToRender />
        </div>
      ),
      timestamp: Date.now()
    };
  }, [formatCommand, validateCommand]);

  const executeCommand = useCallback((inputCommand: string) => {
    if (!inputCommand.trim()) return;

    setUsedCommands(prev => [inputCommand, ...prev]);
    setHistoryIndex(-1);

    if (inputCommand === "clear" || inputCommand === "cls") {
      setTerminalHistory([]);
      setCommand("");
      return;
    }

    const newEntry = createCommandEntry(inputCommand);
    setTerminalHistory(prev => [...prev, newEntry]);
    setCommand("");
  }, [createCommandEntry]);

  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    if (usedCommands.length === 0) return;

    if (direction === 'up') {
      if (historyIndex + 1 < usedCommands.length) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(usedCommands[newIndex]);
      }
    } else {
      if (historyIndex - 1 >= 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(usedCommands[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand("");
      }
    }
  }, [usedCommands, historyIndex]);

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
    inputRef.current?.focus();
  }, []);

  return {
    command,
    setCommand,
    terminalHistory,
    inputRef,
    handleKeyPress,
    executeCommand
  };
};