/* eslint-disable import/no-anonymous-default-export */
import {
    GET_UID
} from '../actions/types'

export default (state = null, action) => {
    switch (action.type) {
        case GET_UID:
            return action.payload;
        default:
            return state;
    }
}