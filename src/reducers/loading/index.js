import { LOADING } from '../../constants';

const initial = {
    is: false
}

export function loading(state = initial, action) {
    switch (action.type) {
        case LOADING.IS:
            return { ...state, is: true }
            break;
        case LOADING.ISNOT:
            return { ...state, is: false }
            break;
        default:
            return state;
            break;
    }
}