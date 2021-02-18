import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import messageReducer from './messageReducer'
import profileReducer from './profileReducer'
import postReducer from './postReducer'
import authReducer from './authReducer'
import adminReducer from './adminReducer'

export default combineReducers({
    message: messageReducer,
    profile: profileReducer,
    post: postReducer,
    auth: authReducer,
    admin: adminReducer,
    form: formReducer
})