import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import messageReducer from './messageReducer'
import profileReducer from './profileReducer'
import postReducer from './postReducer'

export default combineReducers({
    message: messageReducer,
    profile: profileReducer,
    post: postReducer,
    form: formReducer
})