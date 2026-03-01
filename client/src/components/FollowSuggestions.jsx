import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import socket from "../socket";
import axiosInstance from "../utils/axiosInstance";

const FollowSuggestions = ({ UserData, setShowNotificationPopUp }) => {
  const navigate = useNavigate();
  const { AllDBusers, user, viewUser } = useContext(AuthContext);

  useEffect(() => {
    AllDBusers();
  }, []);

  return (
    <div className="w-full max-h-96 overflow-y-auto flex flex-col gap-2">
      {UserData.length === 0 && (
        <span className="text-gray-400 text-sm text-center">
          No users found
        </span>
      )}

      {UserData.map((data) => (
        <div
          key={data._id}
          className="flex items-center justify-between bg-[#1c1c1c] 
              p-2 rounded-lg hover:bg-zinc-800 transition"
        >
          <div
            className="flex items-center gap-3"
            onClick={() => {
              navigate(`/user-dashboard/${data._id}`);
              setShowNotificationPopUp(false);
            }}
          >
            <img
              src={data.image}
              alt="dp"
              className="w-10 h-10 rounded-full object-cover border border-red-500/50"
            />
            <div>
              <p className="text-sm font-medium text-white">{data.name}</p>
              <p className="text-xs text-gray-400">{data.email}</p>
            </div>
          </div>

          <button className="bg-blue-500 px-3 py-1 text-xs rounded-md cursor-pointer">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
};

export default FollowSuggestions;
