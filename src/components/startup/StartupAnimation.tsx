import React, { useEffect, useMemo } from "react";
import "./StartupAnimation.css";
import FaultyTerminal from "../FaultyTerminal/FaultyTerminal";

interface StartupAnimationProps {
  onComplete: () => void;
}

const StartupAnimation: React.FC<StartupAnimationProps> = ({ onComplete }) => {
  useEffect(() => {
    const handleKeyPress = () => {
      onComplete();
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("click", handleKeyPress);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("click", handleKeyPress);
    };
  }, [onComplete]);

  const faultyTerminal = useMemo(
    () => (
      <FaultyTerminal
        scale={3}
        gridMul={[2, 1]}
        digitSize={1.2}
        timeScale={1}
        pause={false}
        scanlineIntensity={0}
        glitchAmount={0.5}
        flickerAmount={1}
        noiseAmp={1}
        chromaticAberration={0}
        dither={0}
        curvature={0.2}
        tint="#ffffff"
        mouseReact={true}
        mouseStrength={0.5}
        brightness={0.3}
      />
    ),
    []
  );
  
  return (
    <div className="startup-animation">
      {/* Terminal background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 1,
        }}
      >
        {faultyTerminal}
      </div>

      {/* Centered content overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          zIndex: 2,
          padding: "2rem",
        }}
      >
        {/* ASCII Text Container */}
        <div
          style={{
            width: "60%",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        </div>

        {/* Pulsating "Press any key" text */}
        <div className="press-key-text">
          Press any key to continue...
        </div>
      </div>
    </div>
  );
};

export default StartupAnimation;