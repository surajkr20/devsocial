import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// user - logged in user
// currentUser - view/profile user coming from id

const MyProfile = ({ currentUser, currentUserPost }) => {
  const navigate = useNavigate();
  const { user, followToggleFunction, isFollow, setIsFollow } =
    useContext(AuthContext);

  const capitalizeFirst = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const isOwnProfile = user?._id === currentUser?._id;

  useEffect(() => {
    if (user && currentUser) {
      const alreadyFollowing = user.following?.includes(currentUser._id);
      setIsFollow(alreadyFollowing);
    }
  }, [user, currentUser]);

  const handleFollowToggle = async (e) => {
    e.preventDefault();
    followToggleFunction(currentUser._id);
  };

  return (
    <div className="w-full mx-auto px-4 md:px-20">
      <div
        className="w-full bg-linear-to-br from-zinc-900/80 to-black/70 backdrop-blur-xl border border-white/10 rounded-3xl 
      shadow-2xl p-4 md:p-10 flex flex-col items-center"
      >
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:gap-8 gap-4 md:max-w-xl w-full bg-[#1c1c1c]/30 px-4 py-2 rounded-md shadow">
          {/* Profile Image */}
          <div className="relative group">
            <img
              src={`${currentUser?.image}`}
              alt="user-dp"
              className="w-24 h-24  md:w-36 md:h-36 rounded-full object-cover border-4 border-red-500/70 shadow-lg shadow-red-500/20"
            />

            {/* Online ring effect */}
            <div className="absolute inset-0 rounded-full border-2 border-pink-500/40 animate-pulse"></div>
          </div>

          {/* User Info */}
          <div className="flex flex-col items-center md:items-start gap-2 flex-1">
            {/* Name + Email */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-bold text-red-300 tracking-wide">
                {capitalizeFirst(currentUser?.name)}
              </h2>
              <p className="text-sm text-gray-400 mt-1">{currentUser?.email}</p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="flex gap-1.5 items-center">
                <span className="text-xl font-bold text-white">
                  {currentUserPost.length}
                </span>
                <span className="text-[11px] text-gray-400">Posts</span>
              </div>
              <div className="flex gap-1.5 items-center">
                <span className="text-xl font-bold text-white">
                  {currentUser?.followers?.length}
                </span>
                <span className="text-[11px] text-gray-400">Followers</span>
              </div>
              <div className="flex gap-1.5 items-center">
                <span className="text-xl font-bold text-white">
                  {currentUser?.following?.length}
                </span>
                <span className="text-[11px] text-gray-400">Following</span>
              </div>
            </div>

            <div className="w-full">
              {!isOwnProfile ? (
                <button
                  className={`py-2 text-xs rounded-md cursor-pointer w-full ${
                    isFollow
                      ? "bg-gray-400 text-gray-950 font-medium"
                      : "bg-blue-500 text-white"
                  }`}
                  onClick={handleFollowToggle}
                >
                  {isFollow ? "Following" : "Follow"}
                </button>
              ) : (
                <button
                  className="bg-blue-500 text-gray-300 py-2 text-xs rounded-md cursor-pointer w-full"
                  onClick={() => navigate("/update-profile")}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
