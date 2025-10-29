import React from 'react';
import TypingAnimation from './TypingAnimation';
import MultiLineTyping from './MultiLineTyping';
import CSSTypingAnimation from './CSSTypingAnimation';
import AdvancedTypingAnimation from './AdvancedTypingAnimation';
import { useTypingAnimation, useAdvancedTyping } from './useTypingAnimation';
import './typing.css';
import './CSSTypingAnimation.css';

const TypingExamples: React.FC = () => {
  const { displayText } = useTypingAnimation({
    text: "This text uses a custom hook!",
    speed: 80,
    delay: 500
  });

  const { displayText: advancedText } = useAdvancedTyping([
    "Hello, I'm a developer!",
    "I love creating amazing UIs!",
    "Welcome to my portfolio!"
  ], {
    typingSpeed: 100,
    deletingSpeed: 50,
    delayBetweenTexts: 2000,
    loop: true
  });

  return (
    <div style={{ padding: '20px', backgroundColor: '#1a1a1a', color: '#fff' }}>
      <h2>Typing Animation Examples</h2>
      
      {/* Basic typing animation */}
      <div style={{ marginBottom: '30px' }}>
        <h3>1. Basic Typing Animation</h3>
        <TypingAnimation 
          text="Hello! This is a basic typing animation."
          speed={100}
          className="terminal-typing"
        />
      </div>

      {/* Multi-line typing */}
      <div style={{ marginBottom: '30px' }}>
        <h3>2. Multi-line Typing</h3>
        <MultiLineTyping 
          lines={[
            "Line 1: System initializing...",
            "Line 2: Loading components...",
            "Line 3: Ready to go!"
          ]}
          typingSpeed={80}
          lineDelay={800}
          className="terminal-typing"
        />
      </div>

      {/* CSS-only animation */}
      <div style={{ marginBottom: '30px' }}>
        <h3>3. CSS-Only Animation</h3>
        <CSSTypingAnimation 
          text="This animation uses only CSS!"
          speed={3}
          className="terminal-typing"
        />
      </div>

      {/* Advanced typing with backspace */}
      <div style={{ marginBottom: '30px' }}>
        <h3>4. Advanced Typing (with backspace)</h3>
        <AdvancedTypingAnimation 
          texts={[
            "I'm a React Developer",
            "I love TypeScript",
            "Building amazing UIs"
          ]}
          typingSpeed={120}
          deletingSpeed={60}
          delayBetweenTexts={2000}
          loop={true}
          className="terminal-typing"
        />
      </div>

      {/* Using custom hooks */}
      <div style={{ marginBottom: '30px' }}>
        <h3>5. Using Custom Hook</h3>
        <div className="terminal-typing">
          {displayText}<span className="typing-cursor">|</span>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>6. Advanced Hook with Backspace</h3>
        <div className="terminal-typing">
          {advancedText}<span className="typing-cursor">|</span>
        </div>
      </div>
    </div>
  );
};

export default TypingExamples;