import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const { login, loading } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });

        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.email || !formData.password) {
            setError("Please enter email and password");
            return;
        }

        try {
            const response = await login(formData);

            if (response.role === "ADMIN") {
                navigate("/admin-dashboard");
            } else {
                navigate("/user-dashboard");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="login-page">

            {/* =========================
                LEFT SIDE
            ========================= */}

            <div className="login-left">

                <div className="brand-section">

                    <div className="brand-icon">
                        🏢
                    </div>

                    <h1>
                        Office Management
                    </h1>

                    <h1>
                        System
                    </h1>

                    <p>
                        Manage your office operations
                        <br />
                        efficiently and securely.
                    </p>

                </div>


                <div className="feature-list">

                    <div className="feature-item">

                        <div className="feature-icon">
                            ✓
                        </div>

                        <div>
                            <strong>
                                Easy Management
                            </strong>

                            <span>
                                Manage locations, buildings and companies
                            </span>
                        </div>

                    </div>


                    <div className="feature-item">

                        <div className="feature-icon">
                            ✓
                        </div>

                        <div>
                            <strong>
                                Secure Access
                            </strong>

                            <span>
                                Role-based access for Admin and Users
                            </span>
                        </div>

                    </div>


                    <div className="feature-item">

                        <div className="feature-icon">
                            ✓
                        </div>

                        <div>
                            <strong>
                                Smart Reports
                            </strong>

                            <span>
                                View and manage office information
                            </span>
                        </div>

                    </div>

                </div>

            </div>


            {/* =========================
                RIGHT SIDE
            ========================= */}

            <div className="login-right">

                <div className="login-card">

                    <div className="login-header">

                        <div className="mobile-brand-icon">
                            🏢
                        </div>

                        <h2>
                            Welcome Back
                        </h2>

                        <p>
                            Login to your account
                        </p>

                    </div>


                    {/* ERROR */}

                    {error && (
                        <div className="error-message">

                            <span className="error-icon">
                                !
                            </span>

                            <span>
                                {error}
                            </span>

                        </div>
                    )}


                    {/* FORM */}

                    <form onSubmit={handleSubmit}>

                        {/* EMAIL */}

                        <div className="form-group">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">

                                </span>

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    autoComplete="off"
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div className="form-group">

                            <div className="password-label-row">

                                <label htmlFor="password">
                                    Password
                                </label>

                                <Link to="/forgot-password">
                                    Forgot Password?
                                </Link>

                            </div>


                            <div className="input-wrapper">

                                <span className="input-icon">

                                </span>

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="new-password"
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                >
                                    {showPassword
                                        ? "Hide"
                                        : "Show"}
                                </button>

                            </div>

                        </div>


                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Logging in...
                                </>
                            ) : (
                                <>
                                    Login
                                    <span className="login-arrow">
                                        →
                                    </span>
                                </>
                            )}

                        </button>

                    </form>


                    {/* REGISTER */}

                    <div className="register-section">

                        <span>
                            Don't have an account?
                        </span>

                        <Link to="/register">
                            Create Account
                        </Link>

                    </div>


                    {/* FOOTER */}

                    <div className="login-footer">

                        <span>
                            © 2026 Office Management System
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;