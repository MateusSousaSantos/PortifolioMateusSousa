import React, { useState, useEffect, useCallback } from 'react';

interface AdvancedTypingProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
  loop?: boolean;
  onComplete?: () => void;
  className?: string;
}

const AdvancedTypingAnimation: React.FC<AdvancedTypingProps> = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 2000,
  loop = true,
  onComplete,
  className = ''
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const animate = useCallback(() => {
    if (isCompleted && !loop) return;

    const fullText = texts[currentTextIndex];
    
    if (!isDeleting) {
      // Typing
      if (currentText.length < fullText.length) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      } else {
        // Finished typing, wait then start deleting
        setTimeout(() => setIsDeleting(true), delayBetweenTexts);
        return;
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      } else {
        // Finished deleting, move to next text
        setIsDeleting(false);
        const nextIndex = (currentTextIndex + 1) % texts.length;
        
        if (nextIndex === 0 && !loop) {
          setIsCompleted(true);
          onComplete?.();
          return;
        }
        
        setCurrentTextIndex(nextIndex);
        return;
      }
    }

    // Set next animation frame
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(animate, speed);
  }, [
    currentText, 
    currentTextIndex, 
    isDeleting, 
    texts, 
    typingSpeed, 
    deletingSpeed, 
    delayBetweenTexts, 
    loop, 
    isCompleted, 
    onComplete
  ]);

  useEffect(() => {
    const timer = setTimeout(animate, typingSpeed);
    return () => clearTimeout(timer);
  }, [animate, typingSpeed]);

  return (
    <span className={className}>
      {currentText}
      <span className="typing-cursor">|</span>
    </span>
  );
};

export default AdvancedTypingAnimation;