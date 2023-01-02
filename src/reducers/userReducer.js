export const initialState = null; // initial value for user is null

export const reducer = (state, action) => {
    if (action.type === "USER") {
        return action.payload;
    }
    if (action.type === "LOGOUT") {
        return null;
    }
    if (action.type === "UPDATE") {
        return {
            ...state, //expand what we currently have in state
            following: action.payload.following, //append to state append to the following array to the existing following array
            followers: action.payload.followers //append to state append to the followers array to the existing followers array
        }
    }
    return state;
}