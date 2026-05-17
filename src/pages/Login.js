import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                "https://crypto-backend-ur3p.onrender.com/api/auth/login",
                { email, password }
            );
            login(response.data.user, response.data.token);
            toast.success("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response?.data?.message || "Помилка входу");
        }
        setLoading(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h1 className="auth-logo">CryptoTracker<span>.</span></h1>
                <h2 className="auth-title">Login</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@example.com"
                            required
                        />
                    </div>
                    <div className="auth-input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? "Loading..." : "Log In"}
                    </button>
                </form>
                <p className="auth-switch">
                    Don't have an account?  <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;