import React, { Component } from 'react';
import logo from '../../../images/logo.png';

class Logo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="logo">
                <img src={logo} />
            </div>
        );
    }
}

export { Logo };