import React from "react";
import "./terminal-list.css";
import { Help } from "./commandComponents/help";
import { Hello } from "./commandComponents/hello";
import { Welcome as Welcome } from "./commandComponents/wellcome";
import { aboutMe as AboutMe } from "./commandComponents/aboutMe";
import { AboutProjects } from "./commandComponents/aboutProjects";
import { AboutSkills } from "./commandComponents/aboutSkills";

export const componentsMap: { [key: string]: React.FC } = {
  help: Help,
  hello: Hello,
  welcome: Welcome,
  me: AboutMe,
  projects: AboutProjects,
  skills: AboutSkills
};
export const arguedCommands = ["about", "teste"];
export const argsMap: { [key: string]: string } = {
  me: arguedCommands[0],
  projects: arguedCommands[0],
  skills: arguedCommands[0],
};
