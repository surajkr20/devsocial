import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ClipLoader } from "react-spinners";
import Header from "../components/Header";
import FeedPost from "../components/FeedPost";
import { PostContext } from "../context/PostProvider";
import MyProfile from "../components/MyProfile";

const MyDashboard = () => {
  const { userPost, user } = useContext(AuthContext);
  const { loading } = useContext(PostContext);

  return (
    <div className="w-full min-h-screen flex flex-col gap-2 bg-linear-to-b from-[#111] to-[#0d0d0d]">
      <Header />

      <MyProfile currentUser={user} currentUserPost={userPost} />

      <FeedPost post={userPost} />
    </div>
  );
};

export default MyDashboard;
