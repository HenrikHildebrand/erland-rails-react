
export const update = {
    user: (user) => {
        return { type: "CURRENT_USER", currentUser: user }
    },
    setAuth: () => {
        return { type: "SET_AUTH"}
    },
    resetAuth: () => {
        return { type: "RESET_AUTH"}
    },
    state: (state) => {
        return { type: "UPDATE_STATE", newState: state }
    }
};