import React, { Component } from 'react';
import icon from '../../../images/50x50.png';

class Actions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="actions">
                <a href="#panel">
                    <img src={icon} />
                </a>
                <a id="closeChatbot" href="#close">
                    <img src={icon} />
                </a>
            </div>
        );
    }
}

export { Actions };