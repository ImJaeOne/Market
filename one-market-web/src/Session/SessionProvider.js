import React, { createContext, useReducer, useEffect, useMemo } from 'react';
import sessionAuth from './sessionAuth';
import reducer, { initialState, SESSION_LOADING } from './SessionReducer';

export const SessionContext = createContext();

const SessionProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const loadSession = async () => {
            dispatch({ type: SESSION_LOADING, payload: true });
            await sessionAuth.checkSession(dispatch);
            dispatch({ type: SESSION_LOADING, payload: false });
        };
        loadSession();
    }, []);

    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export default SessionProvider;
