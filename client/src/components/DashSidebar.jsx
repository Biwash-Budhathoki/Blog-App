import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";


export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              className={` hover:bg-teal-300 hover:border-[1px] ${
                tab === "profile" ? "bg-teal-300 text-white" : ""
              } dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white dark:hover:border-[1px]  ${
                tab === "profile" ? "dark:bg-gray-800 text-white" : ""
              }`}
              active={tab === "profile"}
              icon={HiUser}
              label="User"
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>

          <Sidebar.Item
            icon={HiArrowSmRight}
            className="hover:border-[1px] cursor-pointer hover:bg-teal-300 hover:text-white dark:text-gray-400 dark:hover:text-white dark:hover:border-[1px] dark:hover:bg-gray-800"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

