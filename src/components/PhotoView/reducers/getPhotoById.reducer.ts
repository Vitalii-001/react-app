const initialState: any = [];

export default function getPhotoById(state = initialState, action: any) {
    if (action.type === 'FETCH_PHOTO_BY_ID_SUCCESS') {
        return action.payload
    }
    return state
}