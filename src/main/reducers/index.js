import { combineReducers } from 'redux';

import ssoReducer from './ssoReducer';
import userReducer from "./userReducer";
import roleHistoryReducer from "./roleHistoryReducer";

export default combineReducers( {
    auth: ssoReducer,
    user: userReducer,
    roleHistory: roleHistoryReducer
});