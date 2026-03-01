import React, { useContext, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import { PostContext } from "../context/PostProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const navigate = useNavigate();

  const { createPost, loading } = useContext(PostContext);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", backendImage);
      formData.append("caption", caption);
      await createPost(formData);
      toast.success("post created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.log(`handle form error from createPost: ${error.message}`);
      toast.error("create post error");
    }
  };

  return (
    <div
      className="min-h-screen w-full 
                bg-linear-to-br from-[#1c1c1c] via-[#111] to-black 
                flex items-center justify-center px-4 relative"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6
               text-red-500 text-3xl 
               hover:scale-110 transition"
      >
        <IoArrowBackCircleOutline />
      </button>

      <form
        onSubmit={handleForm}
        className="w-full max-w-xl 
               backdrop-blur-xl bg-white/5 
               border border-white/10 
               rounded-2xl shadow-2xl 
               p-6 md:p-8 
               flex flex-col gap-6"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-white tracking-wide">
          Create New Post
        </h2>

        {/* Image Upload */}
        <div className="flex flex-col gap-3">
          <label className="text-sm text-gray-300 font-medium">
            Upload Image
          </label>

          <label
            className="w-full flex items-center justify-center 
                        border-2 border-dashed border-gray-600 
                        rounded-xl p-6 cursor-pointer 
                        hover:border-red-500 transition"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />

            <span className="text-gray-400 text-sm">
              Click to upload or drag & drop
            </span>
          </label>

          {/* Preview */}
          {frontendImage && (
            <div
              className="w-full rounded-xl overflow-hidden 
                        border border-white/10 shadow-lg"
            >
              <img
                src={frontendImage}
                alt="preview"
                className="w-full max-h-80 object-contain bg-black"
              />
            </div>
          )}
        </div>

        {/* Caption */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300 font-medium">Caption</label>
          <textarea
            required
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={4}
            placeholder="Write something amazing..."
            className="w-full rounded-xl 
                   bg-black/40 border border-white/10 
                   focus:border-red-500 
                   p-3 text-sm text-gray-200 
                   outline-none resize-none transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2.5 rounded-xl 
                 bg-linear-to-r from-red-500 to-pink-500 
                 text-white font-semibold 
                 hover:scale-[1.02] transition 
                 shadow-lg flex items-center justify-center"
        >
          {loading ? <ClipLoader color="white" size={22} /> : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
