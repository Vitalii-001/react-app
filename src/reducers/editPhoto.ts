const initialState: any = [];

export default function editPhoto(state = initialState, action: any) {
    if (action.type === "PHOTO_UPDATED_SUCCESS") {
        return action.payload
    }
    return state
}