import React, { useContext } from "react";
import FeedPost from "../components/FeedPost";
import Header from "../components/Header";
import { PostContext } from "../context/PostProvider";
import { ClipLoader } from "react-spinners";
import About from "../components/About"
import Heading from "../components/Heading";

const Home = () => {
  const { allPost, loading } = useContext(PostContext);

  return (
    <div className="w-full min-h-screen flex flex-col gap-2 bg-linear-to-b from-[#111] to-[#0d0d0d]">
      <Header />
      <Heading/>
      {loading ? (
        <div className="text-white flex items-center justify-center gap-3 w-full min-h-screen">
          <ClipLoader
            color="red"
            size={35}
            className="border-2 border-red-600 font-semibold"
          />
          <h2>Loading...</h2>
        </div>
      ) : (
        <FeedPost post={allPost}/>
      )}
      <About/>
    </div>
  );
};

export default Home;
