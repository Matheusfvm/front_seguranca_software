import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import UserDetails from "./components/user/UserDetails";
import UpdateUser from "./components/user/UpdateUser";

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/update-user" element={<UpdateUser />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
