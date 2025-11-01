import React, { useState, useEffect, useRef, useCallback } from 'react';
import VimTerminal from './VimTerminal';
import Squares from '../Squares/Squares';
import './VimEditor.css';

interface VimEditorProps {
  fileName?: string;
  initialContent?: string;
  onExit?: () => void;
  isFullPage?: boolean;
}

type VimMode = 'normal' | 'insert' | 'visual' | 'command';

interface CursorPosition {
  line: number;
  col: number;
}

const VimEditor: React.FC<VimEditorProps> = ({ 
  fileName = 'README.md', 
  initialContent, 
  onExit,
  isFullPage = false 
}) => {
  const defaultContent = `
  ******************VIM EDITOR******************** 
  # Welcome to My Portfolio


`;

  // Function to get content from localStorage or use default
  const getInitialContent = () => {
    try {
      const savedFiles = JSON.parse(localStorage.getItem('terminal-files') || '{}');
      const savedFile = savedFiles[fileName];
      if (savedFile && savedFile.content) {
        return savedFile.content;
      }
    } catch (error) {
      console.warn('Error loading saved content:', error);
    }
    return initialContent || defaultContent;
  };

  const [content, setContent] = useState(getInitialContent());

  const [mode, setMode] = useState<VimMode>('normal');
  const [cursor, setCursor] = useState<CursorPosition>({ line: 0, col: 0 });
  const [isCommandMode, setIsCommandMode] = useState(false);
  const [statusMessage, setStatusMessage] = useState('-- NORMAL --');
  const [isExited, setIsExited] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [insertModeInput, setInsertModeInput] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [lastVimMotion, setLastVimMotion] = useState<string>("");
  const vimMotionMap : Map<string, "up" | "down" | "left" | "right"> = new Map([
    ['h', 'left'],
    ['j', 'down'],
    ['k', 'up'],
    ['l', 'right']
  ])

  // Function to generate filename from content
  const generateFileNameFromContent = useCallback((content: string): string => {
    const lines = content.trim().split('\n');
    
    // Look for markdown headers first
    for (const line of lines) {
      const headerMatch = line.match(/^#+\s*(.+)$/);
      if (headerMatch) {
        const headerText = headerMatch[1].trim();
        const cleanFileName = headerText
          .toLowerCase()
          .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
          .replace(/\s+/g, '-') // Replace spaces with dashes
          .substring(0, 30); // Limit length
        
        if (cleanFileName.length > 0) {
          return `${cleanFileName}.md`;
        }
      }
    }
    
    // If no header found, use first meaningful word
    const words = content.trim().split(/\s+/);
    for (const word of words) {
      const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      if (cleanWord.length > 2) { // At least 3 characters
        return `${cleanWord}.md`;
      }
    }
    
    // Fallback
    return 'document.md';
  }, []);

  const lines = content.split('\n');

  const handleNormalModeKey = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    
    switch (e.key) {
      case 'i':
        setMode('insert');
        setStatusMessage('-- INSERT --');
        setInsertModeInput('');
        // Focus hidden input for text input
        setTimeout(() => hiddenInputRef.current?.focus(), 0);
        break;
      case 'a':
        setMode('insert');
        setCursor(prev => ({ 
          ...prev, 
          col: Math.min((lines[prev.line]?.length || 0), prev.col + 1) 
        }));
        setStatusMessage('-- INSERT --');
        setInsertModeInput('');
        setTimeout(() => hiddenInputRef.current?.focus(), 0);
        break;
      case 'I':
        setMode('insert');
        setCursor(prev => ({ ...prev, col: 0 }));
        setStatusMessage('-- INSERT --');
        setInsertModeInput('');
        setTimeout(() => hiddenInputRef.current?.focus(), 0);
        break;
      case 'A':
        setMode('insert');
        setCursor(prev => ({ ...prev, col: lines[prev.line]?.length || 0 }));
        setStatusMessage('-- INSERT --');
        setInsertModeInput('');
        setTimeout(() => hiddenInputRef.current?.focus(), 0);
        break;
      case 'o':
        setMode('insert');
        const newContent = lines.slice(0, cursor.line + 1).join('\n') + '\n' + lines.slice(cursor.line + 1).join('\n');
        setContent(newContent);
        setCursor(prev => ({ line: prev.line + 1, col: 0 }));
        setStatusMessage('-- INSERT --');
        setHasUnsavedChanges(true);
        setInsertModeInput('');
        setTimeout(() => hiddenInputRef.current?.focus(), 0);
        break;
      case 'O':
        setMode('insert');
        const newContentAbove = lines.slice(0, cursor.line).join('\n') + (cursor.line > 0 ? '\n' : '') + '\n' + lines.slice(cursor.line).join('\n');
        setContent(newContentAbove);
        setCursor(prev => ({ line: prev.line, col: 0 }));
        setStatusMessage('-- INSERT --');
        setHasUnsavedChanges(true);
        setInsertModeInput('');
        setTimeout(() => hiddenInputRef.current?.focus(), 0);
        break;
      case 'v':
        setMode('visual');
        setStatusMessage('-- VISUAL --');
        break;
      case ':':
        setIsCommandMode(true);
        setStatusMessage('');
        break;
      case 'h':
        setCursor(prev => ({ ...prev, col: Math.max(0, prev.col - 1) }));
        setLastVimMotion('h');
        break;
      case 'j':
        setCursor(prev => ({ 
          line: Math.min(lines.length - 1, prev.line + 1),
          col: Math.min(prev.col, lines[Math.min(lines.length - 1, prev.line + 1)]?.length || 0)
        }));
        setLastVimMotion('j');
        break;
      case 'k':
        setCursor(prev => ({ 
          line: Math.max(0, prev.line - 1),
          col: Math.min(prev.col, lines[Math.max(0, prev.line - 1)]?.length || 0)
        }));
        setLastVimMotion('k');
        break;
      case 'l':
        setCursor(prev => ({ 
          ...prev, 
          col: Math.min((lines[prev.line]?.length || 0), prev.col + 1) 
        }));
        setLastVimMotion('l');
        break;
      case 'w':
        // Move to next word
        const currentLine = lines[cursor.line] || '';
        const restOfLine = currentLine.substring(cursor.col);
        const nextWordMatch = restOfLine.match(/\W*\w/);
        if (nextWordMatch && nextWordMatch.index !== undefined) {
          setCursor(prev => ({ ...prev, col: prev.col + (nextWordMatch.index || 0) + 1 }));
        } else if (cursor.line < lines.length - 1) {
          setCursor(prev => ({ line: prev.line + 1, col: 0 }));
        }
        break;
      case 'b':
        // Move to previous word
        const beforeCursor = (lines[cursor.line] || '').substring(0, cursor.col);
        const prevWordMatch = beforeCursor.match(/\w\W*$/);
        if (prevWordMatch && prevWordMatch.index !== undefined) {
          setCursor(prev => ({ ...prev, col: prevWordMatch.index || 0 }));
        } else if (cursor.line > 0) {
          setCursor(prev => ({ line: prev.line - 1, col: lines[prev.line - 1]?.length || 0 }));
        }
        break;
      case 'x':
        // Delete character under cursor
        const lineContent = lines[cursor.line];
        if (lineContent && cursor.col < lineContent.length) {
          const newLine = lineContent.slice(0, cursor.col) + lineContent.slice(cursor.col + 1);
          const newLines = [...lines];
          newLines[cursor.line] = newLine;
          setContent(newLines.join('\n'));
          setHasUnsavedChanges(true);
        }
        break;
      case 'u':
        setStatusMessage('Undo not implemented in demo');
        setTimeout(() => setStatusMessage('-- NORMAL --'), 2000);
        break;
      case '0':
        setCursor(prev => ({ ...prev, col: 0 }));
        break;
      case '$':
        setCursor(prev => ({ ...prev, col: lines[prev.line]?.length || 0 }));
        break;
      case 'G':
        if (e.shiftKey) {
          setCursor({ line: lines.length - 1, col: 0 });
        }
        break;
      case 'g':
        // gg - go to first line (simplified, should wait for second 'g')
        setCursor({ line: 0, col: 0 });
        break;
    }
  }, [cursor, lines, content]);

  const handleInsertModeKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setMode('normal');
      setStatusMessage('-- NORMAL --');
      setInsertModeInput('');
      containerRef.current?.focus();
      return;
    }
    // Other keys will be handled by the hidden input
  }, []);

  const handleInsertModeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newChar = e.target.value;
    setInsertModeInput(newChar);
    
    if (newChar) {
      // Insert the character at cursor position
      const currentLine = lines[cursor.line] || '';
      const newLine = currentLine.slice(0, cursor.col) + newChar + currentLine.slice(cursor.col);
      const newLines = [...lines];
      newLines[cursor.line] = newLine;
      setContent(newLines.join('\n'));
      setCursor(prev => ({ ...prev, col: prev.col + newChar.length }));
      setHasUnsavedChanges(true);
      setInsertModeInput(''); // Clear input for next character
    }
  }, [cursor, lines]);

  const handleInsertModeKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Handle newline
      const currentLine = lines[cursor.line] || '';
      const beforeCursor = currentLine.slice(0, cursor.col);
      const afterCursor = currentLine.slice(cursor.col);
      const newLines = [...lines];
      newLines[cursor.line] = beforeCursor;
      newLines.splice(cursor.line + 1, 0, afterCursor);
      setContent(newLines.join('\n'));
      setCursor(prev => ({ line: prev.line + 1, col: 0 }));
      setHasUnsavedChanges(true);
      setInsertModeInput('');
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      if (cursor.col > 0) {
        // Delete character before cursor
        const currentLine = lines[cursor.line] || '';
        const newLine = currentLine.slice(0, cursor.col - 1) + currentLine.slice(cursor.col);
        const newLines = [...lines];
        newLines[cursor.line] = newLine;
        setContent(newLines.join('\n'));
        setCursor(prev => ({ ...prev, col: prev.col - 1 }));
        setHasUnsavedChanges(true);
      } else if (cursor.line > 0) {
        // Join with previous line
        const currentLine = lines[cursor.line] || '';
        const prevLine = lines[cursor.line - 1] || '';
        const newLines = [...lines];
        newLines[cursor.line - 1] = prevLine + currentLine;
        newLines.splice(cursor.line, 1);
        setContent(newLines.join('\n'));
        setCursor({ line: cursor.line - 1, col: prevLine.length });
        setHasUnsavedChanges(true);
      }
      setInsertModeInput('');
    }
  }, [cursor, lines]);

  const handleVisualModeKey = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    
    if (e.key === 'Escape') {
      setMode('normal');
      setStatusMessage('-- NORMAL --');
    }
    // Add visual mode functionality here
  }, []);

  // Handle key presses for vim commands
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isCommandMode) return; // Let VimTerminal handle command mode

    switch (mode) {
      case 'normal':
        handleNormalModeKey(e);
        break;
      case 'insert':
        handleInsertModeKey(e);
        break;
      case 'visual':
        handleVisualModeKey(e);
        break;
    }
  }, [mode, isCommandMode, handleNormalModeKey, handleInsertModeKey, handleVisualModeKey]);

  // Handle vim commands from the terminal
  const handleVimCommand = useCallback((command: string) => {
    const trimmed = command.trim();
    
    switch (trimmed) {
      case 'w':
        // Save to localStorage
        try {
          let finalFileName = fileName;
          
          // If saving an untitled file, generate filename from content
          if (fileName === 'untitled.md' || fileName.startsWith('untitled')) {
            finalFileName = generateFileNameFromContent(content);
            setStatusMessage(`Auto-generated filename: "${finalFileName}"`);
          }
          
          const savedFiles = JSON.parse(localStorage.getItem('terminal-files') || '{}');
          savedFiles[finalFileName] = {
            name: finalFileName,
            content: content,
            lastModified: new Date().toISOString()
          };
          localStorage.setItem('terminal-files', JSON.stringify(savedFiles));
          setHasUnsavedChanges(false);
          setStatusMessage(`"${finalFileName}" written`);
        } catch (error) {
          setStatusMessage(`Error saving file: ${error}`);
        }
        setTimeout(() => setStatusMessage('-- NORMAL --'), 2000);
        break;
      case 'q':
        if (hasUnsavedChanges) {
          setStatusMessage('No write since last change (add ! to override)');
          setTimeout(() => setStatusMessage('-- NORMAL --'), 2000);
        } else {
          if (isFullPage && onExit) {
            onExit();
          } else {
            setIsExited(true);
          }
        }
        break;
      case 'q!':
        if (isFullPage && onExit) {
          onExit();
        } else {
          setIsExited(true);
        }
        break;
      case 'wq':
        // Save to localStorage and quit
        try {
          let finalFileName = fileName;
          
          // If saving an untitled file, generate filename from content
          if (fileName === 'untitled.md' || fileName.startsWith('untitled')) {
            finalFileName = generateFileNameFromContent(content);
            setStatusMessage(`Auto-generated filename: "${finalFileName}"`);
          }
          
          const savedFiles = JSON.parse(localStorage.getItem('terminal-files') || '{}');
          savedFiles[finalFileName] = {
            name: finalFileName,
            content: content,
            lastModified: new Date().toISOString()
          };
          localStorage.setItem('terminal-files', JSON.stringify(savedFiles));
          setHasUnsavedChanges(false);
          setStatusMessage(`"${finalFileName}" written`);
          setTimeout(() => {
            if (isFullPage && onExit) {
              onExit();
            } else {
              setIsExited(true);
            }
          }, 500);
        } catch (error) {
          setStatusMessage(`Error saving file: ${error}`);
          setTimeout(() => setStatusMessage('-- NORMAL --'), 2000);
        }
        break;
      case 'set number':
        setStatusMessage('Line numbers enabled');
        setTimeout(() => setStatusMessage('-- NORMAL --'), 2000);
        break;
      case 'set nonumber':
        setStatusMessage('Line numbers disabled');
        setTimeout(() => setStatusMessage('-- NORMAL --'), 2000);
        break;
      default:
        if (trimmed.startsWith('set ')) {
          setStatusMessage(`Unknown option: ${trimmed.substring(4)}`);
        } else {
          setStatusMessage(`Not an editor command: ${trimmed}`);
        }
        setTimeout(() => setStatusMessage('-- NORMAL --'), 2000);
    }
    
    setIsCommandMode(false);
  }, [fileName, hasUnsavedChanges, content, isFullPage, onExit, generateFileNameFromContent]);

  const handleCommandCancel = useCallback(() => {
    setIsCommandMode(false);
    setStatusMessage('-- NORMAL --');
  }, []);

  // Handle click to maintain focus
  const handleClick = useCallback(() => {
    if (containerRef.current && mode === 'normal' && !isCommandMode) {
      containerRef.current.focus();
    }
  }, [mode, isCommandMode]);

  useEffect(() => {
    const handleKeyDownEvent = (e: KeyboardEvent) => handleKeyDown(e);
    
    if (containerRef.current) {
      containerRef.current.addEventListener('keydown', handleKeyDownEvent);
    }
    
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('keydown', handleKeyDownEvent);
      }
    };
  }, [handleKeyDown]);

  // Auto-focus the editor
  useEffect(() => {
    if (containerRef.current && !isCommandMode && mode === 'normal') {
      containerRef.current.focus();
    }
  }, [isCommandMode, mode]);

  if (isExited && !isFullPage) {
    return (
      <div style={{ fontFamily: 'monospace', color: 'rgb(0, 255, 156)' }}>
        📄 File "{fileName}" closed. Use 'vim {fileName}' to reopen.
      </div>
    );
  }

  // In full-page mode, we don't show the exit message since we exit via callback
  if (isExited && isFullPage) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className={`vim-editor ${mode}-mode${isFullPage ? ' full-page' : ''}`} 
      tabIndex={0}
      onClick={handleClick}
    >
      {/* Add Squares as background */}
      <div className="vim-editor-background">
        <Squares 
          direction={vimMotionMap.get(lastVimMotion) || 'diagonal'}
          speed={0.5}
          borderColor="rgba(0, 255, 156, 0.1)"
          squareSize={30}
          hoverFillColor="rgba(0, 255, 156, 0.05)"
        />
      </div>

      <div className="vim-editor-header">
        <span>"{fileName}" {hasUnsavedChanges ? '[+]' : ''}</span>
      </div>
      
      <div className="vim-editor-content">
        <div className="vim-line-numbers">
          {lines.map((_line : string, index: number) => (
            <div key={index} className="vim-line-number">
              {index + 1}
            </div>
          ))}
        </div>
        
        <div className="vim-text-area">
          <div className="vim-text-display">
            {lines.map((line : string, lineIndex: number) => (
              <div key={lineIndex} className="vim-line">
                {line.split('').map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className={`vim-char ${
                      cursor.line === lineIndex && cursor.col === charIndex
                        ? `vim-cursor vim-cursor-${mode}`
                        : ''
                    }`}
                  >
                    {char}
                  </span>
                ))}
                {/* Cursor at end of line */}
                {cursor.line === lineIndex && cursor.col === line.length && (
                  <span className={`vim-cursor vim-cursor-${mode} vim-cursor-eol`}>
                    &nbsp;
                  </span>
                )}
              </div>
            ))}
          </div>
          
          {/* Hidden input for insert mode */}
          <input
            ref={hiddenInputRef}
            type="text"
            value={insertModeInput}
            onChange={handleInsertModeInput}
            onKeyDown={handleInsertModeKeyDown}
            className="vim-hidden-input"
            style={{ 
              position: 'absolute', 
              left: '-9999px', 
              opacity: 0,
              pointerEvents: 'none'
            }}
          />
        </div>
      </div>

      <div className="vim-status-bar">
        <span className="vim-status-left">{statusMessage}</span>
        <span className="vim-status-right">
          {cursor.line + 1},{cursor.col + 1} {Math.round(((cursor.line + 1) / lines.length) * 100)}%
        </span>
      </div>

      {isCommandMode && (
        <VimTerminal
          onCommand={handleVimCommand}
          onCancel={handleCommandCancel}
        />
      )}
    </div>
  );
};

export default VimEditor;