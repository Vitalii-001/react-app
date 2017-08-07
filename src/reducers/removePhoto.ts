export default function removePhoto(state: any = null, action: any) {
    switch(action.type) {
        case 'PHOTO_DELETED_LOADING':
            return Object.assign({}, state, {
                isDeleting: true,
                didInvalidate: false
            });
        case 'DELETE_PHOTO_SUCCESS':
            return Object.assign({}, state, {
                isDeleting: false,
                didInvalidate: false,
                items: action.payload,
                lastUpdated: action.receivedAt
            });
    }
    return state
}