import { combineReducers } from "redux";
// import { assign } from "lodash";
import photoList from "./photoList";
import getPhotoById from "./getPhotoById";

import { routerReducer } from "react-router-redux";
import createPhoto from "./createPhoto";


export default combineReducers({
    routing: routerReducer,
    photoList,
    getPhotoById,
    createPhoto
});