import React, { useState, useEffect } from "react";
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
import axios from "axios";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const isAuth = async () => {
    try {
      console.log("inside App.js", localStorage.token);
      const response = await axios.get("http://localhost:5000/auth/verify", {
        header: {
          token: localStorage.token,
        },
      });
      const parseRes = await response.data;
      console.log("st from isAUth check", parseRes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

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
        <Route path="*" element={<Nopage />} />
      </Routes>
    </Router>
  );
};

export default App;
