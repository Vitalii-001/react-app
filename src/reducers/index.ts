import { combineReducers } from 'redux';
import photoList from '../components/PhotoList/reducers/photoList.reducer';
import getPhotoById from '../components/PhotoView/reducers/getPhotoById.reducer';

import { routerReducer } from 'react-router-redux';
import createPhoto from '../components/PhotoView/reducers/createPhoto.reducer';
import editPhoto from '../components/PhotoView/reducers/editPhoto.reducer';
import removePhoto from '../components/PhotoList/reducers/removePhoto.reducer';

import {reducer as toastrReducer} from 'react-redux-toastr';


export default combineReducers({
    routing: routerReducer,
    photoList,
    getPhotoById,
    removePhoto,
    createPhoto,
    editPhoto,
    toastr: toastrReducer
});