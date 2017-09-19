import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { MASSAGES } from '../../../_shared/constants/constants';

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
                toastr.success('', MASSAGES.CREATED_PHOTO);
            })
            .catch(function (error: any) {
                console.log(error);
                toastr.error('', error);
            });
    };
