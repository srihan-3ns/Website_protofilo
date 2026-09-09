import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CRITICAL UNCAUGHT ERROR caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetAndReload = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.error('Failed to clear storage:', e);
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#080A0D',
          color: '#F4F7FA',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          padding: '2rem'
        }}>
          <div style={{
            maxWidth: '640px',
            width: '100%',
            backgroundColor: '#11151B',
            border: '1px solid rgba(244, 247, 250, 0.12)',
            borderRadius: '16px',
            padding: '2.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(239, 83, 80, 0.15)',
              color: '#EF5350',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              margin: '0 auto 1.5rem auto'
            }}>
              ⚠️
            </div>

            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
              Application Recovered From Error
            </h1>

            <p style={{ color: '#89929D', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              A runtime issue was caught preventing a blank white page. You can reload the page or reset the local demo cache to restore normal operation.
            </p>

            {this.state.error && (
              <div style={{
                backgroundColor: '#171D25',
                border: '1px solid rgba(239, 83, 80, 0.3)',
                borderRadius: '8px',
                padding: '1rem',
                textAlign: 'left',
                fontSize: '0.8rem',
                fontFamily: 'monospace',
                color: '#EF5350',
                marginBottom: '1.75rem',
                overflowX: 'auto',
                maxHeight: '140px'
              }}>
                {this.state.error.toString()}
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={this.handleReload}
                style={{
                  backgroundColor: '#F1B93E',
                  color: '#080A0D',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(241, 185, 62, 0.25)'
                }}
              >
                Reload Application
              </button>

              <button
                onClick={this.handleResetAndReload}
                style={{
                  backgroundColor: '#171D25',
                  color: '#F4F7FA',
                  border: '1px solid rgba(244, 247, 250, 0.15)',
                  borderRadius: '8px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Reset Demo Data & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
