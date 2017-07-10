import { combineReducers } from 'redux';
import { assign } from 'lodash';
import * as routeReducer  from 'react-router-redux';
// import {routeReducer, syncHistory} from 'react-router-redux';
import photos from './photos';

// export default combineReducers({
//     routing : routeReducer,
//     photos
// })

export default combineReducers(assign({}, {
    // routing: routeReducer,
    photos
}));