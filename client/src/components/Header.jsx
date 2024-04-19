import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import {  Dropdown } from "flowbite-react";
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';



const Header = () => {
  const path = useLocation().pathname;
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();


  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="border border-t-4 py-4">
      <div className="container mx-auto  flex items-center justify-around">
        <Link to="/" className="text-lg font-semibold">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Biwash's
          </span>
          Blog
        </Link>

        <form className="md:inline hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 rounded-lg"
              />
              <AiOutlineSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
            </div>
          </form>

          <div className="lg:inline hidden mx-8">
       <ul className="flex flex-row items-center space-x-4">
         <li>
           <Link className="hover:bg-gradient-to-r from-indigo-400 via-purple-300 to-green-300 rounded-md p-2" to="/" >Home</Link>
         </li>
         <li>
           <Link className="hover:bg-gradient-to-r from-indigo-400 via-purple-300 to-green-300 rounded-md p-2" to="/about">About</Link>
         </li>
         <li>
           <Link className="hover:bg-gradient-to-r from-indigo-400 via-purple-300 to-green-300 rounded-md p-2" to="/projects">Projects</Link>
         </li>
       </ul>
     </div>

        <div className=" md:flex items-center space-x-4 ">
   
      <button
  className='w-11 h-11  inline-flex justify-center items-center bg-gray-300 rounded-full dark:bg-white dark:text-black focus:outline-none'
  onClick={() => dispatch(toggleTheme())}
>
  {theme === 'light' ? <FaSun /> : <FaMoon />}
</button>
          {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
<img 
  alt='user' 
  src={currentUser.profilePicture} 
  className="rounded-full outline-none border-[1px] h-11 w-11 object-cover"
/>
 }
          >
            <Dropdown.Header className="dark:bg-black dark:text-white">
              <span className='block text-sm text-black dark:text-white'>@{currentUser.username}</span>
              <span className='block text-sm text-black font-medium truncate dark:text-white'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item className="text-black bg-gray-200 hover:border-[1px] border-teal-300 hover:bg-teal-300 dark:bg-black dark:text-white dark:hover:border-[1px]">Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item className="text-black  bg-gray-200 hover:border-[1px] border-teal-300 hover:bg-teal-300 dark:bg-black dark:text-white dark:hover:border-[1px]" >Sign out</Dropdown.Item>
          </Dropdown>
        ) :(
          <Link to="/signin">
            <button className="text-white px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Sign In
            </button>
          </Link>
        )}

         
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
              <Link className="hover:bg-gradient-to-r from-indigo-400 via-purple-300 to-green-300 rounded-md p-2" to="/">Home</Link>
            </li>
            <li>
              <Link className="hover:bg-gradient-to-r from-indigo-400 via-purple-300 to-green-300 rounded-md p-2" to="/about">About</Link>
            </li>
            <li>
              <Link className="hover:bg-gradient-to-r from-indigo-400 via-purple-300 to-green-300 rounded-md p-2" to="/projects">Projects</Link>
            </li>
          </ul>
        </div>
      )}
    
    </nav>
  );
};

export default Header;
