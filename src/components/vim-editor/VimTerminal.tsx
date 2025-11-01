import React, { useState, useEffect, useRef } from 'react';
import './VimTerminal.css';

interface VimTerminalProps {
  onCommand: (command: string) => void;
  onCancel: () => void;
}

const VimTerminal: React.FC<VimTerminalProps> = ({ onCommand, onCancel }) => {
  const [command, setCommand] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus the input when the terminal opens
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (command.trim()) {
          onCommand(command);
          setCommand('');
        }
        break;
      case 'Escape':
        e.preventDefault();
        onCancel();
        break;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  };

  return (
    <div className="vim-terminal">
      <div className="vim-terminal-overlay" onClick={onCancel} />
      <div className="vim-terminal-content">
        <div className="vim-terminal-prompt">
          <span className="vim-prompt">:</span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="vim-command-input"
            placeholder="Enter vim command..."
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <div className="vim-terminal-help">
          <div className="vim-help-text">Common commands:</div>
          <div className="vim-help-commands">
            <span>:w</span> - save file
            <span>:q</span> - quit
            <span>:wq</span> - save and quit
            <span>:q!</span> - quit without saving
          </div>
        </div>
      </div>
    </div>
  );
};

export default VimTerminal;