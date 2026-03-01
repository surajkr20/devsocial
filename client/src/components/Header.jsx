import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { CiBellOn } from "react-icons/ci";
import NotificationPanel from "./NotificationsPanel";
import { NotificationContext } from "../context/NotificationProvider";
import socket from "../socket";

const Header = () => {
  const { user, signout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarPopUp, SetSidebarPopUp] = useState(false);

  const [showNotificationPopUp, setShowNotificationPopUp] = useState(false);
  const { notifications, setNotifications } = useContext(NotificationContext);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (data) => {
      console.log("Notification received:", data);

      setNotifications((prev) => [data, ...prev]);
    };

    socket.on("newNotification", handleNewNotification);

    return () => {
      socket.off("newNotification", handleNewNotification);
    };
  }, [socket]);

  const handleSignOut = (e) => {
    e.preventDefault();
    try {
      signout();
      navigate("/");
      toast.success("user logout successfully");
    } catch (error) {
      console.log("error into logout");
      toast.error("logout error");
    }
  };

  return (
    <nav
      className="w-full sticky top-0 z-50 text-white
                backdrop-blur-lg bg-white/5 
                border-b border-white/10 
                px-4 md:px-16 py-3 
                flex items-center justify-between"
    >
      {/* Hamburger of sidebar + Logo */}
      <div className="flex items-center gap-2.5">
        {user && (
          <button
            onClick={() => {
              SetSidebarPopUp((prev) => !prev);
              setShowNotificationPopUp(false);
            }}
            className="text-white text-xl cursor-pointer"
          >
            <FaBars />
          </button>
        )}
        <Link
          to="/"
          className="text-2xl font-extrabold 
               bg-linear-to-r from-red-500 to-pink-500 
               bg-clip-text text-transparent"
        >
          DevSocial
        </Link>
      </div>

      {/* Sidebar popup */}
      {user && (
        <Sidebar
          sidebarPopUp={sidebarPopUp}
          setSidebarPopUp={SetSidebarPopUp}
          handleSignOut={handleSignOut}
          setShowNotificationPopUp={setShowNotificationPopUp}
        />
      )}

      {/* Menu Links */}
      {user && !sidebarPopUp && (
        <div className="hidden md:flex px-4 gap-3 text-gray-300">
          <Link
            to="/"
            className="transition bg-black/10 hover:bg-zinc-700 px-3 py-2 rounded-md text-sm font-semibold"
          >
            Home
          </Link>

          <Link
            to="/my-dashboard"
            className="transition bg-black/10 hover:bg-zinc-700 px-3 py-2 rounded-md text-sm font-semibold"
          >
            My Profile
          </Link>
        </div>
      )}

      {/* notification popup */}
      {showNotificationPopUp && (
        <NotificationPanel
          notifications={notifications}
          setShowNotificationPopUp={setShowNotificationPopUp}
        />
      )}

      {/* Right Section */}
      <div className="flex items-center md:gap-4 gap-2 relative">
        {/* notification icon */}
        {user && (
          <button
            className="relative w-9 h-9 flex items-center justify-center rounded-full text-red-400 cursor-pointer 
          hover:scale-105 transition"
            onClick={() => {
              setShowNotificationPopUp((prev) => !prev);
              SetSidebarPopUp(false);
              // mark all as read
              setNotifications((prev) =>
                prev.map((n) => ({ ...n, isRead: true })),
              );
            }}
          >
            <CiBellOn className="text-3xl cursor-pointer" />

            {/* Notification Count */}
            <span
              className="absolute -top-1 -right-1 
                 bg-red-500 text-white 
                 text-[10px] font-bold 
                 px-1.5 py-0.5 
                 rounded-full"
            >
              {unreadCount > 0 ? <span>{unreadCount}</span> : 0}
            </span>
          </button>
        )}

        {/* Create Post */}
        {user && (
          <button
            onClick={() => navigate("/create")}
            className="w-9 h-9 flex items-center justify-center 
                   rounded-full bg-linear-to-r 
                   from-red-500 to-pink-500 
                   text-white shadow-lg 
                   hover:scale-110 transition"
          >
            <FaRegSquarePlus />
          </button>
        )}

        {/* Auth buttons */}
        {!user && (
          <div className="flex items-center gap-3 w-full">
            <Link
              to="/signin"
              className="px-4 py-1.5 rounded-lg w-full
                     border border-white/20 
                     text-gray-300 hover:text-white 
                     hover:border-red-500 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-4 py-1.5 rounded-lg w-full
                     bg-linear-to-r from-red-600 to-pink-600 
                     text-white font-semibold 
                     hover:scale-105 transition duration-200"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
