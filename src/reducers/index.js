import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import messageReducer from './messageReducer'
import authReducer from './authReducer'

export default combineReducers({
    message: messageReducer,
    auth: authReducer,
    form: formReducer
})