import React from "react";
import "./terminal-list.css";
import VimEditor from "../vim-editor/VimEditor";
import MarkdownCompiler from "../markdown/MarkdownEditor";

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
  <MarkdownCompiler
    fileName="hello.md"
    initialContent={getSavedContent('hello.md', getHelloContent())}
  />
);

export const WelcomeComponent: React.FC = () => (
  <MarkdownCompiler
    fileName="welcome.md"
    initialContent={getSavedContent('welcome.md', getWelcomeContent())}
  />
);

export const HelpComponent: React.FC = () => (
  <MarkdownCompiler
    fileName="help.md"
    initialContent={getSavedContent('help.md', getHelpContent())}
  />
);

export const AboutMeComponent: React.FC = () => (
  <MarkdownCompiler
    fileName="about-me.md"
    initialContent={getSavedContent('about-me.md', getAboutMeContent())}
  />
);

export const AboutSkillsComponent: React.FC = () => (
  <MarkdownCompiler
    fileName="skills.md"
    initialContent={getSavedContent('skills.md', getAboutSkillsContent())}
  />
);

export const AboutProjectsComponent: React.FC = () => (
  <MarkdownCompiler
    fileName="projects.md"
    initialContent={getSavedContent('projects.md', getAboutProjectsContent())}
  />
);

export const ListFilesComponent: React.FC = () => {
  // Get all saved files from localStorage
  const getSavedFiles = (): string[] => {
    try {
      const savedFiles = JSON.parse(localStorage.getItem('terminal-files') || '{}');
      return Object.keys(savedFiles);
    } catch {
      return [];
    }
  };

  // Define all available files in the system
  const systemFiles = [
    "hello.md",
    "welcome.md", 
    "help.md",
    "about-me.md",
    "skills.md",
    "projects.md",
    "portfolio.md",
    "notes.md",
    "README.md"
  ];

  const savedFiles = getSavedFiles();

  return (
    <div style={{ 
      fontFamily: 'monospace', 
      fontSize: '14px',
      lineHeight: '1.4',
      color: '#00ff00',
      padding: '10px 0'
    }}>
      <div style={{ marginBottom: '15px', color: '#ffffff' }}>
        📁 <strong>File System Listing</strong>
      </div>
      
      <div style={{ marginBottom: '10px', color: '#cccccc' }}>
        Legend: 📄 System File | 💾 Modified/Saved | ✨ User Created
      </div>
      
      <div style={{ borderLeft: '2px solid #444', paddingLeft: '10px' }}>
        {systemFiles.map(file => {
          const isModified = savedFiles.includes(file);
          const icon = isModified ? '💾' : '📄';
          const style = {
            margin: '2px 0',
            color: isModified ? '#ffff00' : '#00ff00'
          };
          
          return (
            <div key={file} style={style}>
              {icon} {file} {isModified && <span style={{ color: '#888' }}>(modified)</span>}
            </div>
          );
        })}
        
        {/* Show user-created files that aren't in the system files list */}
        {savedFiles
          .filter(file => !systemFiles.includes(file))
          .map(file => (
            <div key={file} style={{ margin: '2px 0', color: '#ff69b4' }}>
              ✨ {file} <span style={{ color: '#888' }}>(user created)</span>
            </div>
          ))
        }
      </div>
      
      <div style={{ marginTop: '15px', color: '#888', fontSize: '12px' }}>
        Total files: {systemFiles.length + savedFiles.filter(f => !systemFiles.includes(f)).length} 
        | Modified: {savedFiles.filter(f => systemFiles.includes(f)).length}
        | User created: {savedFiles.filter(f => !systemFiles.includes(f)).length}
      </div>
    </div>
  );
}

export const componentsMap: { [key: string]: React.FC<any> } = {
  // Simple commands
  hello: HelloComponent,
  welcome: WelcomeComponent,
  help: HelpComponent,
  
  // About commands (with markdown editors)
  "about-me": AboutMeComponent,
  "about-skills": AboutSkillsComponent,
  "about-projects": AboutProjectsComponent,

  "ls" : ListFilesComponent,
  
  // Vim editor for file editing
  vim: VimEditor,
};

// Commands that require arguments
export const arguedCommands = ["about"];

// Commands that can optionally take arguments  
export const optionalArgCommands = ["vim"];

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
