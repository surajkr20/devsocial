import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { RxCross2 } from "react-icons/rx";

const Sidebar = ({ sidebarPopUp, setSidebarPopUp, handleSignOut }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSidebarPopUp(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [setSidebarPopUp]);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 min-h-screen w-72 border-r border-zinc-700 bg-zinc-800
        z-50 transform transition-transform duration-300 
        ${sidebarPopUp ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Overlay */}
        {sidebarPopUp && (
          <RxCross2
            className="fixed right-3 top-1 text-3xl cursor-pointer text-red-300 hover:scale-105 font-semibold"
            onClick={() => setSidebarPopUp(false)}
          />
        )}

        {/* user information + logout button */}
        <div className="flex flex-col items-start gap-3 p-4 border-b border-white/10 mt-3">
          <div className="flex items-center gap-3">
            <img
              src={user?.image}
              alt="user-dp"
              className="w-14 h-14 rounded-full object-cover border-2 border-red-500/60"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium font-serif text-gray-300">
                {user?.name}
              </span>
              <span className="text-sm text-red-300 font-semibold truncate">
                {user?.email}
              </span>
            </div>
          </div>

          {/* crud buttons */}
          <div className="w-full flex items-center gap-3">
            <button
              onClick={() => navigate("/update-profile")}
              className="px-4 py-1.5 rounded-lg w-full cursor-pointer
                     bg-linear-to-r from-red-600 to-pink-800
                     text-white font-semibold
                     hover:scale-105 transition duration-200"
            >
              Edit Profile
            </button>

            <button
              onClick={handleSignOut}
              className="px-4 py-1.5 rounded-lg w-full cursor-pointer
                     bg-linear-to-r from-red-600 to-pink-600
                     text-white font-semibold
                     hover:scale-105 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Menu Links */}
        <div className="flex flex-col px-4 gap-3 text-gray-300 mt-3">
          <Link
            to="/"
            onClick={() => setSidebarPopUp(false)}
            className="hover:text-red-500 transition bg-black/10 hover:bg-zinc-700 p-3 rounded-md text-sm font-semibold"
          >
            Home
          </Link>

          <Link
            to="/my-dashboard"
            onClick={() => setSidebarPopUp(false)}
            className="hover:text-red-500 transition bg-black/10 hover:bg-zinc-700 p-3 rounded-md text-sm font-semibold"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
