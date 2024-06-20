import { Bar } from "../../../Views/HomePage/HomePage";
import { mateus_art } from "../../../Views/HomePage/asc-art";

export const Welcome: React.FC = () => {
  return (
    <div className="body">
      <pre id="asc-art">{mateus_art}</pre>
      <Bar />
      <p className="terminal-welcome">
        Welcome to my portifolio! Here you can find lost of information about
        me, and also some projects that I've been working on, like this one!
        Just like a terminal you can use the commands to navigate through the
        site!
      </p>
      <Bar />
      <p className="terminal-welcome">
        To get started, type{" "}
        <span style={{ color: "rgb(0, 255, 156)" }}>help</span> to see the
        available commands
      </p>
    </div>
  );
};
