import React, { useState, useEffect, useCallback } from 'react';

interface TypingAnimationProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  cursor?: boolean;
  cursorChar?: string;
  className?: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  speed = 50,
  delay = 0,
  onComplete,
  cursor = true,
  cursorChar = '|',
  className = ''
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const typeText = useCallback(() => {
    let index = 0;
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.substring(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(typeInterval);
  }, [text, speed, onComplete]);

  // Cursor blinking effect
  useEffect(() => {
    if (!cursor) return;

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [cursor]);

  useEffect(() => {
    const timer = setTimeout(typeText, delay);
    return () => clearTimeout(timer);
  }, [typeText, delay]);

  return (
    <span className={className}>
      {displayText}
      {cursor && (showCursor || isTyping) && (
        <span className="typing-cursor">{cursorChar}</span>
      )}
    </span>
  );
};

export default TypingAnimation;