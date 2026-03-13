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

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-6xl font-extrabold text-red-500/30">Chyba</p>
          <h1 className="text-xl font-bold text-white mt-4">Něco se pokazilo</h1>
          <p className="text-gray-400 mt-2 max-w-sm text-sm">
            {this.state.error?.message || 'Neočekávaná chyba aplikace'}
          </p>
          <button
            onClick={this.handleReset}
            className="mt-6 px-6 py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
          >
            Zkusit znovu
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
