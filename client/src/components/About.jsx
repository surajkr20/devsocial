import React from "react";

const About = () => {
  return (
    <section className="w-full bg-linear-to-b from-[#111] to-[#0d0d0d] py-4 mb-6 px-6 md:px-20 text-white">
      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Feature Card */}
        <div
          className="bg-zinc-900/60 backdrop-blur-md 
          border border-white/10 p-6 rounded-2xl 
          hover:scale-105 transition duration-300 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-red-400 mb-2">
            🔐 Authentication System
          </h3>
          <p className="text-gray-400 text-sm">
            Secure JWT-based authentication with login, signup, protected routes
            and profile management.
          </p>
        </div>

        <div
          className="bg-zinc-900/60 backdrop-blur-md 
          border border-white/10 p-6 rounded-2xl 
          hover:scale-105 transition duration-300 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-red-400 mb-2">
            📝 Post CRUD
          </h3>
          <p className="text-gray-400 text-sm">
            Create, edit, delete and like posts in real-time with dynamic feed
            updates.
          </p>
        </div>

        <div
          className="bg-zinc-900/60 backdrop-blur-md 
          border border-white/10 p-6 rounded-2xl 
          hover:scale-105 transition duration-300 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-red-400 mb-2">
            🔔 Real-Time Notifications
          </h3>
          <p className="text-gray-400 text-sm">
            Get instant notifications for likes and follows powered by
            Socket.io.
          </p>
        </div>

        <div
          className="bg-zinc-900/60 backdrop-blur-md 
          border border-white/10 p-6 rounded-2xl 
          hover:scale-105 transition duration-300 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-red-400 mb-2">
            👥 Follow System
          </h3>
          <p className="text-gray-400 text-sm">
            Follow developers, manage followers, and build your own network.
          </p>
        </div>

        <div
          className="bg-zinc-900/60 backdrop-blur-md 
          border border-white/10 p-6 rounded-2xl 
          hover:scale-105 transition duration-300 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-red-400 mb-2">
            📊 User Dashboard
          </h3>
          <p className="text-gray-400 text-sm">
            Personalized dashboard to manage profile, posts, and activity.
          </p>
        </div>

        <div
          className="bg-zinc-900/60 backdrop-blur-md 
          border border-white/10 p-6 rounded-2xl 
          hover:scale-105 transition duration-300 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-red-400 mb-2">
            ⚡ Modern MERN Stack
          </h3>
          <p className="text-gray-400 text-sm">
            Built using MongoDB, Express, React, Node.js with scalable backend
            architecture.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
