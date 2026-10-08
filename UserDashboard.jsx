import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./UserDashboard.css";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function UserDashboard() {

    const { user, logout } = useAuth();

    const [locations, setLocations] = useState([]);

    const [profile, setProfile] = useState({
        username: user?.username || "User",
        email: user?.email || "",
        role: user?.role || "USER",
    });

    useEffect(() => {
        loadProfile();
        loadLocations();
    }, []);

    /*
     * =========================
     * LOAD USER PROFILE
     * =========================
     */

    const loadProfile = async () => {

        try {

            const response = await api.get("/users/me");

            const data = response.data;

            setProfile({
                username: data.username || "User",
                email: data.email || "",
                role: data.role || "USER",
            });

        } catch (error) {

            console.error(
                "Profile error:",
                error
            );

        }
    };


    /*
     * =========================
     * LOAD LOCATIONS
     * =========================
     */

    const loadLocations = async () => {

        try {

            const response = await api.get(
                "/locations",
                {
                    params: {
                        page: 0,
                        size: 100,
                    },
                }
            );

            setLocations(
                response.data.content || []
            );

        } catch (error) {

            console.error(
                "Location error:",
                error
            );

        }
    };


    /*
     * =========================
     * LOGOUT
     * =========================
     */

    const handleLogout = () => {

        logout();

    };


    /*
     * =========================
     * DASHBOARD COUNTS
     * =========================
     */

    const availableLocations =
        locations.length;

    const headOffices =
        locations.filter(
            (location) =>
                location.headOffice === true
        ).length;


    return (

        <div className="user-dashboard">

            {/* ================= SIDEBAR ================= */}

            <aside className="user-sidebar">

                <div className="user-brand">

                    <div className="user-brand-logo">
                        O
                    </div>

                    <div>

                        <h2>
                            OFFICE
                        </h2>

                        <span>
                            MANAGEMENT SYSTEM
                        </span>

                    </div>

                </div>


                <nav className="user-menu">

                    <Link
                        to="/user-dashboard"
                        className="user-menu-item active"
                    >
                        <span>⌂</span>
                        Dashboard
                    </Link>


                    <Link
                        to="/locations"
                        className="user-menu-item"
                    >
                        <span>▣</span>
                        Locations
                    </Link>


                    <Link
                        to="/companies"
                        className="user-menu-item"
                    >
                        <span>◫</span>
                        Companies
                    </Link>


                    <div className="user-divider"></div>


                    <div className="user-menu-title">
                        MY ACCOUNT
                    </div>


                    <div className="user-menu-item">

                        <span>♙</span>

                        My Profile

                    </div>

                </nav>


                <div className="user-sidebar-bottom">

                    <div className="user-support">

                        <div className="support-icon">
                            ?
                        </div>

                        <div>

                            <strong>
                                Need Help?
                            </strong>

                            <small>
                                Contact your administrator
                            </small>

                        </div>

                    </div>


                    <button
                        className="user-logout"
                        onClick={handleLogout}
                    >

                        <span>
                            ↪
                        </span>

                        Logout

                    </button>

                </div>

            </aside>


            {/* ================= MAIN ================= */}

            <main className="user-main">

                {/* ================= HEADER ================= */}

                <header className="user-header">

                    <div>

                        <h1>
                            Welcome back,{" "}
                            {profile.username}! 👋
                        </h1>

                        <p>
                            Here's what's happening
                            with your office today.
                        </p>

                    </div>


                    <div className="user-header-right">

                        <div className="user-notification">

                            🔔

                            <span>
                                2
                            </span>

                        </div>


                        <div className="user-profile">

                            <div className="user-avatar">

                                {profile.username
                                    .charAt(0)
                                    .toUpperCase()}

                            </div>


                            <div className="user-profile-info">

                                <strong>
                                    {profile.username}
                                </strong>

                                <small>
                                    {profile.role}
                                </small>

                            </div>


                            <span>
                                ⌄
                            </span>

                        </div>

                    </div>

                </header>


                {/* ================= FILTER ================= */}

                <div className="user-filter">

                    <div className="user-filter-box">

                        <span>
                            Location
                        </span>


                        <select>

                            <option>
                                All Locations
                            </option>


                            {locations.map(
                                (location) => (

                                    <option
                                        key={location.id}
                                        value={location.id}
                                    >
                                        {
                                            location.locationName
                                        }
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    <div className="user-date-box">

                        <span>
                            Today
                        </span>

                        <strong>

                            {new Date().toLocaleDateString(
                                "en-IN",
                                {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                }
                            )}

                        </strong>

                    </div>

                </div>


                {/* ================= STAT CARDS ================= */}

                <section className="user-stats">


                    {/* TOTAL LOCATIONS */}

                    <div className="user-stat-card purple">

                        <div className="user-stat-icon">
                            ◫
                        </div>


                        <div>

                            <span>
                                Total Locations
                            </span>

                            <h2>
                                {locations.length}
                            </h2>

                            <small>
                                Available office locations
                            </small>

                        </div>

                    </div>


                    {/* AVAILABLE LOCATIONS */}

                    <div className="user-stat-card green">

                        <div className="user-stat-icon">
                            ✓
                        </div>


                        <div>

                            <span>
                                Available Locations
                            </span>

                            <h2>
                                {availableLocations}
                            </h2>

                            <small>
                                Currently available
                            </small>

                        </div>

                    </div>


                    {/* MY ACCOUNT */}

                    <div className="user-stat-card blue">

                        <div className="user-stat-icon">
                            ♙
                        </div>


                        <div>

                            <span>
                                My Account
                            </span>

                            <h2>
                                1
                            </h2>

                            <small>
                                Active user account
                            </small>

                        </div>

                    </div>


                    {/* HEAD OFFICES */}

                    <div className="user-stat-card orange">

                        <div className="user-stat-icon">
                            ★
                        </div>


                        <div>

                            <span>
                                Head Offices
                            </span>

                            <h2>
                                {headOffices}
                            </h2>

                            <small>
                                Main office locations
                            </small>

                        </div>

                    </div>

                </section>


                {/* ================= CONTENT ================= */}

                <section className="user-content">


                    {/* ================= LOCATIONS ================= */}

                    <div className="user-panel">

                        <div className="user-panel-header">

                            <div>

                                <h2>
                                    Available Locations
                                </h2>

                                <p>
                                    View office location
                                    information
                                </p>

                            </div>


                            <Link to="/locations">
                                View All →
                            </Link>

                        </div>


                        <div className="user-location-list">


                            {locations.length === 0 ? (

                                <div className="user-empty">
                                    No locations available
                                </div>

                            ) : (

                                locations
                                    .slice(0, 5)
                                    .map(
                                        (location) => (

                                            <div
                                                className="user-location-row"
                                                key={location.id}
                                            >


                                                <div className="user-location-icon">

                                                    {location.locationCode
                                                        ?.substring(0, 2)
                                                        .toUpperCase()}

                                                </div>


                                                <div className="user-location-info">

                                                    <strong>
                                                        {
                                                            location.locationName
                                                        }
                                                    </strong>

                                                    <span>

                                                        Code:{" "}

                                                        {
                                                            location.locationCode
                                                        }

                                                    </span>

                                                </div>


                                                <div className="user-active">

                                                    <i></i>

                                                    Available

                                                </div>


                                                <Link
                                                    to="/locations"
                                                    className="user-view"
                                                >
                                                    View
                                                </Link>

                                            </div>

                                        )
                                    )

                            )}

                        </div>

                    </div>


                    {/* ================= PROFILE ================= */}

                    <div className="user-panel profile-panel">

                        <div className="user-panel-header">

                            <div>

                                <h2>
                                    My Profile
                                </h2>

                                <p>
                                    Your account information
                                </p>

                            </div>

                        </div>


                        <div className="big-user-avatar">

                            {profile.username
                                .charAt(0)
                                .toUpperCase()}

                        </div>


                        <h3>
                            {profile.username}
                        </h3>


                        <span className="user-role-badge">
                            {profile.role}
                        </span>


                        <div className="profile-details">


                            <div>

                                <label>
                                    Username
                                </label>

                                <strong>
                                    {profile.username}
                                </strong>

                            </div>


                            <div>

                                <label>
                                    Email
                                </label>

                                <strong>
                                    {profile.email}
                                </strong>

                            </div>


                            <div>

                                <label>
                                    Access
                                </label>

                                <strong>
                                    View Only
                                </strong>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ================= BOTTOM ================= */}

                <section className="user-bottom">


                    <div className="user-welcome-card">

                        <div>

                            <span>
                                OFFICE MANAGEMENT
                            </span>

                            <h2>

                                Explore your
                                <br />
                                office locations.

                            </h2>


                            <p>

                                View available office
                                locations and their details.

                            </p>


                            <Link to="/locations">
                                View Locations →
                            </Link>

                        </div>


                        <div className="office-icon">
                            🏢
                        </div>

                    </div>


                    <div className="user-status-card">

                        <div className="status-check">
                            ✓
                        </div>


                        <div>

                            <strong>
                                Account Status
                            </strong>


                            <p>
                                Your account is active.
                            </p>


                            <span>
                                ● Active
                            </span>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default UserDashboard;