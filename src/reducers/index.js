import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import messageReducer from './messageReducer'
import authReducer from './authReducer'
import profileReducer from './profileReducer'
import postReducer from './postReducer'

export default combineReducers({
    message: messageReducer,
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
    form: formReducer
})