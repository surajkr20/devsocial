import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { PostContext } from "../context/PostProvider";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Signup = () => {
  const { signup, loading, googleAuth } = useContext(AuthContext);
  const { fetchPost } = useContext(PostContext);
  const navigate = useNavigate();

  const [frontendImage, setFrontendImage] = useState("");
  const [backendImage, setBackendImage] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleFormData = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    if (backendImage) {
      formData.append("image", backendImage);
    }

    signup(formData);
    navigate("/my-dashboard");
    toast.success("User registered successfully");

    // reset form
    setName("");
    setEmail("");
    setPassword("");
    setBackendImage(null);
  };

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user?.getIdToken();

      await googleAuth(idToken);

      fetchPost();
      navigate("/my-dashboard");
      toast.success("Google Signup successful");
    } catch (error) {
      console.log(`signup with goole error from ui: ${error}`);
      toast.error("Google Signup Error!");
    }
  };

  return (
    <div
      className="min-h-screen bg-linear-to-br from-zinc-900 via-black to-zinc-950 
text-white flex items-center justify-center px-4 py-10 relative"
    >
      {/* Back Button */}
      <div
        className="fixed top-1.5 left-6 md:left-10 md:top-10 cursor-pointer group"
        onClick={() => navigate("/")}
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
          Create Your Account
        </h2>

        <form onSubmit={handleFormData} className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left - User Info */}
            <div className="flex flex-col gap-6 w-full">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Name</label>
                <input
                  required
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
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 
              text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400">Password</label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 
              text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                  placeholder="Create a password"
                />
              </div>
            </div>

            {/* Right - Profile Image */}
            <div className="flex flex-col gap-4 w-full">
              <label className="text-sm text-gray-400">Profile Image</label>

              <input
                onChange={handleImage}
                type="file"
                accept="image/*"
                className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
            file:rounded-lg file:border-0 
            file:text-sm file:font-semibold 
            file:bg-red-600 file:text-white 
            hover:file:bg-red-700 
            bg-zinc-800 border border-zinc-700 rounded-lg cursor-pointer"
              />

              <div
                className="h-52 rounded-xl overflow-hidden border border-zinc-700 
          bg-zinc-800 flex items-center justify-center"
              >
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
          py-3 rounded-xl font-semibold flex items-center justify-center"
            >
              {loading ? (
                <ClipLoader color="white" size={25} />
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>

        {/* O-Auth buttons */}
        <div className="w-full flex flex-col items-center gap-2 mt-4">
          <div className="w-full flex gap-4 items-center justify-between">
            <button
              onClick={handleGoogleAuth}
              type="submit"
              disabled={loading}
              className="w-full hover:bg-zinc-800 transition duration-300 cursor-pointer 
          py-3 rounded-xl font-semibold flex items-center justify-center border border-white"
            >
              {loading ? (
                <ClipLoader color="white" size={25} />
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-300 text-sm font-semibold">
                    Register with
                  </span>
                  <FcGoogle className="text-xl" />
                </div>
              )}
            </button>
          </div>
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link to={"/signin"} className="text-red-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
