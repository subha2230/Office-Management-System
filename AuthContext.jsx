import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import api from "../services/api";

const AuthContext =
    createContext(null);

export const AuthProvider = ({
                                 children
                             }) => {

    const [user, setUser] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    // =========================
    // RESTORE LOGIN
    // =========================
    useEffect(() => {

        const storedUser =
            localStorage.getItem("user");

        const token =
            localStorage.getItem("token");

        if (storedUser && token) {

            try {

                setUser(
                    JSON.parse(storedUser)
                );

            } catch (error) {

                localStorage.removeItem(
                    "user"
                );

                localStorage.removeItem(
                    "token"
                );
            }
        }

    }, []);

    // =========================
    // REGISTER
    // =========================
    const register = async (
        registerData
    ) => {

        setLoading(true);

        try {

            const response =
                await api.post(
                    "/auth/register",
                    registerData
                );

            return response.data;

        } catch (error) {

            const message =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Registration failed";

            throw new Error(message);

        } finally {

            setLoading(false);
        }
    };

    // =========================
    // LOGIN
    // =========================
    const login = async (
        loginData
    ) => {

        setLoading(true);

        try {

            const response =
                await api.post(
                    "/auth/login",
                    loginData
                );

            const data =
                response.data;

            const loggedUser = {

                id: data.id,

                username:
                data.username,

                email:
                data.email,

                role:
                data.role
            };

            // Save token
            localStorage.setItem(
                "token",
                data.token
            );

            // Save user
            localStorage.setItem(
                "user",
                JSON.stringify(
                    loggedUser
                )
            );

            setUser(loggedUser);

            return loggedUser;

        } catch (error) {

            const message =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Invalid email or password";

            throw new Error(message);

        } finally {

            setLoading(false);
        }
    };

    // =========================
    // LOGOUT
    // =========================
    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        setUser(null);
    };

    const value = {

        user,

        loading,

        register,

        login,

        logout,

        isAuthenticated:
            !!user
    };

    return (

        <AuthContext.Provider
            value={value}
        >

            {children}

        </AuthContext.Provider>
    );
};

export const useAuth = () => {

    const context =
        useContext(AuthContext);

    if (!context) {

        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
};