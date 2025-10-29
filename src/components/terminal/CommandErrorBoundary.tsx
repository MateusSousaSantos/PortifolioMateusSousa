import React from 'react';
import TerminalText from '../terminalText/terminalText';

interface CommandErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface CommandErrorBoundaryProps {
  children: React.ReactNode;
  commandName: string;
}

class CommandErrorBoundary extends React.Component<
  CommandErrorBoundaryProps,
  CommandErrorBoundaryState
> {
  constructor(props: CommandErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): CommandErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Command "${this.props.commandName}" error:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          color: 'rgb(255, 100, 100)', 
          fontFamily: 'monospace',
          padding: '10px',
          border: '1px solid rgb(255, 100, 100)',
          borderRadius: '3px',
          backgroundColor: 'rgba(255, 100, 100, 0.1)',
          margin: '5px 0'
        }}>
          <TerminalText 
            command={`⚠️ Error executing command "${this.props.commandName}"`} 
          />
          <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.8 }}>
            {this.state.error?.message || 'Unknown error occurred'}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CommandErrorBoundary;