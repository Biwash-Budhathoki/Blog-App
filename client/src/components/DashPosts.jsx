import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  console.log(userPosts);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  return (
    <div className='mx-auto border: overflow-x-scroll p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <table className='table-auto shadow-md mx-auto w-full text-center'>
          <thead className='bg-gray-200 dark:bg-gray-700'>
            <tr>
              <th className='px-11 py-6'>Date updated</th>
              <th className='px-11 py-6'>Post image</th>
              <th className='px-11 py-6'>Post title</th>
              <th className='px-11 py-6'>Category</th>
              <th className='px-11 py-6'>Delete</th>
              <th className='px-11 py-6'>Edit</th>
            </tr>
          </thead>
          <tbody>
            {userPosts.map((post) => (
              <tr key={post._id} className='divide-y bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600'>
                <td className='px-11 py-6'>{new Date(post.updatedAt).toLocaleDateString()}</td>
                <td className='px-11 py-6'>
                  <Link to={`/post/${post.slug}`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className='w-20 h-10 object-cover bg-gray-500'
                    />
                  </Link>
                </td>
                <td className='px-11 py-6'>
                  <Link
                    className='font-medium text-gray-900 dark:text-white'
                    to={`/post/${post.slug}`}
                  >
                    {post.title}
                  </Link>
                </td>
                <td className='px-11 py-6'>{post.category}</td>
                <td className='px-11 py-6'>
                  <span className='font-medium text-red-500 hover:underline cursor-pointer'>
                    Delete
                  </span>
                </td>
                <td className='px-11 py-6'>
                  <Link
                    className='text-teal-500 hover:underline'
                    to={`/update-post/${post._id}`}
                  >
                    <span>Edit</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='text-center text-lg font-semibold'>You have no posts yet!</p>
      )}
    </div>
  );
}