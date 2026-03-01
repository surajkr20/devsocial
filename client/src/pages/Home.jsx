import React, { useContext } from "react";
import FeedPost from "../components/FeedPost";
import Header from "../components/Header";
import { PostContext } from "../context/PostProvider";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const { allPost, loading } = useContext(PostContext);

  return (
    <div className="w-full min-h-screen flex flex-col gap-2 bg-linear-to-b from-[#111] to-[#0d0d0d]">
      <Header />
      {loading ? (
        <div className="bg-[#1c1c1c] flex items-center justify-center w-full min-h-screen">
          <ClipLoader
            color="red"
            size={35}
            className="border-2 border-red-600 font-semibold"
          />
        </div>
      ) : (
        <FeedPost post={allPost}/>
      )}
    </div>
  );
};

export default Home;
