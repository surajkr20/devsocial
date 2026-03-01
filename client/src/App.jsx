import React, { useContext, useEffect, useState } from "react";
import CreatePost from "./pages/CreatePost";
import { Route, Routes } from "react-router-dom";
import UpdatePost from "./pages/UpdatePost";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import MyDashboard from "./pages/MyDashboard";
import Home from "./pages/Home";
import { AuthContext } from "./context/AuthProvider";
import UpdateProfilePanel from "./pages/UpdateProfilePanel";
import UserListPopup from "./components/UserListPopup";
import UserDashboard from "./pages/UserDashboard";
import PrivateRoute from "./privateRoute";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/my-dashboard"
          element={
            <PrivateRoute>
              <MyDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/user-dashboard/:id"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-profile"
          element={
            <PrivateRoute>
              <UpdateProfilePanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/all-users"
          element={
            user && <UserListPopup />
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <PrivateRoute>
              <UpdatePost />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
