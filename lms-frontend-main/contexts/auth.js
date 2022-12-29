import { useEffect, useContext, createContext, useState  } from "react";
import { useRouter } from "next/router";
import AuthService from "../pages/api/auth.service";
const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

    const router = useRouter();

    const [user, setUser] = useState(null)
    // const [loading, setLoading] = useState(true)

    useEffect(() => {
        const authUser = AuthService.getCurrentUser();
        // if there is no authenticated user, redirect to login page_
        if (authUser === "") {
            router.push("/")
        }
        setUser(authUser);
        // setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated: !!user, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

