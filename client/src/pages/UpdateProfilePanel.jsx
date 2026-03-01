import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const UpdateProfilePanel = () => {
  const { loading, user, updateUserProfile } = useContext(AuthContext);

  const [frontendImage, setFrontendImage] = useState(user?.image || "");
  const [backendImage, setBackendImage] = useState(null);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleFormData = async (e) => {
    e.preventDefault();

    if (!password) {
      return toast.error("Current password is required");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("password", password);

    if (newPassword) {
      formData.append("newpassword", newPassword);
    }

    if (backendImage) {
      formData.append("image", backendImage);
    }

    const success = await updateUserProfile(formData);
    navigate("/dashboard");

    if (success) {
      setPassword("");
      setNewPassword("");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-linear-to-br from-zinc-900 via-black to-zinc-950 text-white flex items-center 
      justify-center px-4 py-10 relative"
    >
      {/* Back Button */}
      <div
        className="fixed top-1.5 left-6 md:left-10 md:top-10 cursor-pointer group"
        onClick={() => navigate(-1)}
      >
        <IoArrowBackCircleOutline
          className="text-4xl text-red-500 bg-white rounded-full 
          group-hover:scale-110 transition duration-300"
        />
      </div>

      {/* Card */}
      <div
        className="w-full max-w-4xl bg-zinc-900/70 backdrop-blur-md md:mt-0 mt-2 
  border border-zinc-800 rounded-2xl shadow-2xl p-6 md:p-10"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-red-500 mb-8">
          Update Your Account
        </h2>

        <form onSubmit={handleFormData} className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left - User Info */}
            <div className="flex flex-col gap-6 w-full">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 
              text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Email</label>
                <input
                  disabled
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 
              text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div className="w-full flex items-center gap-3">
                {/* current password */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-400">Password</label>
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 
              text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                    placeholder="Current Password"
                  />
                </div>

                {/* new password */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-400">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 
              text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                    placeholder="New Password"
                  />
                </div>
              </div>
            </div>

            {/* Right - Profile Image */}
            <div className="flex flex-col gap-4 w-full">
              <label className="text-sm text-gray-400">Profile Image</label>

              <input
                onChange={handleImage}
                type="file"
                accept="image/*"
                className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold 
              file:bg-red-600 file:text-white hover:file:bg-red-700 bg-zinc-800 border border-zinc-700 rounded-lg cursor-pointer"
              />

              <div className="h-52 rounded-xl overflow-hidden border border-zinc-700 bg-zinc-800 flex items-center justify-center">
                {frontendImage ? (
                  <img
                    src={frontendImage}
                    alt="profile-preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">
                    Image preview will appear here
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Button + Link */}
          <div className="flex flex-col gap-4 items-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 transition duration-300 
          py-3 rounded-xl font-semibold flex items-center justify-center cursor-pointer"
            >
              {loading ? (
                <ClipLoader color="white" size={25} />
              ) : (
                "Update Profile"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePanel;
