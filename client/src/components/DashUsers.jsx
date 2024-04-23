import { Modal, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mx-auto border: overflow-x-scroll p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <table className="table-auto shadow-md mx-auto w-full text-center">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="px-11 py-6">Date created</th>
                <th className="px-11 py-6">User image</th>
                <th className="px-11 py-6">Username</th>
                <th className="px-11 py-6">Email</th>
                <th className="px-11 py-6">Admin</th>
                <th className="px-11 py-6">Delete</th>
                <th className="px-11 py-6">Edit</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="divide-y bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <td className="px-11 py-6">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-11 py-6">
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-12 h-12 object-cover bg-gray-500 rounded-full"
                    />
                  </td>
                  <td className="px-11 py-6">{user.username}</td>
                  <td className="px-11 py-6">{user.email}</td>
                  <td className="px-11 py-6">
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </td>
                  <td className="px-11 py-6">
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </td>
                  <td className="px-11 py-6">
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-user/${user._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p className="text-center text-lg font-semibold">
          You have no users yet!
        </p>
      )}

<Modal
  show={showModal}
  onClose={() => setShowModal(false)}
  popup
  size="md"
  className="dark:bg-black"
>
  <Modal.Header />
  <Modal.Body>
    <div className="text-center">
      <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
      <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
        Are you sure you want to delete your user?
      </h3>
      <div className="flex justify-center gap-4">
        <Button
          className="text-red-600"
          color="failure"
          onClick={handleDeleteUser}
        >
          Yes, I'm sure
        </Button>
        <Button color="gray" onClick={() => setShowModal(false)}>
          No, cancel
        </Button>
      </div>
    </div>
  </Modal.Body>
</Modal>
    </div>
  );
}
