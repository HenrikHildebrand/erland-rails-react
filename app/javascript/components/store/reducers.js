const state = {
    authenticated: false,
    loaded: false,
    allEvents: null,
    myEvents: null,
    user: null
}

const reducer = (returnState={state}, action) => {
    switch(action.type) {
        case "CURRENT_USER":
            // console.log("[reducers.js] CURRENT_USER");
            return {...returnState, currentUser: action.currentUser};
        case "SET_AUTH": return {...returnState, authenticated: true};
        case "RESET_AUTH": return {...returnState, authenticated: false};
        case "UPDATE_STATE":
            returnState = {state: {...returnState.state, ...action.newState}};
            return returnState
        default: return returnState;
    }
}

export default reducer;