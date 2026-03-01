import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { PostContext } from "../context/PostProvider";
import { FaPen } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import socket from "../socket";
import axiosInstance from "../utils/axiosInstance";

const FeedPost = ({ post }) => {
  const navigate = useNavigate();
  const { loading, deletePost, setAllPost } = useContext(PostContext);
  const { user } = useContext(AuthContext);

  // handle like count through socket(real-time)
  useEffect(() => {
    socket.on("likeUpdated", (data) => {
      setAllPost((prevPosts) =>
        prevPosts.map((p) =>
          p._id === data.postId ? { ...p, likes: data.likes } : p,
        ),
      );
    });

    return () => {
      socket.off("likeUpdated");
    };
  }, []);

  const handleLike = async (postId) => {
    try {
      await axiosInstance.put(`/api/posts/${postId}/like`);
    } catch (error) {
      console.log(`handle like button error: ${error.message}`);
    }
  };

  return (
    <div className="w-full px-4 md:px-12 lg:px-20 py-8">
      {!loading ? (
        <div
          className="grid gap-8 
                  grid-cols-1 
                  sm:grid-cols-2 
                  lg:grid-cols-3 
                  xl:grid-cols-4"
        >
          {user && post.length == 0 && (
            <div className="w-full flex items-center justify-center md:ml-[25vw] lg:ml-[35vw]">
              <div className="flex flex-col items-center justify-center gap-1.5 bg-zinc-800 px-8 py-6 shadow-2xl rounded-md">
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  No any post created!
                </h2>
                <Link
                  to={"/create"}
                  className="w-full py-2.5 rounded-xl 
                             bg-linear-to-r from-red-500 to-pink-500 
                             text-white font-semibold 
                             hover:scale-[1.02] transition 
                             shadow-lg flex items-center justify-center"
                >
                  Create Post
                </Link>
              </div>
            </div>
          )}

          {post?.map((data) => {
            const liked = data?.likes?.some(
              (id) => id.toString() === user?._id?.toString(),
            );

            return (
              <div
                key={data._id}
                className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Post owner information */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src={data.user?.image}
                      alt="user-dp"
                      className="w-10 h-10 rounded-full object-cover border-2 border-red-500/60"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-200">
                        {data.user?.name}
                      </span>
                      <span className="text-xs text-gray-400 truncate">
                        {data.user?.email}
                      </span>
                    </div>
                  </div>

                  {user && (
                    <div className="flex items-center gap-2">
                      {liked ? (
                        <FaHeart
                          onClick={() => handleLike(data._id)}
                          className="text-2xl cursor-pointer text-red-600 hover:scale-110 transition"
                        />
                      ) : (
                        <FaRegHeart
                          onClick={() => handleLike(data._id)}
                          className="text-2xl text-gray-400 cursor-pointer hover:text-red-500 hover:scale-110 transition"
                        />
                      )}

                      <div className="flex gap-1 items-center">
                        <span className="text-[10px] text-gray-500">Likes</span>
                        <span className="text-sm text-gray-400">
                          {data?.likes?.length}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative w-full aspect-square bg-black/20 overflow-hidden">
                  {user?._id === data?.user?._id && (
                    <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition">
                      <button
                        className="p-2 bg-white/80 hover:bg-white rounded-full transition"
                        onClick={() => navigate(`/update/${data._id}`)}
                      >
                        <FaPen className="text-red-600 text-sm" />
                      </button>

                      <button
                        className="p-2 bg-white/80 hover:bg-white rounded-full transition"
                        onClick={() => deletePost(data._id)}
                      >
                        <FaTrashCan className="text-red-600 text-sm" />
                      </button>
                    </div>
                  )}

                  <img
                    src={data?.image}
                    alt="post"
                    className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                    {data.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
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
    </div>
  );
};

export default FeedPost;
