import axios from 'axios';

export const removePhoto = (photoId: number) =>
    (dispatch: any) => {
        dispatch({type: 'PHOTO_DELETED_LOADING'});
        return axios.delete(`api/photos/${photoId}`)
            .then((response: any) => {
                dispatch({type: 'DELETE_PHOTO_SUCCESS', payload: response.data});
            })
            .catch(function (error: any) {
                console.log(error);
            });
    };