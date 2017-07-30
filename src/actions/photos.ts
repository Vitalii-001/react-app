import axios from 'axios';
import {Photo} from '../_shared/models/Photo';

export const getPhotos = () => {
    console.log(axios)
    return (dispatch: any) => axios.get('api/photos')
        .then((response: any) => {
            response.data = response.data.map((item: any) => new Photo(item));
            dispatch({type: 'FETCH_PHOTOS_SUCCESS', payload: response.data})
        })
        .catch(function (error: any) {
            console.log(error, 1);
        });
}