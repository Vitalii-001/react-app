export default function createPhoto(state: any = null, action: any) {
    switch(action.type) {
        case 'PHOTO_CREATED_LOADING':
            return Object.assign({}, state, {
                isCreating: true,
                didInvalidate: false
            });
        case 'PHOTO_CREATED_SUCCESS':
            return Object.assign({}, state, {
                isCreating: false,
                didInvalidate: false,
                lastUpdated: action.receivedAt
            });
    }
    return state
}