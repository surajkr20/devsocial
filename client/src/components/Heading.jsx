import React from "react";

const Heading = () => {
  return (
    <>
      {/* Heading */}
      <div className="text-center mb-2 mt-4">
        <h2
          className="text-4xl md:text-5xl font-extrabold 
          bg-linear-to-r from-red-500 to-pink-500 
          bg-clip-text text-transparent"
        >
          What is DevSocial?
        </h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
          DevSocial is a modern full-stack social networking platform built for
          developers to connect, share posts, follow each other, and receive
          real-time notifications.
        </p>
      </div>
    </>
  );
};

export default Heading;
