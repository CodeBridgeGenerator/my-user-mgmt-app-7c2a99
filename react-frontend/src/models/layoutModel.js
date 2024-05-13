export const layout = {
    state: {
        menuOpen: true
    }, // initial state
    reducers: {
        // handle state changes with pure functions
        setMenuOpen(state, bool) {
            return { ...state, menuOpen: bool };
        }
    },
    effects: (dispatch) => ({})
};
