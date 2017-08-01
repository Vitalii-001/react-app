import axios from "axios";

export const editPhoto = (data: any, photoId: number) => {
    return (dispatch: any) => axios.put(`/api/photos/${photoId}`, data)
        .then((response: any) => {
            debugger
            dispatch({type: "PHOTO_UPDATED_SUCCESS", payload: response.data});
        })
        .catch(function (error: any) {
            console.log(error);
        });
};