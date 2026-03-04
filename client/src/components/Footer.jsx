import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-black border-t border-white/10 py-4 md:py-8 text-center md:flex items-center justify-around">
      <div>
        <h3
          className="text-2xl font-extrabold 
        bg-linear-to-r from-red-500 to-pink-500 
        bg-clip-text text-transparent"
        >
          DevSocial
        </h3>

        <p className="text-gray-400 mt-3 text-sm md:block hidden">
          Built with ❤️ using MERN Stack
        </p>
      </div>

      <div>
        <p className="mt-4 text-sm text-gray-500">
          Designed & Developed by{" "}
          <span className="text-red-400 font-semibold hover:text-pink-500 transition cursor-pointer">
            <Link to={"https://www.linkedin.com/in/suraj-kumar-5b48b9254/"}>Suraj Kumar</Link>
          </span>
        </p>

        <p className="text-xs text-gray-600 mt-2">
          © {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
