import React, { useState, useEffect } from "react";
import api from "./api";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./login/Login";
import SignUp from "./signUp/Signup";
import Nopage from "./components/Nopage";
import AuthCallback from "./components/OAuthCallback";
import VerifyEmail from "./forgotPassword/verifyEmail";
import ResetPassword from "./forgotPassword/resetPassword";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const isAuth = async () => {
    try {
      const response = await api.get("/user/verify", {
        headers: {
          token: localStorage.token,
        },
      });
      const parseRes = response.data;
      setIsAuthenticated(parseRes === true);
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignUp setAuth={setAuth} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Dashboard setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/auth/callback"
          element={<AuthCallback setAuth={setAuth} />}
        />
        <Route path="/forgot-password" element={<VerifyEmail />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </Router>
  );
};

export default App;
