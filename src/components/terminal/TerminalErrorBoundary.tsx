import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface TerminalErrorBoundaryProps {
  children: React.ReactNode;
  onReset?: () => void;
}

class TerminalErrorBoundary extends React.Component<
  TerminalErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: TerminalErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Terminal component error:', error, errorInfo);
    this.setState({
      hasError: true,
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="terminal-error" style={{
          fontFamily: "monospace",
          marginLeft: "25px",
          padding: "20px",
          border: "1px solid rgb(255, 0, 0)",
          borderRadius: "5px",
          backgroundColor: "rgba(255, 0, 0, 0.1)"
        }}>
          <pre style={{ color: 'rgb(255, 100, 100)', marginBottom: '10px' }}>
            ⚠️ Terminal Error: Command execution failed
          </pre>
          <pre style={{ color: 'rgb(200, 200, 200)', fontSize: '12px', marginBottom: '15px' }}>
            {this.state.error?.message || 'Unknown error occurred'}
          </pre>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={this.handleReset}
              style={{ 
                background: 'transparent', 
                border: '1px solid rgb(0, 255, 156)', 
                color: 'rgb(0, 255, 156)',
                padding: '8px 15px',
                cursor: 'pointer',
                fontFamily: 'monospace',
                fontSize: '14px'
              }}
            >
              Reset Terminal
            </button>
            <button 
              onClick={() => window.location.reload()}
              style={{ 
                background: 'transparent', 
                border: '1px solid rgb(96, 253, 255)', 
                color: 'rgb(96, 253, 255)',
                padding: '8px 15px',
                cursor: 'pointer',
                fontFamily: 'monospace',
                fontSize: '14px'
              }}
            >
              Reload Page
            </button>
          </div>
          <details style={{ marginTop: '15px', color: 'rgb(150, 150, 150)' }}>
            <summary style={{ cursor: 'pointer', color: 'rgb(200, 200, 200)' }}>
              Show Error Details
            </summary>
            <pre style={{ 
              fontSize: '11px', 
              backgroundColor: 'rgba(0, 0, 0, 0.3)', 
              padding: '10px', 
              marginTop: '10px',
              overflow: 'auto',
              maxHeight: '200px'
            }}>
              {this.state.error?.stack}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default TerminalErrorBoundary;