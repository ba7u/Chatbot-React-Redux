import React, { Component } from 'react';

class Container extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children } = this.props;
        return (
            <div className="container">
                {children}
            </div>
        );
    }
}

export { Container };