import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { PostContext } from "../context/PostProvider";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../firebase";

const SignIn = () => {
  const { loading, signin, googleAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { fetchPost } = useContext(PostContext);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      await signin({ email, password });
      await fetchPost();
      toast.success("user login successfully");
      navigate("/my-dashboard");
    } catch (error) {
      console.log(`error into sign-in from ui: ${error.message}`);
      toast.error("sign-in error");
    }
  };

  const handleGoogleAuth = async (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user?.getIdToken();

      await googleAuth(idToken);

      await fetchPost();
      navigate("/my-dashboard");
      toast.success("Google Login successful");
    } catch (error) {
      console.log(`signup with goole error from ui: ${error}`);
      toast.error("Google Login Error!");
    }
  };

  return (
    <div
      className="min-h-screen bg-linear-to-br from-zinc-900 via-black to-zinc-950 
text-white flex items-center justify-center px-4 relative"
    >
      {/* Back Button */}
      <div
        className="absolute top-6 left-6 md:left-10 md:top-10 cursor-pointer group"
        onClick={() => navigate("/")}
      >
        <IoArrowBackCircleOutline
          className="text-4xl text-red-500 bg-white rounded-full 
    group-hover:scale-110 transition duration-300"
        />
      </div>

      {/* Login Card */}
      <div
        className="w-full max-w-md bg-zinc-900/70 backdrop-blur-md 
  border border-zinc-800 rounded-2xl shadow-2xl p-6 md:p-8"
      >
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-red-500 mb-8">
          Login into your account
        </h2>

        <form onSubmit={handleForm} className="flex flex-col gap-6">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="Enter your email"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 
          text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 
          transition duration-200"
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
              placeholder="Enter your password"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 
          text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 
          transition duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition duration-300 
        py-3 rounded-xl font-semibold flex items-center justify-center cursor-pointer"
          >
            {loading ? <ClipLoader color="white" size={25} /> : "Login"}
          </button>
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
                    Login with
                  </span>
                  <FcGoogle className="text-xl" />
                </div>
              )}
            </button>
          </div>
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-red-500 hover:underline">
              Sign Up Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
