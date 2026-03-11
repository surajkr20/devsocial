import React, { lazy, useContext, useEffect, useState } from "react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import PrivateRoute from "./PrivateRoute";
import Footer from "./components/Footer";
const Home = lazy(()=> import("./pages/Home"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const UpdatePost = lazy(() => import("./pages/UpdatePost"));
const Signup = lazy(() => import("./pages/Signup"));
const SignIn = lazy(() => import("./pages/SignIn"));
const MyDashboard = lazy(() => import("./pages/MyDashboard"));
const UpdateProfilePanel = lazy(() => import("./pages/UpdateProfilePanel"));
const UserListPopup = lazy(() => import("./components/UserListPopup"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={
            <Suspense fallback={null}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="/signin"
          element={
            <Suspense fallback={null}>
              <SignIn />
            </Suspense>
          }
        />
        <Route
          path="/my-dashboard"
          element={
            <PrivateRoute>
              <Suspense fallback={null}>
                <MyDashboard />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/user-dashboard/:id"
          element={
            <PrivateRoute>
              <Suspense fallback={null}>
                <UserDashboard />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/update-profile"
          element={
            <PrivateRoute>
              <Suspense fallback={null}>
                <UpdateProfilePanel />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route path="/all-users" element={user && <Suspense fallback={null}><UserListPopup /></Suspense>} />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <Suspense fallback={null}>
                <CreatePost />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <PrivateRoute>
              <Suspense fallback={null}>
                <UpdatePost />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Suspense fallback={null}><Home /></Suspense>} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
