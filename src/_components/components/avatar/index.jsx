import React, { Component } from 'react';
import user from '../../../images/avatar.png';
import bot from '../../../images/bot.png';

class Avatar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="avatar">
                <img src={this.isUser ? user : bot} />
            </div>
        );
    }

    get isUser() {
        // type exist?
        return this.props.type == 'post';
    }
}

export { Avatar };