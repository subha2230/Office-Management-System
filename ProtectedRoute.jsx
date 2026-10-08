import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({
                            children,
                            allowedRoles,
                        }) => {

    const { user, loading } = useAuth();

    // ================================
    // LOADING
    // ================================
    if (loading) {
        return (
            <div className="loading-screen">

                <div className="loading-card">

                    <div className="loading-logo">
                        O
                    </div>

                    <div className="loading-spinner"></div>

                    <h2>Office Management System</h2>

                    <p>
                        Checking your access...
                    </p>

                </div>

            </div>
        );
    }

    // ================================
    // NOT LOGGED IN
    // ================================
    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    // ================================
    // ROLE RESTRICTION
    // ================================
    if (
        allowedRoles &&
        !allowedRoles.includes(user.role)
    ) {

        if (user.role === "ADMIN") {
            return (
                <Navigate
                    to="/admin-dashboard"
                    replace
                />
            );
        }

        return (
            <Navigate
                to="/user-dashboard"
                replace
            />
        );
    }

    // ================================
    // AUTHORIZED
    // ================================
    return children;
};

export default ProtectedRoute;