import { ChatService } from '../../api';
import { loading, messageRequest, success, failure } from '../';

const TIMEOUTSEC = .5;

export function getMessage(isvalid) {
    return dispatch => {
        dispatch(messageRequest());
        return ChatService.get(isvalid, TIMEOUTSEC)
            .then(response => dispatch(success(response)))
            .catch(err => {
                console.error(err);
                dispatch(failure(err));
            })
    }
}

export function postMessage(input) {
    return dispatch => {
        dispatch(messageRequest('post'));
        return ChatService.post(input, TIMEOUTSEC)
            .then(input => dispatch(success(input, 'post')))
            .catch(err => dispatch(failure(err, 'post')));
    }
}