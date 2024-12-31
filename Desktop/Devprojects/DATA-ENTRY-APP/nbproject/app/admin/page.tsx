// 'use client';

// import { useUserContext } from '@/app/context/userContext';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useEffect } from 'react';

// const AdminDashboardPage = () => {
//   const { setUsers, saveToken, currentUser, token, logout, fetchUsers, loading, users } = useUserContext();
//   const router = useRouter();

//   // Fetch users from API, only if they are not already in the state
//   const fetchUsersList = async () => {
//     if (users && users.length > 0) {
//       console.log('Using existing users from state.');
//       return;
//     }

//     if (!token) {
//       console.error('Token is missing');
//       return;
//     }

//     try {
//       const fetchedUsers = await fetchUsers();
//       console.log('Fetched users: in admin page', fetchedUsers);
//     } catch (err) {
//       console.error('Unable to fetch users list', err);
//     }
//   };

//   // Check and load users when the component mounts
//   useEffect(() => {
//     if (!users || users.length === 0) {
//       fetchUsersList();
//     }
//   }, [users]);

//   // Handle logout
//   const handleLogout = () => {
//     logout();
//     router.push('/');
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!currentUser) {
//     return <p>Redirecting...</p>;
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen relative">
//       <div className="absolute top-7 right-6">
//         <Link href="/userEdit" className="text-lg font-bold text-blue-500 hover:text-yellow-700">
//           Edit Profile
//         </Link>
//       </div>

//       <h1>Welcome, {currentUser.username}!</h1>
//       <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

//       <div className="flex space-x-4">
//         <Link href="/admin/usersList">
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//             View All Users
//           </button>
//         </Link>
//         <Link href="/accessLogListView">
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//             View All Logs
//           </button>
//         </Link>
//       </div>

//       <button
//         onClick={handleLogout}
//         className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default AdminDashboardPage;



'use client';

import { useUserContext } from '@/app/context/userContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AdminDashboardPage = () => {
  const { logout, currentUser, loading } = useUserContext();
  const router = useRouter();

  // Handle logout
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!currentUser) {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <div className="absolute top-7 right-6">
        <Link href="/userEdit" className="text-lg font-bold text-blue-500 hover:text-yellow-700">
          Edit Profile
        </Link>
      </div>

      <h1>Welcome, {currentUser.username}!</h1>
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      <div className="flex space-x-4">
        <Link href="/admin/usersList">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View All Users
          </button>
        </Link>
        <Link href="/accessLogListView">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View All Logs
          </button>
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboardPage;
