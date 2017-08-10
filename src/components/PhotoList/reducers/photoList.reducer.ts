export default function photoList(state: any = null, action: any) {
    switch(action.type) {
        case 'PHOTO_LIST_LOADING':
            return Object.assign({}, state, {
                isLoadingList: true,
                didInvalidate: false
            });
        case 'FETCH_PHOTOS_SUCCESS':
            return Object.assign({}, state, {
                isLoadingList: false,
                didInvalidate: false,
                items: action.payload,
                lastUpdated: action.receivedAt
            });
    }
    return state;
}