import {combineReducers} from 'redux';
// import { assign } from 'lodash';
import photos from './photos';
import { routerReducer } from 'react-router-redux';
// import {syncHistory} from 'react-router-redux';


export default combineReducers({
    routing: routerReducer,
    photos
});