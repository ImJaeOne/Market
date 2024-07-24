const initialState = {
    session: null,
    sessionLoading: true,
};

export const SET_SESSION = 'SET_SESSION';
export const CLEAR_SESSION = 'CLEAR_SESSION';
export const SESSION_LOADING = 'SESSION_LOADING';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_SESSION:
            return {
                ...state,
                session: action.payload,
                sessionLoading: false,
            };
        case CLEAR_SESSION:
            return {
                ...state,
                session: null,
                sessionLoading: false,
            };
        case SESSION_LOADING:
            return {
                ...state,
                sessionLoading: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
export { initialState };
