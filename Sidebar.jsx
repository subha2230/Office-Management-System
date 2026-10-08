import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
    const { user } = useAuth();

    const isAdmin = user?.role === "ADMIN";

    const link = (to, icon, label) => (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive
                    ? "sidebar-link active"
                    : "sidebar-link"
            }
        >
            <span className="sidebar-link-icon">
                {icon}
            </span>

            <span className="sidebar-link-label">
                {label}
            </span>
        </NavLink>
    );

    return (
        <aside className="sidebar">

            {/* =========================
                BRAND
            ========================= */}

            <div className="sidebar-brand">

                <div className="sidebar-logo">
                    <span>O</span>
                </div>

                <div className="sidebar-brand-text">
                    <h2>OFFICE</h2>
                    <span>MANAGEMENT SYSTEM</span>
                </div>

            </div>


            {/* =========================
                MAIN MENU
            ========================= */}

            <nav className="sidebar-menu">

                <div className="sidebar-section-title">
                    MAIN MENU
                </div>


                {/* Dashboard */}

                {link(
                    isAdmin
                        ? "/admin-dashboard"
                        : "/user-dashboard",
                    "⌂",
                    "Dashboard"
                )}


                {/* Locations */}

                {link(
                    "/locations",
                    "⌖",
                    "Locations"
                )}


                {/* Buildings */}

                {link(
                    "/buildings",
                    "▦",
                    "Buildings"
                )}


                {/* Companies */}

                {link(
                    "/companies",
                    "▥",
                    "Companies"
                )}


                {/* Subcompanies */}

                {link(
                    "/subcompanies",
                    "▤",
                    "Subcompanies"
                )}


                {/* Employees */}

                {link(
                    "/employees",
                    "♙",
                    "Employees"
                )}


                {/* Job Roles */}

                {link(
                    "/job-roles",
                    "◎",
                    "Job Roles"
                )}


                {/* Reports */}

                {link(
                    "/reports",
                    "▥",
                    "Reports"
                )}


                {/* =========================
                    ADMIN MENU
                ========================= */}

                {isAdmin && (
                    <>
                        <div className="sidebar-divider"></div>

                        <div className="sidebar-section-title">
                            MANAGEMENT
                        </div>

                        {link(
                            "/admin/users",
                            "♙",
                            "User Management"
                        )}
                    </>
                )}

            </nav>


            {/* =========================
                BOTTOM HELP
            ========================= */}

            <div className="sidebar-bottom">

                <div className="sidebar-help">
                    <strong>Admin</strong>

                    </div>

                    <div className="help-content">
                        <strong>Need Help?</strong>
                    </div>

                </div>



        </aside>
    );
};

export default Sidebar;