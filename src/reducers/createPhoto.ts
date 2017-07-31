const initialState: any = [];

export default function createPhoto(state = initialState, action: any) {
    if (action.type === 'PHOTO_CREATED_SUCCESS') {
        return action.payload
    }
    return state
}