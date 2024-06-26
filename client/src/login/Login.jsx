import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordToggle from "../components/PasswordToggle";
import api from "../api";
import { toast } from "react-toastify";
import "../login/_login.scss";

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [PasswordInputType, ToggleIcon] = PasswordToggle();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.warning("Please fill in all fields.");
      return;
    }
    try {
      const response = await api.post("/user/login", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setAuth(true);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type={PasswordInputType}
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="password-toggle-icon3">{ToggleIcon}</span>
            <a href="/forgot-password" className="forgot-password-link">
              Forgot password?
            </a>
          </div>
          <button type="submit" className="btn btn-primary login-btn">
            Login
          </button>
        </form>
        <p className="form-label text-center mt-3">
          Don't have an account?{" "}
          <a href="/signup" className="signup-link">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
