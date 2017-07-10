import axios from 'axios';

export const getPhotos = () => {
    return (dispatch: any) => axios.get('api/photos')
        .then((response: any) => {
            dispatch({type: 'FETCH_PHOTOS_SUCCESS', payload: response.data})
        })
        .catch(function (error: any) {
            console.log(error);
        });
}