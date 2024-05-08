import React from "react";
import "./terminal-list.css";

const Help: React.FC = () => {
  const helloMessage = "It gives you a simple introduction to my system!";
  const logInMessage =
    "It starts the LogIn routine, it asks yours accounts information and efectuates the LogIn!";
  const valAgentsMessage =
    "It gives you all valorant agents that are currently in the game and their description!";
  const valMapsMessage =
    "Its gives you all valorant maps that are currently in the game and their description!";
  const signInMessage =
    "It start the SignIn routine, its asks for you information to create a account for you in our system";
  const compSelectorMessage =
    "It starts the routine to build the best comp for each map based on your teams information!\n it takes the map as an argument to start the selection";

  const CommandMessage = ({
    message,
    command,
  }: {
    message: string;
    command: string;
  }) => {
    return (
      <pre style={{display:"flex"}}>
        <span style={{ color: "rgb(0, 255, 156)" }}>{command}</span>
        <span style={{textAlign:"left"}}>{`  ---> ${message}`}</span>
      </pre>
    );
  };

  return (
    <div className="command-component">
      <CommandMessage command={"hello"} message={helloMessage} />
      <CommandMessage command={"accesTeam"} message={logInMessage} />
      <CommandMessage command={"createTeam"} message={signInMessage} />
      <CommandMessage command={"valAgents"} message={valAgentsMessage} />
      <CommandMessage command={"signInMessage"} message={valMapsMessage} />
      <CommandMessage
        command={"compSelector --map_of_your_choice"}
        message={compSelectorMessage}
      />
    </div>
  );
};

const Hello: React.FC = () => {
  return (
    <div className="command-component">
      <pre>-----</pre>
      Welcome to RadiantComp System! to start just type logIn into the terminal
      to acces our system
      <pre>-----</pre>
    </div>
  );
};

const LogIn: React.FC = () => {
  return <div>Component 3</div>;
};

const ValAgents: React.FC = () => {
  return (
    <div className="command-component">
      <div>Dantas é legal</div>
    </div>
  );
};

const Teste: React.FC = () => {
  return (
    <div>
      Teste
    </div>
  )
}

export const componentsMap: { [key: string]: React.FC } = {
  help: Help,
  hello: Hello,
  logIn: LogIn,
  valAgents: ValAgents,
  teste:Teste
};
