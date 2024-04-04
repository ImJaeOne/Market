import { createContext, useContext, useState, useMemo } from 'react';

const userEmail = sessionStorage.getItem('userEmail');
const token = sessionStorage.getItem('token');

export const IsLoginContext = createContext({ isLogin: userEmail !== null && token !== null ? true : false });

export function IsLoginProvider({ children }) {
    const [isLogin, setIsLogin] = useState(userEmail !== null && token !== null ? true : false);
    const value = useMemo(() => ({ isLogin, setIsLogin }), [isLogin, setIsLogin]);
    return <IsLoginContext.Provider value={value}>{children}</IsLoginContext.Provider>;
}

export function useIsLoginState() {
    const context = useContext(IsLoginContext);
    if (!context) {
        throw new Error('Cannot find IsLoginProvider');
    } else {
        return context.isLogin;
    }
}
