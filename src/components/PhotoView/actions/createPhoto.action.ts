import axios from 'axios';

export const createPhoto = (data: any) =>
    (dispatch: any) => {
        dispatch({type: 'PHOTO_CREATED_LOADING'});
        return axios.post(`/api/photos`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response: any) => {
                dispatch({type: 'PHOTO_CREATED_SUCCESS', payload: response.data});
            })
            .catch(function (error: any) {
                console.log(error);
            });
    };
