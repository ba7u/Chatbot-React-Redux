import React, { Component } from 'react';

class HeaderContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header-container">
                {this.props.children}
            </div>
        );
    }
}

export { HeaderContainer };