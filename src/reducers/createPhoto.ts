export default function createPhoto(state: any = null, action: any) {
    switch(action.type) {
        case 'PHOTO_CREATED_LOADING':
            console.log('yohoooo', action)
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case 'PHOTO_CREATED_SUCCESS':
                console.log('yohoooo, i am loaded', action)
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.payload,
                lastUpdated: action.receivedAt
            });
    }
    return state
}