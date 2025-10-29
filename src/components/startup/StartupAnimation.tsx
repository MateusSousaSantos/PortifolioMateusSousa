import React, { useState, useEffect, useCallback } from "react";
import "./StartupAnimation.css";
import TypingAnimation from "../typing/TypingAnimation";
import { useTypingAnimation } from "../typing/useTypingAnimation";

interface StartupAnimationProps {
  onComplete: () => void;
}

interface BootMessage {
  id: number;
  text: string;
  type: "info" | "success" | "warning" | "error" | "loading";
  delay: number;
  duration?: number;
}

const StartupAnimation: React.FC<StartupAnimationProps> = ({ onComplete }) => {
  return (
    <div className="startup-animation">
      <TypingAnimation text="Hello!" speed={100} cursor={true} />
      <p>Press Enter to continue...</p>
    </div>
  );
};

export default StartupAnimation;
