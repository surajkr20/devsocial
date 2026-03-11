import React, { lazy, Suspense, useContext, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { PostContext } from "../context/PostProvider";
import { AuthContext } from "../context/AuthProvider";
import socket from "../socket";
import axiosInstance from "../utils/axiosInstance";
import PagePagination from "./PagePagination";
import { useLocation } from "react-router-dom";
const PostCard = lazy(() => import("../components/PostCard"));

const FeedPost = ({ post, setUserPost }) => {
  const { loading, deletePost, setAllPost, setPage, count } =
    useContext(PostContext);
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // handle like count through socket(real-time)
  useEffect(() => {
    const handleLikeUpdate = (data) => {
      setAllPost((prevPosts) =>
        prevPosts.map((p) =>
          p._id === data.postId ? { ...p, likes: data.likes } : p,
        ),
      );
    };

    socket.on("likeUpdated", handleLikeUpdate);

    return () => {
      socket.off("likeUpdated", handleLikeUpdate);
    };
  }, [setUserPost, setAllPost]);

  const handleLike = async (postId) => {
    try {
      await axiosInstance.put(`/api/posts/${postId}/like`);
    } catch (error) {
      console.log(`handle like button error: ${error.message}`);
    }
  };

  return (
    <div className="w-full px-4 md:px-12 lg:px-20 py-8 flex flex-col gap-12">
      {!loading ? (
        <Suspense
          fallback={
            <div className="w-full flex justify-center">
              <ClipLoader color="red" size={35} />
            </div>
          }
        >
          <PostCard
            post={post}
            user={user}
            deletePost={deletePost}
            handleLike={handleLike}
          />
        </Suspense>
      ) : (
        <div className="w-full min-h-[80vh] flex items-center justify-center gap-2">
          <ClipLoader
            color="red"
            size={35}
            className="border-2 border-red-600 font-semibold"
          />
          <h2 className="text-xl font-bold text-white tracking-wide">
            Loading..
          </h2>
        </div>
      )}

      <div
        className={`w-full ${location.pathname === "/my-dashboard" ? "hidden" : "block"}`}
      >
        <PagePagination setPage={setPage} count={count} />
      </div>
    </div>
  );
};

export default FeedPost;
