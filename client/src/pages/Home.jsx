import React, { useContext } from "react";
import FeedPost from "../components/FeedPost";
import Header from "../components/Header";
import { PostContext } from "../context/PostProvider";
import { ClipLoader } from "react-spinners";
import About from "../components/About";
import Heading from "../components/Heading";

const Home = () => {
  const { allPost, loading } = useContext(PostContext);

  return (
    <div className="w-full min-h-screen flex flex-col gap-2 bg-linear-to-b from-[#111] to-[#0d0d0d]">
      <Header />
      <Heading />
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-4 w-full min-h-screen bg-black text-white">
          <h1 className="text-2xl font-bold text-red-500 tracking-wide">
            DevSocial
          </h1>

          <ClipLoader color="red" size={40} />

          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-300">
              Waking up the server...
            </h2>
            <p className="text-sm text-gray-500">
              Free hosting can take 20–40 seconds on first load.
            </p>
          </div>
        </div>
      ) : (
        <FeedPost post={allPost} />
      )}
      <About />
    </div>
  );
};

export default Home;
