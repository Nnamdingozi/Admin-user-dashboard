// // "use client";

// // import { useUserContext } from "@/app/context/userContext";
// // import { useRouter } from "next/navigation";
// // import Link from "next/link";
// // const AdminDashboard = () => {
// //   const { logout, fetchUsers, currentUser } = useUserContext(); // Access logout from the context
// //   const router = useRouter(); // For any redirection, if needed (already in the context function)

// //   const handleLogout = () => {
// //     logout();
// //     router.push('/')
// //   };



// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen">


// //       <h1>Welcome {currentUser!.username}</h1>
// //       <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
// //       <div className="flex">
// //         <Link href={'/viewUsers'} ><button>View all Users</button></Link>
// //         <Link href={'/viewLogs'}><button>View all logs</button></Link>

// //       </div>
// //       <button
// //         onClick={handleLogout}
// //         className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300"
// //       >
// //         Logout
// //       </button>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;




// "use client";

// import { useUserContext } from "@/app/context/userContext";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { useEffect } from "react";

// const AdminDashboard = () => {
//   const { logout, currentUser, token } = useUserContext();
//   const router = useRouter();

//   // Redirect to login if no token is found
//   useEffect(() => {
//     const savedUser = localStorage.getItem('currentUser')
//     const storedToken = localStorage.getItem('token');

//     if (!savedUser && storedToken) {
//       router.push("/user/login");
//     }
//   }, [token, router]);

//   const handleLogout = () => {
//     logout();
//     router.push("/");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       {currentUser ? (
//         <>
//           <h1>Welcome {currentUser.username}</h1>
//           <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
//           <div className="flex space-x-4">
//             <Link href="/admin/usersList">
//               <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//                 View all Users
//               </button>
//             </Link>
//             <Link href="/admin/viewLogs">
//               <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//                 View all Logs
//               </button>
//             </Link>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300"
//           >
//             Logout
//           </button>
//         </>
//       ) : (
//         <p>Loading user details...</p>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;



// 'use client';

// import { useUserContext } from '@/app/context/userContext';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useEffect } from 'react';

// const AdminDashboardPage = () => {
//   const { currentUser, token, logout, fetchUsers, loading, users } = useUserContext();
//   const router = useRouter();

//   useEffect(() => {
//     if (!token || !currentUser) {
//       router.push('/'); // Redirect to login if user or token is missing
//     } else {
//       fetchUsers(); // Fetch user list if valid token
//     }
//   }, [token, currentUser, router]);

//   const handleLogout = () => {
//     logout();
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!currentUser) {
//     return <p>Redirecting...</p>;
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen relative ">
//       <div className='absolute top-7 right-6'>
//         <Link href="/admin/userEdit" className="text-lg font-bold text-blue-500 hover:text-yellow-700">Edit Profile</Link>
//       </div>

//       <h1>Welcome, {currentUser.username}!</h1>
//       <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
     
//       <div className="flex space-x-4">
//         <Link href="/admin/usersList">
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//             View All Users
//           </button>
//         </Link>
//         <Link href="/admin/viewLogs">
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
import { useEffect } from 'react';

const AdminDashboardPage = () => {
  const { setUsers, saveToken,  currentUser, token, logout, fetchUsers, loading, users} = useUserContext();
  const router = useRouter();

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedCurrentUser = localStorage.getItem('currentUser');
    const storedUserList = localStorage.getItem('userList');
    const storedToken = localStorage.getItem('token');

    if (storedCurrentUser && token) {
      const currentUserParsed = JSON.parse(storedCurrentUser)
      saveToken(storedToken!, currentUserParsed)
    }
    if (storedUserList) {
      setUsers(JSON.parse(storedUserList));
    }
    
    
  }, []);

  // Fetch users from API, only if they are not already in the state
  const fetchUsersList = async () => {
    if (users.length > 0) {
      console.log('Using existing users from state.');
      return; // No need to fetch if users already exist
    }

    if (!token) {
      console.error('Token is missing');
      return;
    }

    try {
      const fetchedUsers = await fetchUsers(); // Assuming fetchUsers uses the token to fetch data
      console.log('Fetched users:', fetchedUsers);

    } catch (err) {
      console.error('Unable to fetch users list', err);
    }
  };

  // Use the effect to fetch users only if they're not in state (or localStorage)
  useEffect(() => {
    if (users.length === 0) {
      fetchUsersList(); // Fetch users if they don't exist in state
    }
  }, [users]);

  const handleLogout = () => {
    logout(); // Assuming logout clears the user context and localStorage
    router.push('/'); // Redirect to login page after logout
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
        <Link href="/userEdit" className="text-lg font-bold text-blue-500 hover:text-yellow-700">Edit Profile</Link>
      </div>

      <h1>Welcome, {currentUser.username}!</h1>
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      <div className="flex space-x-4">
        <Link href="/admin/usersList">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View All Users
          </button>
        </Link>
        <Link href="/admin/viewLogs">
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
