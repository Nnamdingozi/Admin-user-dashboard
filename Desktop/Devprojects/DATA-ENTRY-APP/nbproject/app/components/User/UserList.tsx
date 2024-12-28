// // import React from 'react';
// // import Link from 'next/link';
// // import { User } from '@/app/utilities/definitions';  // Assuming the correct path for your User type

// // // Define the type for the component props
// // interface UserListProps {
// //   users: User[] | []; // `undefined` in case the users haven't been fetched yet
// // }

// // const UserList: React.FC<UserListProps> = ({ users }) => {
// //   if (!users) {
// //     return <div>Loading users...</div>; // or another fallback UI
// //   }

// //   return (
// //     <div className="max-w-4xl mx-auto p-6 w-full">
// //       <h2 className="text-3xl font-semibold mb-6 text-center">Users</h2>
// //       <div className="text-center mb-4">
// //         <Link href="/register" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add New User</Link>
// //       </div>
// //       <ul className="space-y-4 w-full">
// //         {users.map(user => (
// //           <li key={user.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:bg-gray-100 w-full">
// //             <div className='flex  justify-between align-middle w-[60%] mr-8'>
// //               <h3 className="text-xl font-semibold">{user.user.username}</h3> 
// //               <p className="text-sm text-gray-500">email: {user.user.email}</p> 
              
           
// //             </div>
// //             <div className="flex space-x-4">
// //               <Link href={`/admin/userView/${user.id}`} className="text-blue-500 hover:text-blue-700">View</Link>
// //               <Link href={`/userEdit/${user.id}`} className="text-yellow-500 hover:text-yellow-700">Edit</Link>
// //               <Link href={`/userRemove/${user.id}`} className="text-red-500 hover:text-red-700">Remove</Link>
// //               <Link href={`/accessLogView/${user.id}`} className="text-red-500 hover:text-red-700">View Log</Link>
// //             </div>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default UserList;



// import React from 'react';
// import Link from 'next/link';
// import { User, UserProfile } from '@/app/utilities/definitions';  // Assuming the correct path for your User type

// // Define the type for the component props
// interface UserListProps {
//   users: UserProfile[] | []; // `undefined` in case the users haven't been fetched yet
//   currentUser: UserProfile | null
// }

// const UserList: React.FC<UserListProps> = ({ users, currentUser }) => {
//   if (!users) {
//     return <div>Loading users...</div>; // or another fallback UI
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 w-full">
//       <h2 className="text-3xl font-semibold mb-6 text-center">Users</h2>
//       <div className="text-center mb-4">
//         <Link href="/register" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add New User</Link>
//       </div>
    
//       <ul className="space-y-4 w-full">
//         {users.map(user => (
//           <li key={user.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:bg-gray-100 w-full">
//             <div className='flex justify-between align-middle w-[60%] mr-8'>
//               <h3 className="text-xl font-semibold">{user.username}</h3>
//               <p className="text-sm text-gray-500">email: {user.email}</p>
//             </div>
//             <div className="flex space-x-4">
//               {/* View link with validation */}
//               <Link
//                 href={user.id ? `/admin/userView/${encodeURIComponent(user.id)}` : '#'}
//                 className={`text-blue-500 hover:text-blue-700 ${
//                   !user.id && 'pointer-events-none text-gray-400'
//                 }`}
//               >
//                 View
//               </Link>
             
//               {/* Remove link */}
//               <Link href={`/userRemove/${user.id}`} className="text-red-500 hover:text-red-700">
//                 Remove
//               </Link>
//               {/* Access log link */}
//               <Link href={`/accessLogView/${user.id}`} className="text-red-500 hover:text-red-700">
//                 View Log
//               </Link>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;



import React from 'react';
import Link from 'next/link';
import { UserProfile } from '@/app/utilities/definitions';  // Assuming the correct path for your UserProfile type

// Define the type for the component props
interface UserListProps {
  users: UserProfile[]; // Expecting an array of UserProfile objects
  currentUser: UserProfile | null; // Assuming currentUser might be used for some logic
  onDelete: (id: string | null | undefined) => void;
}

const UserList: React.FC<UserListProps> = ({ users, currentUser, onDelete }) => {
  if (users.length === 0) {
    return <div>Loading users...</div>; // Handle empty users array as loading state
  }
console.log('users in userList component:', users)
  return (
    <div className="max-w-4xl mx-auto p-6 w-full">
      <h2 className="text-3xl font-semibold mb-6 text-center">Users</h2>
      <div className="text-center mb-4">
        <Link href="/register" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Add New User
        </Link>
      </div>
    
      <ul className="space-y-4 w-full">
        {users.map(user => (
          <li key={user.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:bg-gray-100 w-full">
            <div className="flex justify-between align-middle w-[60%] mr-8">
              <h3 className="text-xl font-semibold">{user.username}</h3>
              <p className="text-sm text-gray-500">email: {user.email}</p>
            </div>
            <div className="flex space-x-4">
              {/* View link with validation */}
              <Link
                href={user.id ? `/admin/userView/${encodeURIComponent(user.id)}` : '#'}
                className={`text-blue-500 hover:text-blue-700 ${!user.id && 'pointer-events-none text-gray-400'}`}
              >
                View
              </Link>
             
              <button
                onClick={() => onDelete(user.id?.toString())}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                Remove
              </button>
              {/* Access log link */}
              <Link href={`/accessLogView/${user.id}`} className="text-red-500 hover:text-red-700">
                View Log
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
