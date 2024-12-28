

import React from 'react';
import Link from 'next/link';
import { User } from '@/app/utilities/definitions';

interface UserViewProps {
  user: User;
}

const UserView: React.FC<UserViewProps> = ({ user }) => {
  return (
    <div className="relative flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md">
      {/* Profile Picture */}
      <div className="absolute top-0 left-0 flex items-center justify-center h-24 w-24 bg-blue-700 text-white rounded-full shadow-md">
        <span className="text-xs">Profile</span>
      </div>
      
      {/* User Info */}
      <div className="mt-16 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">{user.user.username}</h2>
        <p className="text-gray-600 mb-3">Email: {user.user.email}</p>
        <p className="text-gray-600 mb-3">Role: {user.user.role}</p>
      </div>

      {/* Back to List Link */}
      <Link
        href="/admin/usersList"
        className="mt-4 text-blue-600 hover:underline"
      >
        Back to List
      </Link>
    </div>
  );
};

export default UserView;


















// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { User } from '@/app/utilities/definitions';


// interface UserViewProps {
//   user: User;

// }

// const UserView: React.FC<UserViewProps> = ({ user}) => {
  
//   return (
//     <div className="user-view">
//       <div className='border-2 border-blue-700 rounded-3xl h-10 w-10'><p>Users Profile picture</p></div>
//       <h2>{user.user.username}</h2>
//       <p>Email: {user.user.email}</p>
//       <Link href={"/admin/usersList"}>Back to List</Link>
//     </div>
//   );
// }

// export default UserView;


// import React from 'react';
// import Link from 'next/link';
// import { UserProfile } from '@/app/utilities/definitions';

// interface UserViewProps {
//   user: UserProfile;
// }

// const UserView: React.FC<UserViewProps> = ({ user }) => {
//   return (
//     <div className="user-view">
//       <div className="border-2 border-blue-700 rounded-3xl h-10 w-10">
//         <p>Users Profile picture</p>
//       </div>
//       <h2>{user.username}</h2>
//       <p>Email: {user.email}</p>
//       <Link href="/admin/usersList">Back to List</Link>
//     </div>
//   );
// };

// export default UserView;
