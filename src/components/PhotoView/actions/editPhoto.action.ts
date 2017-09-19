import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { MASSAGES } from '../../../_shared/constants/constants';

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
                toastr.success('', MASSAGES.EDITED_PHOTO);
            })
            .catch(function (error: any) {
                console.log(error);
                toastr.error('', error);
            });
    };