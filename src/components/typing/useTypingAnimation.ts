import { useState, useEffect, useCallback } from 'react';

interface UseTypingAnimationOptions {
  text: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
  onComplete?: () => void;
}

export const useTypingAnimation = ({
  text,
  speed = 100,
  delay = 0,
  loop = false,
  onComplete
}: UseTypingAnimationOptions) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const startTyping = useCallback(() => {
    setDisplayText('');
    setIsTyping(true);
    setIsComplete(false);
    
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.substring(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setIsComplete(true);
        onComplete?.();
        
        if (loop) {
          setTimeout(startTyping, 2000);
        }
      }
    }, speed);

    return () => clearInterval(typeInterval);
  }, [text, speed, onComplete, loop]);

  const resetAnimation = useCallback(() => {
    setDisplayText('');
    setIsTyping(false);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(startTyping, delay);
    return () => clearTimeout(timer);
  }, [startTyping, delay]);

  return {
    displayText,
    isTyping,
    isComplete,
    startTyping,
    resetAnimation
  };
};

// Hook for multiple texts with backspace effect
export const useAdvancedTyping = (texts: string[], options: {
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
  loop?: boolean;
} = {}) => {
  const {
    typingSpeed = 100,
    deletingSpeed = 50,
    delayBetweenTexts = 2000,
    loop = true
  } = options;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!texts.length) return;

    setIsTyping(true);
    const currentFullText = texts[currentTextIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.substring(0, displayText.length + 1));
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), delayBetweenTexts);
          setIsTyping(false);
          return;
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentFullText.substring(0, displayText.length - 1));
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          const nextIndex = (currentTextIndex + 1) % texts.length;
          setCurrentTextIndex(nextIndex);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [
    displayText,
    currentTextIndex,
    isDeleting,
    texts,
    typingSpeed,
    deletingSpeed,
    delayBetweenTexts,
    loop
  ]);

  return {
    displayText,
    currentTextIndex,
    isDeleting,
    isTyping
  };
};