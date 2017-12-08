import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, ChatContainer, InputContainer, HeaderContainer } from './components';
import { Input, Bubble, Avatar, Dialog, Logo, Actions, Loading } from './components';
import { login, getMessage } from '../actions';

const fakeCredentials = {
    a: 'lorem',
    b: 'ipsum'
}

class _App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { login, getMessage } = this.props;
        login(fakeCredentials)
            .then(() => {
                this.props.loggedIn && getMessage();
            });
    }

    render() {
        const { chat, is: loading } = this.props;
        return (
            <Container>
                <HeaderContainer>
                    <Logo />
                    <Actions />
                </HeaderContainer>
                <ChatContainer>{
                    !loading ?
                        chat.map(content => {
                            const { id } = content;
                            return (
                                <Bubble content={content} key={id}>
                                    <Avatar />
                                    <Dialog />
                                </Bubble>
                            )
                        }) : <Loading />}
                </ChatContainer>
                <InputContainer >
                    <Input />
                </InputContainer>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: (credentials) => dispatch(login(credentials)),
    getMessage: () => dispatch(getMessage())
});


const mapStateToProps = ({ user, chat, loading }) => {
    const { err = false, isLoggedIn: loggedIn } = user;
    const { is = true } = loading;
    return {
        err,
        loggedIn,
        chat,
        is
    };
};

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(_App);

export default App;