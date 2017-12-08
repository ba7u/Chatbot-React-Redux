import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMessage, getMessage } from '../../../../actions';

class _InputContainer extends Component {
    constructor(props) {
        super(props);
        this.handleInputValue = this._handeInputValue.bind(this)
    }

    render() {
        const { children, enable } = this.props;
        return (
            <div className={`input-container ${!enable ? 'disabled' : ''}`}>
                {this.renderInput()}
            </div>
        );
    }

    _handeInputValue(input) {
        const { postMessage, getMessage } = this.props;
        postMessage(input)
            .then(({ notValid }) => {
                setTimeout(() => getMessage(!!notValid), 500);
            });
    }

    renderInput() {
        const { children: input, enable } = this.props;
        return React.cloneElement(input, {
            post: this.handleInputValue,
            enable: enable
        });
    }
}

const mapStateToProps = ({ loading, chat }) => {
    let attributes = { loading };
    if (chat.length) {
        const lastItem = chat.slice(-1)[0];
        let { mloaded: enable } = lastItem;
        if (lastItem.status) {
            enable = !lastItem.status
        }
        attributes = { ...attributes, enable }
    }
    return attributes;
}

const mapDispatchToProps = (dispatch) => ({
    postMessage: (input) => dispatch(postMessage(input)),
    getMessage: (validation) => dispatch(getMessage(validation))
});

const InputContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(_InputContainer)

export { InputContainer };