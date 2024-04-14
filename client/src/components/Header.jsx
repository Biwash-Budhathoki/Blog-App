import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

const Header = () => {
  const path = useLocation().pathname;
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Biwash's
          </span>
          Blog
        </Link>

        <form className="md:inline">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 rounded-lg"
              />
              <AiOutlineSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
            </div>
          </form>

        <div className="hidden lg:flex items-center space-x-4">
   

          <Link to="/signin">
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Sign In
            </button>
          </Link>

          <button className="text-2xl">
            <FaMoon />
          </button>
        </div>

        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            &#9776;
          </button>
        </div>
      </div>

      {menuOpen &&(
        <div className="lg:hidden inline mt-4">
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
          </ul>
        </div>
      )}
       <div className="lg:inline hidden mx-8">
       <ul className="flex flex-row items-center space-x-4">
         <li>
           <Link to="/">Home</Link>
         </li>
         <li>
           <Link to="/about">About</Link>
         </li>
         <li>
           <Link to="/projects">Projects</Link>
         </li>
       </ul>
     </div>
    </nav>
  );
};

export default Header;
