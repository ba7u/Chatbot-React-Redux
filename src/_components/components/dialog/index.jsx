import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMessage, getMessage } from '../../../actions';

class _Dialog extends Component {
    constructor(props) {
        super(props);
        this.hyperlinks = this.props.hyperlinks;
        this.questions = this.props.questions;
    }

    render() {
        const { message } = this.props;
        return (
            <div className="dialog">{
                <div className="message-container">
                    {this.isStandartMessage() ? message : this._combineWords(message)}
                </div>}{
                    this._hasQuestions() && (
                        <div className="question-container">
                            {this._renderQuestions()}
                        </div>
                    )
                }
            </div>
        );
    }

    isStandartMessage() {
        const { type } = this.props;
        return (this.hyperlinks && this.hyperlinks.length == 0) || type == 'post';
    }

    questionClick({ currentTarget: { textContent } }) {
        const { postMessage, getMessage } = this.props;
        postMessage(textContent.trim())
            .then(({ notValid }) => {
                setTimeout(() => getMessage(!!notValid), 1000);
            });
    }

    _showMore() {
        const { scroll } = this.props;
        this.setState({
            message: this.props.message,
            showMore: true
        }, () => scroll());
    }

    _combineWords(message, hyperlinks) {
        let words = message.split(' ');
        this.hyperlinks && this.hyperlinks.forEach(hyperlink => {
            words.splice(hyperlink.key, 1, this._createAnchors(hyperlink))
        });
        return words.map((word, key) => typeof word == 'string' ? word.concat(' ')
            : React.cloneElement(word, { key }));
    }

    _renderQuestions() {
        return this.questions.map((text, key) => (
            React.cloneElement(this._createQuestion(text), { key })
        ));
    }

    _createQuestion(text) {
        return <p
            className="question"
            onClick={this.questionClick.bind(this)}> {text} </p>;
    }

    _createAnchors({ id, word, link }) {
        return <a href={link} target='_blank'> {word} </a>;
    }

    _hasQuestions() {
        return !!this.questions;
    }

}

const mapStateToProps = ({ chat }) => ({ chat });

const mapDispatchToProps = (dispatch) => ({
    postMessage: (input) => dispatch(postMessage(input)),
    getMessage: (validation) => dispatch(getMessage(validation))
});

const Dialog = connect(
    mapStateToProps,
    mapDispatchToProps
)(_Dialog);

export { Dialog };