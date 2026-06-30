import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("ErrorBoundary caught:", error, info);
  }

  reset = () => this.setState({ hasError: false, error: null });

  render() {
    if (this.state.hasError) {
      return (
        <div
          data-testid="error-boundary"
          className="fixed inset-0 z-[200] bg-background text-foreground flex items-center justify-center p-6"
        >
          <div className="max-w-md text-center">
            <p className="text-xs tracking-[0.5em] uppercase text-primary mb-4">
              — Something went off-script
            </p>
            <h2 className="font-serif-display text-3xl md:text-4xl tracking-tight mb-4">
              Please refresh the page.
            </h2>
            <p className="text-sm text-foreground/60 mb-6">
              {String(this.state.error?.message || this.state.error || "Unexpected error")}
            </p>
            <button
              onClick={() => {
                this.reset();
                window.location.reload();
              }}
              className="inline-flex items-center px-6 py-3 text-xs tracking-[0.22em] uppercase bg-primary text-primary-foreground hover:bg-[#D8B485] transition-colors"
              data-testid="error-boundary-reload"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
