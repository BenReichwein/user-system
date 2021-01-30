import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import messageReducer from './messageReducer'
import profileReducer from './profileReducer'

export default combineReducers({
    message: messageReducer,
    profile: profileReducer,
    form: formReducer
})