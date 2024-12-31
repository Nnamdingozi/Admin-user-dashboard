// 'use client';

// import React, { useEffect, useState } from 'react';
// import UserList from '@/app/components/User/UserList';
// import { useUserContext } from '@/app/context/userContext';

// const ViewUsersPage = () => {
//   const { fetchUsers, users, currentUser, removeUser, setUsers, token } = useUserContext();

//   const [isLocalStorageLoaded, setIsLocalStorageLoaded] = useState(false); // Track if users are loaded from localStorage

//   // Effect to load users from localStorage
//   useEffect(() => {
//     const storedUsers = localStorage.getItem('usersList');
//     if (storedUsers) {
//       setUsers(JSON.parse(storedUsers)); // Load users from localStorage
//       setIsLocalStorageLoaded(true); // Mark as loaded from localStorage
//     }
//   }, []); // Runs only once when the component mounts

//   // Effect to fetch users if not already loaded from localStorage or if `users` is empty
//   useEffect(() => {
//     const initializeUsers = async () => {
//       if (!isLocalStorageLoaded && (!users || users.length === 0)) {
//         await fetchUsers(); // Fetch users only if they are not loaded from localStorage
//       }
//     };
//     initializeUsers();
//   }, [isLocalStorageLoaded, users, token]); // Fetch users if necessary

//   // Handle delete user logic
//   const handleDelete = async (id: string | null | undefined) => {
//     if (!id) return;
//     try {
//       await removeUser(id); // Call removeUser from context
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };



//   if (!users) {
//     return <div className="text-center text-xl text-gray-600">Loading users...</div>;
//   }

//   return (
//     <div>
//       <UserList users={users} currentUser={currentUser} onDelete={handleDelete} />
//     </div>
//   );
// };

// export default ViewUsersPage;



'use client';

import React, { useEffect, useState } from 'react';
import UserList from '@/app/components/User/UserList';
import { useUserContext } from '@/app/context/userContext';

const ViewUsersPage = () => {
  const { fetchUsers, users, currentUser, removeUser, token } = useUserContext();

  
  useEffect(() => {
    
  fetchUsers(); // Fetch users only if they are not loaded from localStorage
      
    },

 [token]); // Fetch users if necessary

  // Handle delete user logic
  const handleDelete = async (id: string | null | undefined) => {
    if (!id) return;
    try {
      await removeUser(id); // Call removeUser from context
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };



  if (!users) {
    return <div className="text-center text-xl text-gray-600">Loading users...</div>;
  }

  return (
    <div>
      <UserList users={users} currentUser={currentUser} onDelete={handleDelete} />
    </div>
  );
};

export default ViewUsersPage;



