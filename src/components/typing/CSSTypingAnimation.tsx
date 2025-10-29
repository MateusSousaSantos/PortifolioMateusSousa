import React from 'react';
import './CSSTypingAnimation.css';

interface CSSTypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
}

const CSSTypingAnimation: React.FC<CSSTypingAnimationProps> = ({
  text,
  speed = 4,
  className = ''
}) => {
  const animationDuration = text.length / speed;

  return (
    <div className={`css-typing ${className}`}>
      <span 
        className="typing-text"
        style={{
          '--text-length': text.length,
          '--animation-duration': `${animationDuration}s`
        } as React.CSSProperties}
      >
        {text}
      </span>
    </div>
  );
};

export default CSSTypingAnimation;