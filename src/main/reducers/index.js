import { combineReducers } from 'redux';
import authReducer from './authReducer';
import updateIdReducer from "./updateIdReducer";

export default combineReducers( {
    auth: authReducer,
    updateId: updateIdReducer
});