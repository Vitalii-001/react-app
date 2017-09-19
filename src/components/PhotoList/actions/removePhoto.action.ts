import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { MASSAGES } from '../../../_shared/constants/constants';

export const removePhoto = (photoId: number) =>
    (dispatch: any) => {
        dispatch({type: 'PHOTO_DELETED_LOADING'});
        return axios.delete(`api/photos/${photoId}`)
            .then((response: any) => {
                dispatch({type: 'DELETE_PHOTO_SUCCESS', payload: response.data});
                toastr.success('', MASSAGES.DELETED_PHOTO);
            })
            .catch(function (error: any) {
                console.log(error);
                toastr.error('', error);
            });
    };