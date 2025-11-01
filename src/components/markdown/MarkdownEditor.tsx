import React, { useState, useEffect, useCallback } from "react";
import { marked } from "marked";
import "./MarkdownEditor.css";

interface MarkdownEditorProps {
  fileName: string;
  initialContent?: string;
  onSave?: (content: string) => void;
  onExit?: () => void;
}


const MarkdownCompiler: React.FC<MarkdownEditorProps> = ({
  fileName,
  initialContent = "",
}) => {
  const [content, setContent] = useState(initialContent);
  const [savedContent, setSavedContent] = useState(initialContent);

  const parseMarkdown = useCallback((markdown: string) => {
    try {
      return marked(markdown);
    } catch (error) {
      return `<p style="color: red;">Error parsing markdown: ${error}</p>`;
    }
  }, []);

  useEffect(() => {
    const files = JSON.parse(localStorage.getItem("terminal-md-files") || "{}");
    if (files[fileName]) {
      setContent(files[fileName].content);
      setSavedContent(files[fileName].content);
    }
  }, [fileName]);

  return (
    <div
      className="markdown-editor"
      style={{ fontFamily: "monospace", padding: "20px" }}
    >
      <div className="editor-header" style={{ marginBottom: "15px" }}>
        <h3 style={{ color: "rgb(0, 255, 156)", margin: 0 }}>
          {fileName} {content !== savedContent ? "*" : ""}
        </h3>
      </div>

      <div
        className="markdown-preview"
        style={{
          padding: "15px",
          paddingTop: "0px",
          minHeight: "300px",
          backgroundColor: "rgba(96, 252, 255, 0)",
        }}
        dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
      />

      <div
        className="editor-shortcuts"
        style={{
          marginTop: "15px",
          fontSize: "11px",
          color: "rgb(150, 150, 150)",
        }}
      >
      </div>
    </div>
  );
};

export default MarkdownCompiler;
