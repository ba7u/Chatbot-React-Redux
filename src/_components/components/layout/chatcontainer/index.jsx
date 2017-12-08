import React, { Component } from 'react';
import { connect } from 'react-redux';

class _ChatContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { err, message, is: loading, children: loadingComponent } = this.props;
        return (
            <div ref={el => this.container = el} className="chat-container">
                {loading ? loadingComponent : (
                    !err ? this.renderBubbles() :
                        (<div className="error">{message}</div>))
                }
            </div>
        );
    }

    _isOverflow() {
        const { scrollHeight, offsetHeight } = this.container;
        return scrollHeight > offsetHeight;
    }

    renderBubbles() {
        const { children } = this.props;
        return Array.from(children).map(child => (
            React.cloneElement(child, {
                overflow: this._isOverflow()
            })
        ))
    }
}

const mapStateToProps = ({ user, loading }) => {
    const { err } = user;
    const { is = true } = loading;
    return {
        err,
        is
    }
}

const ChatContainer = connect(
    mapStateToProps
)(_ChatContainer);
export { ChatContainer };