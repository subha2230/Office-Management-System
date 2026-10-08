import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="main-header">

            {/* Left Side */}
            <div className="header-brand">

                <div className="header-logo">
                    <span>O</span>
                </div>

                <div className="header-title">
                    <h1>OFFICE</h1>
                    <span>MANAGEMENT SYSTEM</span>
                </div>

            </div>

            {/* Right Side */}
            <div className="header-right">

                {/* Notification */}
                <button
                    className="notification-btn"
                    title="Notifications"
                >
                    🔔
                    <span className="notification-badge">3</span>
                </button>

                {/* User Profile */}
                <div className="header-user">

                    <div className="user-avatar">
                        {user?.username
                            ? user.username.charAt(0).toUpperCase()
                            : "U"}
                    </div>

                    <div className="user-details-header">

                        <span className="header-username">
                            {user?.username || "User"}
                        </span>

                        <span className="header-role">
                            {user?.role || "USER"}
                        </span>

                    </div>

                    {/* Logout */}
                    <button
                        className="header-dropdown"
                        onClick={handleLogout}
                        title="Logout"
                    >
                        ▾
                    </button>

                </div>

            </div>

        </header>
    );
};

export default Header;