/* eslint-disable import/no-anonymous-default-export */
export default (state = 'Loading...', action) => {
    switch (action.type) {
        case 'WELCOME_MESSAGE':
            return action.payload;
        default:
            return state;
    }
}