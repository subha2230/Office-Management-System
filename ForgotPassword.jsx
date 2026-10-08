import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!email.trim()) {
            setError("Please enter your email");
            return;
        }

        if (!email.includes("@")) {
            setError("Please enter a valid email");
            return;
        }

        // Temporary frontend response
        setSuccess(
            "Password reset instructions will be sent to your email."
        );
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <h1>Office Management System</h1>

                <h2>Forgot Password</h2>

                <p>
                    Enter your registered email address to reset
                    your password.
                </p>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="success-message">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                                setError("");
                                setSuccess("");
                            }}
                            placeholder="Enter your registered email"
                        />
                    </div>

                    <button type="submit">
                        Send Reset Link
                    </button>

                </form>

                <p className="register-link">
                    Remember your password?{" "}
                    <Link to="/login">
                        Back to Login
                    </Link>
                </p>

            </div>

        </div>
    );
};

export default ForgotPassword;