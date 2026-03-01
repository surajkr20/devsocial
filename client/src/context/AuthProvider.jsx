import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import socket from "../socket.js";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [viewUser, setViewUser] = useState(null);
  const [viewUserPost, setViewUserPost] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFollow, setIsFollow] = useState(false);

  // -------------------------
  // Fetch User Posts for current authenticated user
  // -------------------------
  const fetchUserPost = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/users/post`);
      setUserPost(data?.posts || []);
    } catch (err) {
      console.log("Fetch user post error:", err.message);
    }
  };

  // -------------------------
  // Check Authenticated User (on app load)
  // -------------------------
  const fetchAuthenticatedUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await axiosInstance.get("/api/users/current");

      if (result.data) {
        setUser(result.data?.user);
        setIsAuthenticated(true);
        fetchUserPost(); // fetch posts only if user exists
      }
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // find user by id
  const findUserById = async (id) => {
    try {
      setLoading(true);
      setError(true);
      const result = await axiosInstance.get(`/api/users/find-user/${id}`);
      setViewUser(result.data);
    } catch (error) {
      console.error(`error in the findUserById: ${error}`);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // fetch all db users
  const AllDBusers = async () => {
    try {
      setLoading(true);
      const result = await axiosInstance.get(`/api/users/all`);
      setAllUsers(result.data?.users);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  // When user logs in → joins personal room, When logout → you can disconnect if needed
  useEffect(() => {
    console.log("user connected through socket", socket.connected);
    if (user?._id) {
      socket.emit("join", user._id);
    }
  }, [user]);

  const viewUserPostById = async (id) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/api/users/view-posts/${id}`);
      setViewUserPost(data?.posts || []);
    } catch (error) {
      console.log("view user post error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // follow unfollow api calling
  const followToggleFunction = async (id) => {
    try {
      const { data } = await axiosInstance.post(`/api/users/${id}/follow`);

      setIsFollow(data.isFollowing);
      findUserById(id);
      fetchAuthenticatedUser();
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // -------------------------
  // Register
  // -------------------------
  const signup = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axiosInstance.post("/api/auth/sign-up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(data?.user);
      setIsAuthenticated(true);
      await fetchUserPost();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Login
  // -------------------------
  const signin = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axiosInstance.post("/api/auth/sign-in", formData);
      setUser(data.user);
      setIsAuthenticated(true);
      await fetchUserPost();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // update user profile
  const updateUserProfile = async (formData) => {
    try {
      setLoading(true);
      const res = await axiosInstance.put("/api/users/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(res.data?.user);
      await fetchUserPost();
      toast.success(res.data?.message);

      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Google Auth
  // -------------------------
  const googleAuth = async (idToken) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axiosInstance.post("/api/auth/google", {
        idToken,
      });

      setUser(data.user);
      setIsAuthenticated(true);
      await fetchUserPost();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Logout
  // -------------------------
  const signout = async () => {
    try {
      setLoading(true);
      await axiosInstance.get("/api/auth/sign-out");

      setUser(null);
      setUserPost([]);
      setIsAuthenticated(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userPost,
        loading,
        error,
        isAuthenticated,
        signup,
        signin,
        googleAuth,
        signout,
        fetchUserPost,
        updateUserProfile,
        allUsers,
        fetchAuthenticatedUser,
        findUserById,
        viewUser,
        viewUserPostById,
        viewUserPost,
        AllDBusers,
        followToggleFunction,
        isFollow,
        setIsFollow,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
