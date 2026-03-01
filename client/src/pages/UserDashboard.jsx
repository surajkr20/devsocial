import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Header from "../components/Header";
import MyProfile from "../components/MyProfile";
import FeedPost from "../components/FeedPost";

const UserDashboard = () => {
  const { id } = useParams();
  const { findUserById, viewUser, viewUserPostById, viewUserPost } = useContext(AuthContext);

  useEffect(() => {
    findUserById(id);
    viewUserPostById(id);
  }, [id]);

  return (
    <div className="w-full min-h-screen flex flex-col gap-2 bg-linear-to-b from-[#111] to-[#0d0d0d]">
      <Header />

      <MyProfile currentUser={viewUser} currentUserPost={viewUserPost}/>

      <FeedPost post={viewUserPost} />
    </div>
  );
};

export default UserDashboard;
