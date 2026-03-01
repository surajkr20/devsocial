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

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/my-dashboard"
          element={user ? <MyDashboard /> : <SignIn />}
        />
        <Route
          path="/user-dashboard/:id"
          element={user && <UserDashboard />}
        />
        <Route
          path="/update-profile"
          element={user && <UpdateProfilePanel />}
        />
        <Route
          path="/all-users"
          element={user && <UserListPopup />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/create" element={user && <CreatePost />} />
        <Route
          path="/update/:id"
          element={user ? <UpdatePost /> : <SignIn />}
        />
      </Routes>
    </>
  );
};

export default App;
