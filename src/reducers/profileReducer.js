/* eslint-disable import/no-anonymous-default-export */
export default (state = {}, action) => {
    switch (action.type) {
        case 'LOAD_PROFILE':
            return action.payload;
        default:
            return state;
    }
}