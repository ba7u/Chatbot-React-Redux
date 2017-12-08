import { AUTH } from '../../constants';

export function user(state = {}, action) {
    switch (action.type) {
        case AUTH.LOGIN_REQUEST:
            return {
                ...state,
                isLoggedIn: false
            }
            break;
        case AUTH.LOGIN_SUCCESS:
            const { token } = action.token;
            return {
                ...state,
                isLoggedIn: true,
                token: token
            }
            break;
        case AUTH.LOGIN_FAILURE:
            const { err: { message } } = action;
            return {
                ...state,
                isLoggedIn: false,
                err: true,
                message: message
            }
            break;
        default:
            return state;
            break;
    }
}