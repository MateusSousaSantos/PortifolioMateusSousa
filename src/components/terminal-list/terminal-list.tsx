import React from "react";
import "./terminal-list.css";

const Help: React.FC = () => {
  return (
    <div className="command-component">
      <pre>
        <span style={{ color: "rgb(0, 255, 156)" }}>hello</span>
        {`   ---> gives you a hello`}
      </pre>
      <pre>
        <span style={{ color: "rgb(0, 255, 156)" }}>logIn</span>
        {`   ---> start an logIn routine to give acces to our systems`}
      </pre>
      <pre>
        <span style={{ color: "rgb(0, 255, 156)" }}>SignIn</span>
        {`  ---> start an signIn routine to make you an account in our systems`}
      </pre>
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

export const componentsMap: { [key: string]: React.FC } = {
  help: Help,
  hello: Hello,
  logIn: LogIn,
  valAgents: ValAgents,
};
