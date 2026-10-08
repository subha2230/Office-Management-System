import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const API_URL = "http://localhost:8080/api";

function AdminDashboard() {
    const [locations, setLocations] = useState([]);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalAdmins: 0,
        totalNormalUsers: 0,
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        loadDashboard();
        loadLocations();
    }, []);

    const authHeaders = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const loadDashboard = async () => {
        try {
            const response = await fetch(`${API_URL}/admin/dashboard`, {
                headers: authHeaders,
            });

            if (!response.ok) return;

            const data = await response.json();

            setStats({
                totalUsers: data.totalUsers || 0,
                totalAdmins: data.totalAdmins || 0,
                totalNormalUsers: data.totalNormalUsers || 0,
            });
        } catch (error) {
            console.error("Dashboard error:", error);
        }
    };

    const loadLocations = async () => {
        try {
            const response = await fetch(
                `${API_URL}/locations?page=0&size=5`,
                {
                    headers: authHeaders,
                }
            );

            if (!response.ok) return;

            const data = await response.json();

            setLocations(data.content || []);
        } catch (error) {
            console.error("Location error:", error);
        }
    };

    return (
        <div className="admin-dashboard">

            {/* ================= SIDEBAR ================= */}
            <aside className="dashboard-sidebar">

                <div className="brand">
                    <div className="brand-logo">O</div>

                    <div>
                        <h2>OFFICE</h2>
                        <span>MANAGEMENT SYSTEM</span>
                    </div>
                </div>

                <nav className="sidebar-menu">

                    <Link
                        to="/admin-dashboard"
                        className="menu-item active"
                    >
                        <span className="menu-icon">⌂</span>
                        Dashboard
                    </Link>

                    <Link
                        to="/locations"
                        className="menu-item"
                    >
                        <span className="menu-icon">▣</span>
                        Locations
                    </Link>

                    <Link
                        to="/locations/add"
                        className="menu-item"
                    >
                        <span className="menu-icon">＋</span>
                        Add Location
                    </Link>

                    <Link
                        to="/admin/users"
                        className="menu-item"
                    >
                        <span className="menu-icon">♙</span>
                        Users
                    </Link>

                    <div className="menu-divider"></div>

                    <div className="menu-label">
                        MANAGEMENT
                    </div>

                    <Link
                        to="/locations"
                        className="menu-item"
                    >
                        <span className="menu-icon">▤</span>
                        Location Management
                    </Link>

                    <Link
                        to="/admin/users"
                        className="menu-item"
                    >
                        <span className="menu-icon">♟</span>
                        User Management
                    </Link>

                </nav>

                <div className="sidebar-bottom">
                    <div className="admin-help">
                        <div className="help-icon">?</div>

                        <div>
                            <strong>Need Help?</strong>
                            <small>Manage your office easily</small>
                        </div>
                    </div>
                </div>

            </aside>

            {/* ================= MAIN ================= */}
            <main className="dashboard-main">

                {/* HEADER */}
                <header className="dashboard-header">

                    <div className="header-title">
                        <h1>Welcome back, Admin! 👋</h1>
                        <p>
                            Here's what's happening with your office today.
                        </p>
                    </div>

                    <div className="header-right">

                        <div className="notification">
                            🔔
                            <span>3</span>
                        </div>

                        <div className="profile">

                            <div className="profile-avatar">
                                A
                            </div>

                            <div className="profile-info">
                                <strong>Admin User</strong>
                                <small>Administrator</small>
                            </div>

                            <span className="profile-arrow">⌄</span>

                        </div>

                    </div>

                </header>

                {/* ================= FILTER ================= */}
                <div className="dashboard-filter">

                    <div className="filter-item">
                        <span>Location</span>

                        <select>
                            <option>All Locations</option>
                            <option>Chennai</option>
                            <option>Bangalore</option>
                            <option>Madurai</option>
                            <option>Coimbatore</option>
                        </select>
                    </div>

                    <div className="today-date">
                        <span>Today</span>
                        <strong>
                            {new Date().toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </strong>
                    </div>

                </div>

                {/* ================= STAT CARDS ================= */}
                <section className="stats-grid">

                    <div className="stat-card purple">

                        <div className="stat-icon">
                            ◫
                        </div>

                        <div className="stat-content">
                            <span>Total Locations</span>
                            <h2>{locations.length}</h2>
                            <small>All office locations</small>
                        </div>

                    </div>

                    <div className="stat-card blue">

                        <div className="stat-icon">
                            ♙
                        </div>

                        <div className="stat-content">
                            <span>Total Users</span>
                            <h2>{stats.totalUsers}</h2>
                            <small>Registered users</small>
                        </div>

                    </div>

                    <div className="stat-card green">

                        <div className="stat-icon">
                            ✓
                        </div>

                        <div className="stat-content">
                            <span>Normal Users</span>
                            <h2>{stats.totalNormalUsers}</h2>
                            <small>Active users</small>
                        </div>

                    </div>

                    <div className="stat-card orange">

                        <div className="stat-icon">
                            ★
                        </div>

                        <div className="stat-content">
                            <span>Administrators</span>
                            <h2>{stats.totalAdmins}</h2>
                            <small>Admin accounts</small>
                        </div>

                    </div>

                </section>

                {/* ================= CONTENT GRID ================= */}
                <section className="dashboard-content">

                    {/* RECENT LOCATIONS */}
                    <div className="dashboard-panel locations-panel">

                        <div className="panel-header">

                            <div>
                                <h2>Recent Locations</h2>
                                <p>Latest office locations</p>
                            </div>

                            <Link to="/locations">
                                View All →
                            </Link>

                        </div>

                        <div className="location-list">

                            {locations.length === 0 ? (

                                <div className="empty-state">
                                    No locations available
                                </div>

                            ) : (

                                locations.map((location) => (

                                    <div
                                        className="location-row"
                                        key={location.id}
                                    >

                                        <div className="location-avatar">
                                            {location.locationCode
                                                ?.substring(0, 2)
                                                .toUpperCase()}
                                        </div>

                                        <div className="location-details">
                                            <strong>
                                                {location.locationName}
                                            </strong>

                                            <span>
                                                Code: {location.locationCode}
                                            </span>
                                        </div>

                                        <div className="location-status">
                                            <span className="status-dot"></span>
                                            Active
                                        </div>

                                        <Link
                                            to={`/locations/edit/${location.id}`}
                                            className="view-button"
                                        >
                                            View
                                        </Link>

                                    </div>

                                ))

                            )}

                        </div>

                    </div>

                    {/* QUICK ACTIONS */}
                    <div className="dashboard-panel quick-panel">

                        <div className="panel-header">
                            <div>
                                <h2>Quick Actions</h2>
                                <p>Manage your office system</p>
                            </div>
                        </div>

                        <div className="quick-actions">

                            <Link
                                to="/locations/add"
                                className="quick-action"
                            >
                                <div className="quick-icon purple-icon">
                                    ＋
                                </div>

                                <div>
                                    <strong>Add Location</strong>
                                    <span>Create a new office location</span>
                                </div>

                                <b>›</b>
                            </Link>

                            <Link
                                to="/locations"
                                className="quick-action"
                            >
                                <div className="quick-icon blue-icon">
                                    ▣
                                </div>

                                <div>
                                    <strong>Manage Locations</strong>
                                    <span>View and update locations</span>
                                </div>

                                <b>›</b>
                            </Link>

                            <Link
                                to="/admin/users"
                                className="quick-action"
                            >
                                <div className="quick-icon green-icon">
                                    ♙
                                </div>

                                <div>
                                    <strong>Manage Users</strong>
                                    <span>Change user roles</span>
                                </div>

                                <b>›</b>
                            </Link>

                        </div>

                    </div>

                </section>

                {/* ================= BOTTOM ================= */}
                <section className="bottom-section">

                    <div className="welcome-card">

                        <div>
                            <span>OFFICE MANAGEMENT</span>

                            <h2>
                                Manage your workplace
                                <br />
                                from one place.
                            </h2>

                            <p>
                                Easily manage office locations, users and
                                access permissions.
                            </p>

                            <Link to="/locations">
                                Explore Locations →
                            </Link>
                        </div>

                        <div className="welcome-illustration">
                            🏢
                        </div>

                    </div>

                    <div className="system-card">

                        <div className="system-card-icon">
                            ✓
                        </div>

                        <div>
                            <strong>System Status</strong>

                            <p>
                                All systems are running normally.
                            </p>

                            <span className="online">
                                ● Online
                            </span>
                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default AdminDashboard;