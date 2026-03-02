import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import axiosInstance from "../utils/axiosInstance";

export const PostContext = createContext();

const PostProvider = ({ children }) => {
  const { fetchUserPost } = useContext(AuthContext);
  const [allPost, setAllPost] = useState([]); // contains all global users post
  const [currentPost, setCurrentPost] = useState(null); // for manage post update(current post id)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState('');

  const fetchPost = async () => {
    try {
      setLoading(true);
      const result = await axiosInstance.get(`/api/posts/read` + '?page=' + page);
      setAllPost(result?.data?.post);
      setCount(result?.data?.count);
    } catch (error) {
      console.log("fetching post data error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [page]);

  const createPost = async (data) => {
    try {
      console.log("data from post creation provider: ", data);
      setLoading(true);
      const result = await axiosInstance.post(`/api/posts/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchPost(); // refresh home dashboard
      fetchUserPost(); // refresh user dashboard
    } catch (error) {
      console.log(`create post error from ui: ${error.message}`);
      toast.error("post creation error");
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (data, id) => {
    console.log(data, id);
    try {
      setLoading(true);
      const result = await axiosInstance.patch(
        `/api/posts/update/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      fetchPost();
      fetchUserPost();
      navigate("/");
      toast("post updated sucessfully!");
    } catch (error) {
      console.log(`update post error from ui: ${error}`);
      toast("post update error");
    } finally {
      setLoading(false);
    }
  };

  const currentPostData = async (id) => {
    try {
      const result = await axiosInstance.get(`/api/posts/current/${id}`);
      setCurrentPost(result.data);
    } catch (error) {
      console.log(`current post error from ui: ${error}`);
    }
  };

  const deletePost = async (id) => {
    try {
      await axiosInstance.delete(`/api/posts/delete/${id}`);
      fetchPost();
      fetchUserPost();
      toast("post deleted successfully..");
    } catch (error) {
      console.log(`delete post error from ui: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PostContext.Provider
        value={{
          fetchPost,
          allPost,
          loading,
          createPost,
          updatePost,
          currentPostData,
          currentPost,
          deletePost,
          setAllPost,
          setPage,
          page,
          count,
          setCount
        }}
      >
        {children}
      </PostContext.Provider>
    </div>
  );
};

export default PostProvider;
