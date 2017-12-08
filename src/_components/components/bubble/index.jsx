import React, { Component } from 'react';
import { connect } from 'react-redux';
import image from '../../../images/avatar';

class _Bubble extends Component {
    constructor(props) {
        super(props);
        this.overflow = this.props.overflow;
    }

    componentDidMount() {
        this.runScrollIfNeeded();
    }

    _scrollInView() {
        this.element.scrollIntoView({ behavior: 'smooth' });
    }

    runScrollIfNeeded() {
        this.overflow && this._scrollInView();
    }

    render() {
        const { children, content: { type } } = this.props;
        return (
            <div ref={el => this.element = el} className="bubble-container">
                <div className={`bubble ${type}`}>
                    {this.renderChildren()}
                </div>
            </div>
        );
    }

    renderChildren() {
        const { content } = this.props;
        const { type, message = 'Loading...', id, slice } = content;
        return this.props.children.map((child, index) => {
            let attributes = { key: index, type, id };
            index % 2 && (() => {
                const { hyperlinks = [], questions } = content;
                attributes = {
                    ...attributes,
                    message,
                    hyperlinks,
                    questions,
                    slice,
                    scroll: this.runScrollIfNeeded.bind(this)
                }
            })();
            return React.cloneElement(child, attributes);
        });
    }
}

export { _Bubble as Bubble };