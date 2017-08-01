import axios from 'axios';

export const createPhoto = (data: any) => {
    debugger
    return (dispatch: any) => axios.post(`/api/photos`, data)
        .then((response: any) => {
            dispatch({type: 'PHOTO_CREATED_SUCCESS', payload: response.data})
        })
        .catch(function (error: any) {
            console.log(error);
        });
};