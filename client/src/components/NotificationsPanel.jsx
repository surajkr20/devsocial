import React, { useContext, useState } from "react";
import FollowSuggestions from "../components/FollowSuggestions";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const NotificationPanel = ({ notifications, setShowNotificationPopUp }) => {
  const navigate = useNavigate();
  const { allUsers } = useContext(AuthContext);

  return (
    <>
      {/* Notificatin + follow suggestion, Popup Panel */}

      <div
        id="notification-scroll"
        className="absolute right-0 top-14 md:right-16 w-sm md:w-md md:max-h-96 overflow-y-auto bg-zinc-800 border
          border-zinc-700 rounded-xl shadow-2xl z-50 p-3 flex flex-col gap-2.5"
      >
        {/* notification div */}
        {notifications.map((data) => (
          <div
            key={data._id}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800/60 transition duration-300 cursor-pointer"
          >
            {/* Avatar */}
            {data.sender?.image ? (
              <img
                src={data.sender.image}
                alt="user"
                className="md:w-8 md:h-8 w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="md:w-8 md:h-8 w-6 h-6 rounded-full bg-linear-to-br from-red-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                {data.sender?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-300 truncate">
                <span className="font-semibold text-white">
                  {data.sender?.name || data.sender?.email}
                </span>{" "}
                {data.type === "LIKE" && "liked your post ❤️"}
                {data.type === "FOLLOW" && "started following you 👀"}
              </p>
            </div>

            {/* Date */}
            {data.createdAt && (
              <span className="text-xs text-gray-500 shrink-0">
                {new Date(data.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
        ))}

        {/* users Follow list */}
        <div className="w-full flex flex-col items-start">
          <div className="flex items-center justify-between w-full mb-2 px-1">
            <span className="text-gray-300 text-xs">Suggested for you</span>
            <span
              onClick={() => {
                navigate("/all-users");
              }}
              className="text-gray-300 text-xs cursor-pointer hover:text-white"
            >
              See All
            </span>
          </div>

          {/* follow suggestions */}
          <FollowSuggestions
            UserData={allUsers.slice(0, 3)}
            setShowNotificationPopUp={setShowNotificationPopUp}
          />
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;
