import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import { ClipLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="bg-[#1c1c1c] flex items-center justify-center w-full min-h-screen">
        <ClipLoader
          color="red"
          size={35}
          className="border-2 border-red-600 font-semibold"
        />
      </div>
    );
  }

  return user ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
