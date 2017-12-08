import * as CONSTANTS from '../../constants';
// import React from 'react';

const { AUTH, CHAT, LOADING } = CONSTANTS;

export function loginRequest() {
    return {
        type: AUTH.LOGIN_REQUEST
    }
}

export function loginSuccess(token) {
    return {
        type: AUTH.LOGIN_SUCCESS,
        token
    }
}

export function loginFailure(err) {
    return {
        type: AUTH.LOGIN_FAILURE,
        err
    }
}

export function loading(boolean = true) {
    return {
        type: boolean ? LOADING.IS : LOADING.ISNOT
    }
}

export function messageRequest(type = CHAT.GET) {
    return {
        type: type == CHAT.POST ? CHAT.POST_REQUEST : CHAT.GET_REQUEST
    }
}

export function success(response, type = CHAT.GET) {
    return {
        type: type == CHAT.GET ? CHAT.GET_SUCCESS : CHAT.POST_SUCCESS,
        response
    }
}

export function failure(resp, type = CHAT.GET) {
    return _handleFailure(resp, type);
}

function _handleFailure(resp, type) {
    const isGet = type == CHAT.GET;
    let message = 'Internal Error',
        failureState = {
            type: isGet ? CHAT.GET_FAILURE : CHAT.POST_FAILURE
        };
    if (isGet) {
        // response error will be Err object
        const { response } = resp;
        let status = 500;
        if (response) {
            message = response.message;
            status = response.status;
        }
        failureState = { ...failureState, status }
    } else {
        const { isvalid, input } = resp;
        message = input;
        failureState = { ...failureState, notValid: !isvalid };
    }
    failureState = { ...failureState, message };
    return failureState;
}