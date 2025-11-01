import React, { useState } from 'react';
import MarkdownCompiler from '../../markdown/MarkdownEditor';

interface MdEditProps {
  fileName?: string;
}

const MdEdit: React.FC<MdEditProps> = ({ fileName = 'README.md' }) => {
  const [isEditing, setIsEditing] = useState(true);
  const [content, setContent] = useState(``);

  const handleSave = (newContent: string) => {
    setContent(newContent);
    console.log(`Saved ${fileName}:`, newContent);
  };

  const handleExit = () => {
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div style={{ fontFamily: 'monospace', color: 'rgb(0, 255, 156)' }}>
        📄 File "{fileName}" closed. Use 'edit {fileName}' to reopen.
      </div>
    );
  }

  return (
    <MarkdownCompiler
      fileName={fileName}
      initialContent={content}
      onSave={handleSave}
      onExit={handleExit}
    />
  );
};

export default MdEdit;