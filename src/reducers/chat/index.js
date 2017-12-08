import { CHAT } from '../../constants';
const CHARLIMIT = 500;

function iterateId(state) {
    return (!state.length ? state.slice(-1).id : state.slice(-1)[0].id) + 1;
}

export function chat(state = [], action) {
    switch (action.type) {
        case CHAT.GET_REQUEST:
            return [...state, {
                id: iterateId(state) || 0,
                type: CHAT.GET,
                mloaded: false
            }];
            break;
        case CHAT.GET_SUCCESS:
            return [...state, {
                mloaded: true,
                id: iterateId(state),
                type: CHAT.GET,
                message: action.response.body,
                hyperlinks: action.response.hyperlinks,
                questions: action.response.questions
            }].filter(({ mloaded }) => mloaded);
            break;
        case CHAT.GET_FAILURE:
            return [...state, {
                mloaded: true,
                id: iterateId(state) || 0,
                type: CHAT.GET,
                status: action.status,
                message: action.message
            }].filter(({ mloaded }) => mloaded);
            break;
        case CHAT.POST_SUCCESS:
            return [...state, {
                message: action.response,
                mloaded: true,
                type: CHAT.POST,
                id: iterateId(state),
            }].filter(({ mloaded }) => mloaded);
            break;
        case CHAT.POST_REQUEST:
            return [
                ...state, {
                    mloaded: false,
                    type: CHAT.POST,
                    id: iterateId(state) || 0,
                }
            ];
            break;
        case CHAT.POST_FAILURE:
            return [...state, {
                mloaded: true,
                id: iterateId(state) || 0,
                type: CHAT.POST,
                message: action.message,
            }].filter(({ mloaded }) => mloaded);
            break;
        default:
            return state;
            break;
    }
}

// if (body.length > CHARLIMIT)
// message = {
//     original: message,
//     sliced: body.slice(0, CHARLIMIT - 3) + '...'
// }