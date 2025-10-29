import React from "react";
import "./terminal-list.css";
import VimEditor from "../vim-editor/VimEditor";
import MarkdownEditor from "../markdown/MarkdownEditor";

// Content for each command as markdown files
export const getHelloContent = () => `# Hello! 👋
`;

export const getWelcomeContent = () => `# 🎉 Welcome to Mateus Sousa Santos' Portfolio!
`;

export const getHelpContent = () => `# 📋 Terminal Help & Command Reference
`;

export const getAboutMeContent = () => `# About Me - Mateus Sousa Santos
`

export const getAboutSkillsContent = () => `# My Technical Skills
`;

export const getAboutProjectsContent = () => `# My Projects Portfolio
`;

// Utility function to get saved content from localStorage or return default
const getSavedContent = (fileName: string, defaultContent: string): string => {
  try {
    const savedFiles = JSON.parse(localStorage.getItem('terminal-files') || '{}');
    return savedFiles[fileName]?.content || defaultContent;
  } catch {
    return defaultContent;
  }
};

// Direct command components use MarkdownEditor (readonly/preview)
export const HelloComponent: React.FC = () => (
  <MarkdownEditor
    fileName="hello.md"
    initialContent={getSavedContent('hello.md', getHelloContent())}
  />
);

export const WelcomeComponent: React.FC = () => (
  <MarkdownEditor
    fileName="welcome.md"
    initialContent={getSavedContent('welcome.md', getWelcomeContent())}
  />
);

export const HelpComponent: React.FC = () => (
  <MarkdownEditor
    fileName="help.md"
    initialContent={getSavedContent('help.md', getHelpContent())}
  />
);

export const AboutMeComponent: React.FC = () => (
  <MarkdownEditor
    fileName="about-me.md"
    initialContent={getSavedContent('about-me.md', getAboutMeContent())}
  />
);

export const AboutSkillsComponent: React.FC = () => (
  <MarkdownEditor
    fileName="skills.md"
    initialContent={getSavedContent('skills.md', getAboutSkillsContent())}
  />
);

export const AboutProjectsComponent: React.FC = () => (
  <MarkdownEditor
    fileName="projects.md"
    initialContent={getSavedContent('projects.md', getAboutProjectsContent())}
  />
);

export const componentsMap: { [key: string]: React.FC<any> } = {
  // Simple commands
  hello: HelloComponent,
  welcome: WelcomeComponent,
  help: HelpComponent,
  
  // About commands (with markdown editors)
  "about-me": AboutMeComponent,
  "about-skills": AboutSkillsComponent,
  "about-projects": AboutProjectsComponent,
  
  // Vim editor for file editing
  vim: VimEditor,
};

// Commands that require arguments
export const arguedCommands = ["about", "vim"];

// Mapping of arguments to their corresponding commands
export const argsMap: { [key: string]: string } = {
  // About command arguments
  "me": "about",
  "skills": "about", 
  "projects": "about",
  
  // Vim file arguments
  "README.md": "vim",
  "hello.md": "vim",
  "welcome.md": "vim", 
  "help.md": "vim",
  "about-me.md": "vim",
  "skills.md": "vim",
  "projects.md": "vim",
  "portfolio.md": "vim",
  "notes.md": "vim",
};

// Map about arguments to specific components
export const aboutArgsMap: { [key: string]: string } = {
  "me": "about-me",
  "skills": "about-skills", 
  "projects": "about-projects",
};
