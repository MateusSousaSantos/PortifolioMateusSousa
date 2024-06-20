interface TerminalTextProps {
  command: string;
}

const TerminalText: React.FC<TerminalTextProps> = ({ command }) => {
  return (
    <pre
      style={{
        fontFamily: "monospace",
        marginLeft: "25px",
        fontSize: "larger",
      }}
    >
      <span style={{ color: "rgb(96, 253, 255)" }}>user@</span>
      <span style={{ color: "rgb(0, 255, 156)" }}>
        mateussousasantos-terminal:
      </span>
      <span>~$ </span>
      <span>{command}</span>
    </pre>
  );
};

export default TerminalText;
