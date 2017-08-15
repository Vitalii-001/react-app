import axios from 'axios';

export const getPhotoList = () =>
    (dispatch: any) => {
        dispatch({type: 'PHOTO_LIST_LOADING'});
        console.log(111)
        return axios.get('api/photos')
            .then((response: any) => {
            console.log(1, response)
                dispatch({type: 'FETCH_PHOTOS_SUCCESS', payload: response.data});
            })
            .catch(function (error: any) {
                console.log(error);
            });
    };
