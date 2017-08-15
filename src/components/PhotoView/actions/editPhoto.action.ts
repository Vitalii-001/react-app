import axios from 'axios';

export const editPhoto = (data: any, photoId: number) =>
    (dispatch: any) => {
        dispatch({type: 'PHOTO_EDITING_LOADING'});
        return axios.put(`/api/photos/${photoId}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response: any) => {
                dispatch({type: 'PHOTO_UPDATED_SUCCESS'});
            })
            .catch(function (error: any) {
                console.log(error);
            });
    };