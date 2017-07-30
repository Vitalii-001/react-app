import { combineReducers } from 'redux';
// import { assign } from 'lodash';
import photos from './photos';
import photo from './photo';

import { routerReducer } from 'react-router-redux';


export default combineReducers({
    routing: routerReducer,
    photo,
    photos
});