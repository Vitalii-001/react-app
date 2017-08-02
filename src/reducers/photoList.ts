export default function photoList(state: any = null, action: any) {
    switch(action.type) {
        case "FETCH_PHOTOS_SUCCESS":
            return action.payload;
    }
    return state;
}