const initialState: any = [];

export default function photoList(state = initialState, action: any) {
    if (action.type === 'FETCH_PHOTOS_SUCCESS') {
        return action.payload
    }
    return state
}