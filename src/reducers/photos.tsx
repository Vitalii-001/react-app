const initialState: any = [];

export default function photos(state = initialState, action: any) {
    if (action.type === 'FETCH_PHOTOS_SUCCESS') {
        return action.payload
    }
    return state
}