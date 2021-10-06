import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import medicine from './medicine';

export default combineReducers({
    alert,
    auth,
    profile,
    post,
    medicine
});