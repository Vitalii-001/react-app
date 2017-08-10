export default function editPhoto(state: any = null, action: any) {
    switch(action.type) {
        case 'PHOTO_EDITING_LOADING':
            return Object.assign({}, state, {
                isEditing: true,
                didInvalidate: false
            });
        case 'PHOTO_UPDATED_SUCCESS':
            return Object.assign({}, state, {
                isEditing: false,
                didInvalidate: false,
                // items: action.payload,
                lastUpdated: action.receivedAt
            });
    }
    return state;
}