import { AuthService } from '../../api';
import { loading, loginRequest, loginSuccess, loginFailure } from '../';

export function login(form) {
    return dispatch => {
        dispatch(loading(true));
        dispatch(loginRequest());
        return AuthService.login(form, 1, true)
            .then(data => dispatch(loginSuccess(data)))
            .catch(error => dispatch(loginFailure(error)))
            .then(() => dispatch(loading(false)));
    }
}