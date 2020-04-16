import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null};
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
        console.log("error is", error)
        console.log("errorInfo is", errorInfo)
        this.setState({hasError: true, error: error, errorInfo: errorInfo})

    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return(
                <div style={{color: "#111", width: "100%"}}>
                    <div style={{margin: "auto"}}>
                        <h1>Something went wrong.</h1>;
                        <p>{this.state.error ? JSON.stringify(this.state.error) : "No error headline"}</p>
                        <p style={{whiteSpace: "pre-line"}}>{this.state.errorInfo? this.state.errorInfo.componentStack : JSON.stringify(this.state.errorInfo)}</p>
                    </div>
                </div>
            )

        }

        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default ErrorBoundary;