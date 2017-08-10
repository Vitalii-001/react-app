import axios from 'axios';

export const getPhotoList = () =>
    (dispatch: any) => {
        dispatch({type: 'PHOTO_LIST_LOADING'});
        return axios.get('api/photos')
            .then((response: any) => {
                dispatch({type: 'FETCH_PHOTOS_SUCCESS', payload: response.data});
            })
            .catch(function (error: any) {
                console.log(error);
            });
    };
