// 'use client';
// import React, { useEffect } from 'react';
// import UserList from '@/app/components/User/UserList';
// import { useUserContext } from '@/app/context/userContext';

// const ViewUsersPage = () => {
//   const { fetchUsers, token, users, loading, error } = useUserContext();
  
//   useEffect(() => {
//     if (token && (!users || users.length === 0)) {
//       fetchUsers(); // Fetch users only if not already in state or the array is empty
//     }
//   }, [users]); 
 
//   if (loading) {
//     return <div className="text-center text-xl text-gray-600">Loading users...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-xl text-red-600">Error: {error}</div>;
//   }

//   return (
//     <div>
//       <UserList users={users} />
//     </div>
//   );
// };

// export default ViewUsersPage;



'use client';
import React, { useEffect } from 'react';
import UserList from '@/app/components/User/UserList';
import { useUserContext } from '@/app/context/userContext';

const ViewUsersPage = () => {
  const { fetchUsers, users, currentUser, removeUser } = useUserContext();

  useEffect(() => {
    if (!users || users.length === 0) {
      fetchUsers(); // Fetch from API only if users is not already loaded
    }
  }, []); // Fetch on initial render only


  const flattenedUsers = users?.map((user: any) => ({
    id: user.id,
    username: user.user.username,  // Assuming the structure has 'user' object with 'username'
    email: user.user.email,
    role: user.user.role,
    privacyPolicy: user.user.privacyPolicy,
  }));

  console.log('Flattened Users list:', flattenedUsers);  // Log the flattened user data

  if (!users) {
    return <div className="text-center text-xl text-gray-600">Loading users...</div>;
  }
console.log('users list in page:', users)

const handleDelete = async (id: string | null | undefined) => {
  if (!id) return;
  try {
    await removeUser(id); // Call deleteUser from context
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}


  return (
    <div>
      <UserList users={flattenedUsers} currentUser={currentUser} onDelete={handleDelete} />
    </div>
  );
};

export default ViewUsersPage;

