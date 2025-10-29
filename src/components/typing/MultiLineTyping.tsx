import React, { useState, useEffect, useCallback } from 'react';

interface MultiLineTypingProps {
  lines: string[];
  lineDelay?: number;
  typingSpeed?: number;
  onComplete?: () => void;
  className?: string;
}

const MultiLineTyping: React.FC<MultiLineTypingProps> = ({
  lines,
  lineDelay = 1000,
  typingSpeed = 50,
  onComplete,
  className = ''
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const typeLine = useCallback((lineText: string) => {
    setIsTyping(true);
    setCurrentText('');
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= lineText.length) {
        setCurrentText(lineText.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        
        // Add completed line to displayed lines
        setDisplayedLines(prev => [...prev, lineText]);
        setCurrentText('');
        
        // Move to next line after delay
        setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
        }, lineDelay);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [typingSpeed, lineDelay]);

  useEffect(() => {
    if (currentLineIndex < lines.length) {
      typeLine(lines[currentLineIndex]);
    } else if (currentLineIndex === lines.length && !isTyping) {
      onComplete?.();
    }
  }, [currentLineIndex, lines, typeLine, isTyping, onComplete]);

  return (
    <div className={className}>
      {displayedLines.map((line, index) => (
        <div key={index} className="typed-line">
          {line}
        </div>
      ))}
      {currentText && (
        <div className="typing-line">
          {currentText}
          <span className="typing-cursor">|</span>
        </div>
      )}
    </div>
  );
};

export default MultiLineTyping;