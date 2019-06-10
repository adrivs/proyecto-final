import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import event from './event';

export default combineReducers({ alert, auth, profile, event });
