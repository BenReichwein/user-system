/* eslint-disable import/no-anonymous-default-export */
import {
    LOAD_ADMIN
} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_ADMIN:
            return action.payload;
        default:
            return state;
    }
}