export default function createPhoto(state: any = null, action: any) {
    switch(action.type) {
        case 'PHOTO_CREATED_LOADING':
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case 'PHOTO_CREATED_SUCCESS':
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.payload,
                lastUpdated: action.receivedAt
            });
    }
    return state
}