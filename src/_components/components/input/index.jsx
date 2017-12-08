import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
        this.handleKeyPress = this._handleKeyPress.bind(this);
        this.handleContent = this._handleContent.bind(this);
        this.state = {
            inputValue: ''
        }
    }

    _handleKeyPress(event) {
        const { post } = this.props;
        const { inputValue } = this.state;
        event.keyCode === 13 && this.setState({
            inputValue: ''
        }, post(inputValue))
    }

    _handleContent({ target: { value } }) {
        this.setState({
            inputValue: value
        });
    }

    render() {
        const { enable } = this.props;
        const { inputValue } = this.state;
        return (
            <input
                className={`${!enable ? 'disabled' : ''}`}
                type="text"
                placeholder="Mesajını yaz..."
                value={inputValue}
                onKeyDown={this.handleKeyPress}
                onChange={this.handleContent}
                disabled={!enable} />
        )
    }
}

export { Input };