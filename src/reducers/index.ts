import { combineReducers } from 'redux';
import photoList from './photoList';
import getPhotoById from './getPhotoById';

import { routerReducer } from 'react-router-redux';
import createPhoto from './createPhoto';
import editPhoto from './editPhoto';
import removePhoto from './removePhoto';


export default combineReducers({
    routing: routerReducer,
    photoList,
    getPhotoById,
    removePhoto,
    createPhoto,
    editPhoto,
})