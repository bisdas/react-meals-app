import React from 'react';

import FallbackUI from '../FallbackUI';
import Constants from '../../constants';


class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        if (error) {
            this.setState({ hasError: true })
        }
    }

    componentDidCatch(error) {
        if (error) {
            this.setState({ hasError: true })
        }
    }

    render() {
        const { children } = this.props;
        const { hasError } = this.state;

        if (hasError) {
            debugger;
            return (
                <div>
                    <FallbackUI content={Constants.ERROR_MESSAGES.Fallback} />
                </div>
            )
        }

        return children;

    }
}

export default ErrorBoundary;