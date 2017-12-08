import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { user, chat, loading } from '../reducers';
import { combineReducers } from 'redux';

const rootreducer = combineReducers({
    loading,
    user,
    chat,
});

export default createStore(
    rootreducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        thunkMiddleware
    )
);