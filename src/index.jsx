import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './_components/app';
import store from './store';

import './_scss/main';

const renderer = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <App />
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

renderer();

if (module.hot) {
    module.hot.accept('./root', () => {
        renderer();
    });
}
