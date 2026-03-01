import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import FollowSuggestions from "./FollowSuggestions";

const UserListPopup = () => {
  const { allUsers } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 bg-black backdrop-blur-sm z-50 flex items-center justify-center md:px-0 px-3">
      {/* Modal */}
      <div className="w-full max-w-lg bg-zinc-900 rounded-2xl p-5 shadow-2xl border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-lg font-semibold">All Users</h2>
          {/* Back Button */}
          <div
            className="fixed top-10 left-6 md:left-10 md:top-10 cursor-pointer group"
            onClick={() => navigate(-1)}
          >
            <IoArrowBackCircleOutline className="md:text-4xl text-3xl text-red-500 bg-white rounded-full group-hover:scale-110 transition duration-300" />
          </div>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded-lg bg-zinc-800 text-white 
          border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* User List */}
        <FollowSuggestions UserData={filteredUsers} />
      </div>
    </div>
  );
};

export default UserListPopup;
