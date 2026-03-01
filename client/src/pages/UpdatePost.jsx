import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../context/PostProvider";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = () => {
  const { updatePost, loading, currentPostData, currentPost } =
    useContext(PostContext);
  const [caption, setCaption] = useState();
  const [frontendImage, setFrontendImage] = useState("");
  const [backendImage, setBackendImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    currentPostData(id); // calling function in the context(thats calling currentpost api)
  }, [id]);

  useEffect(() => {
    if (currentPost) {
      setCaption(currentPost?.caption || "");
      setFrontendImage(currentPost?.image || "");
    }
  }, [currentPost]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("caption", caption);

      if (backendImage) {
        formData.append("image", backendImage);
      }

      await updatePost(formData, id);
    } catch (error) {
      console.log(`handle form error from update post: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-900 via-black to-zinc-950 text-white flex items-center justify-center px-4 py-10 relative">
      {/* Back Button */}
      <div
        className="fixed top-1 left-6 md:left-10 md:top-10 cursor-pointer group"
        onClick={() => navigate("/")}
      >
        <IoArrowBackCircleOutline className="text-4xl text-red-500 bg-white rounded-full group-hover:scale-110 transition duration-300" />
      </div>

      {/* Card Container */}
      <div className="w-full max-w-2xl bg-zinc-900/70 backdrop-blur-md border border-zinc-800 rounded-2xl shadow-2xl p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-red-500 mb-8">
          Update Your Post
        </h2>

        <form onSubmit={handleForm} className="flex flex-col gap-8">
          {/* Image Upload */}
          <div className="flex flex-col gap-3">
            <label className="text-sm text-gray-400">Change Image</label>

            <input
              onChange={handleImage}
              type="file"
              accept="image/*"
              className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
          file:rounded-lg file:border-0 
          file:text-sm file:font-semibold 
          file:bg-red-600 file:text-white 
          hover:file:bg-red-700 
          bg-zinc-800 border border-zinc-700 rounded-lg cursor-pointer"
            />

            {frontendImage && (
              <div className="w-full mt-3 rounded-xl overflow-hidden border border-zinc-700">
                <img
                  src={frontendImage}
                  alt="preview"
                  className="w-full max-h-96 object-contain bg-black"
                />
              </div>
            )}
          </div>

          {/* Caption */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Caption</label>

            <textarea
              required
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={4}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 
          text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 
          transition duration-200 resize-none"
              placeholder="Update your caption..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 transition duration-300 
        py-3 rounded-xl font-semibold text-sm md:text-base 
        flex items-center justify-center"
          >
            {loading ? <ClipLoader color="white" size={25} /> : "Update Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
