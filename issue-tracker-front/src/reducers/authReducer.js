import Cookies from 'js-cookie';
import {AUTH_COOKIE} from "../consts";

function tokenAct(state = {token : '', isLogged : false, username : ''}, action) {
    switch (action.type) {
        case 'LOG_IN':
            if (action.data.isLogged) {
                Cookies.set(AUTH_COOKIE, action.data);
                return Object.assign({}, state, action.data);
            }
            return state;
        case 'LOG_OUT':
            Cookies.remove(AUTH_COOKIE);
            return Object.assign({}, state, {
                token : '',
                isLogged : false,
                username : ''
            });
        default:
            return state;
    }
}

export default tokenAct;