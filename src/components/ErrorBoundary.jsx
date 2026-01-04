import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
   
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 rounded-xl border bg-destructive/10 text-destructive">
          <div className="font-semibold mb-1">Something went wrong.</div>
          <div className="text-sm opacity-80">{String(this.state.error)}</div>
        </div>
      );
    }
    return this.props.children;
  }
}
