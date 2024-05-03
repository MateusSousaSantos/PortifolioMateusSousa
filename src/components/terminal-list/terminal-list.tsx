import React from "react";

export const Help: React.FC = () => {
  return (
    <div
      style={{ margin: "25px", fontFamily: "monospace", fontSize: "larger" }}
    >
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

export const Hello: React.FC = () => {
  return (
    <div
      style={{ margin: "25px", fontFamily: "monospace", fontSize: "larger" }}
    >
      <pre>-----</pre>
      Welcome to RadiantComp System! to start just type logIn into the terminal
      to acces our system
      <pre>-----</pre>
    </div>
  );
};

export const logIn: React.FC = () => {
  return <div>Component 3</div>;
};

export const valAgents: React.FC = () => {

 return (
    <div>
        <div>
            Dantas é legal
        </div>
    </div>
 )
}

export const componentsMap: { [key: string]: React.FC } = {
  help: Help,
  hello: Hello,
  logIn: logIn,
  valAgents: valAgents
};
