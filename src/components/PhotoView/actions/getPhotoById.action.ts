import axios from 'axios';

export const getPhotoById = (id: number) => {
    return (dispatch: any) => axios.get(`/api/photos/${id}`)
        .then((response: any) => {
            dispatch({type: 'FETCH_PHOTO_BY_ID_SUCCESS', payload: response.data})
        })
        .catch(function (error: any) {
            console.log(error);
        });
};