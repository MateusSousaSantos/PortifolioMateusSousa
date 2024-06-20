export const Help: React.FC = () => {
  const helloMessage = "It gives you a simple introduction to my system!";
  const aboutMe =
    "Its a command that receives an argument, the argument is the information that you want to see more about me!";

  const CommandMessage = ({
    message,
    command,
  }: {
    message: string;
    command: string;
  }) => {
    return (
      <pre style={{ display: "flex" }}>
        <span style={{ color: "rgb(0, 255, 156)" }}>{command}</span>
        <span style={{ textAlign: "left" }}>{`  ---> ${message}`}</span>
      </pre>
    );
  };

  return (
    <div className="command-component">
      <CommandMessage
        command={"welcome"}
        message={"It prints out the welcome message"}
      />
      <CommandMessage command={"hello"} message={helloMessage} />
      <CommandMessage command={"about"} message={aboutMe} />
      <div className="about_me">
        <p>Possbile Commands:</p>
        <ul>
          <li>
            <CommandMessage
              command={"me"}
              message={"It talks about me, my formation and my social midia"}
            />
          </li>
          <li>
            <CommandMessage
              command={"projects"}
              message={"It shows all my projects"}
            />
          </li>
          <li>
            <CommandMessage
              command={"skills"}
              message={
                "It shows all my skills, languages and frameworks i have experience"
              }
            />
          </li>
        </ul>
      </div>
    </div>
  );
};