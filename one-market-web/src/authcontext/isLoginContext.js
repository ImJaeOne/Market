import { createContext, useContext, useState, useMemo } from 'react';

export const IsLoginContext = createContext({ isLogin: false, setIsLogin: () => {} });

export function IsLoginProvider({ children }) {
    const userEmail = sessionStorage.getItem('userEmail');
    const token = sessionStorage.getItem('token');
    const [isLogin, setIsLogin] = useState(userEmail !== null && token !== null);

    const value = useMemo(() => ({ isLogin, setIsLogin }), [isLogin, setIsLogin]);

    return <IsLoginContext.Provider value={value}>{children}</IsLoginContext.Provider>;
}

export function useIsLoginState() {
    const { isLogin } = useContext(IsLoginContext);
    return isLogin;
}
