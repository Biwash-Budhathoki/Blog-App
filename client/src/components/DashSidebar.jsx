import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { useSelector } from "react-redux";

export default function DashSidebar() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              className={` hover:bg-teal-300 hover:text-white hover:border-[1px] ${
                tab === "profile" ? "bg-teal-300 text-white" : ""
              } dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white dark:hover:border-[1px]  ${
                tab === "profile" ? "dark:bg-gray-800 text-white" : ""
              }`}
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>

          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item
              className={` hover:bg-teal-300 hover:text-white hover:border-[1px] ${
                tab === "posts" ? "bg-teal-300 text-white" : ""
              } dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white dark:hover:border-[1px]  ${
                tab === "posts" ? "dark:bg-gray-800 text-white" : ""
              }`}
                active={tab === 'posts'}
                icon={HiDocumentText}
                as='div'
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}

{currentUser.isAdmin && (
            <Link to='/dashboard?tab=users'>
              <Sidebar.Item
               className={` hover:bg-teal-300 hover:text-white hover:border-[1px] ${
                tab === "users" ? "bg-teal-300 text-white" : ""
              } dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white dark:hover:border-[1px]  ${
                tab === "users" ? "dark:bg-gray-800 text-white" : ""
              }`}
                active={tab === 'users'}
                icon={HiOutlineUserGroup}
                as='div'
              >
                Users
              </Sidebar.Item>
            </Link>
          )}

          <Sidebar.Item
            icon={HiArrowSmRight}
            onClick={handleSignout}
            className="hover:border-[1px] cursor-pointer hover:bg-teal-300 hover:text-white dark:text-gray-400 dark:hover:text-white dark:hover:border-[1px] dark:hover:bg-gray-800"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

