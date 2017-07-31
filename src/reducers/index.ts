import { combineReducers } from 'redux';
// import { assign } from 'lodash';
import photos from './photos';
import getPhotoById from './getPhotoById';

import { routerReducer } from 'react-router-redux';
import createPhoto from './createPhoto';


export default combineReducers({
    routing: routerReducer,
    photos,
    getPhotoById,
    createPhoto
});