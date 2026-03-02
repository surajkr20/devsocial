import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const FollowSuggestions = ({ UserData, setShowNotificationPopUp }) => {
  const navigate = useNavigate();
  const { AllDBusers } = useContext(AuthContext);
  const [randomUsers, setRandomUsers] = useState([]);

  useEffect(() => {
    AllDBusers();
  }, []);

  // for showing random user's suggestion list
  const suffleUsers = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    if (UserData?.length) {
      setRandomUsers(suffleUsers(UserData));
    }
  }, [UserData]);

  return (
    <div className="w-full max-h-96 overflow-y-auto flex flex-col gap-2">
      {randomUsers.length === 0 && (
        <span className="text-gray-400 text-sm text-center">
          No users found
        </span>
      )}

      {randomUsers.map((data) => (
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
