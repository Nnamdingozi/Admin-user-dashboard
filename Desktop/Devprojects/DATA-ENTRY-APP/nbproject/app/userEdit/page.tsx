
// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import { useUserContext } from '@/app/context/userContext';
// import UserEdit from '@/app/components/User/UserEdit';
// import { User } from '@/app/utilities/definitions';
// import { UpdatedUserRequestBody} from '@/app/utilities/definitions';





// const UserEditFormPage: React.FC = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const { token, updateUserById  } = useUserContext();
//   const router = useRouter();

//   const handleEdit = useCallback(async (updateData: LoginRequest): Promise<void> => {

// export default function userEdiPage({
//   params: paramsPromise,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const [userEdit, setUserEdit] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Unwrap `params` using `React.use()`
//   const params = React.use(paramsPromise);
//   const { id } = params;
//   console.log('id from params in useView page:', id)

//   useEffect(() => {
//     if (!id) {
//       setError('Invalid user ID provided.');
//       setLoading(false);
//       return;
//     }

//     async function editData() {
//       try {
//         setLoading(true);
//         setError(null);

//         const result = await updateUserById(id, updateData);
//         console.log('user data fetched in userview page:', result);

//         if (result) {
//           setUserEdit(result);
//           localStorage.setItem('userEdit', JSON.stringify(result));
//         } else {
//           throw new Error(`User with id ${id} not found`);
//         }
//       } catch (err: any) {
//         setError(err.message || 'An error occurred while fetching user data.');
//       } finally {
//         setLoading(false);
//       }
//     }

//     editData();
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div>
//         <p>Error: {error}</p>
//         <button onClick={() => location.reload()}>Retry</button>
//       </div>
//     );
//   }

//   if (!userEdit) {
//     return <div>User not found.</div>;
//   }

//   return <UserEdit onSubmit={userEdit} />;
// }




// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useUserContext } from '@/app/context/userContext';
// import UserEdit from '@/app/components/User/UserEdit';
// import { User, UpdatedUserRequestBody } from '@/app/utilities/definitions';
// import { useRouter } from 'next/navigation';

// const UserEditFormPage: React.FC = () => {
//   const [userEdit, setUserEdit] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const { token, editUserById, currentUser } = useUserContext(); // Access current user
//   const router = useRouter();

//   // Extract `id` from state or local storage
//   const userId = currentUser?.id || JSON.parse(localStorage.getItem('currentUser') || '{}').id;

//   useEffect(() => {
//     if (!userId) {
//       setError('No user ID available. Please log in again.');
//       setLoading(false);
//       return;
//     }

//     async function fetchUserData() {
//       try {
//         setLoading(true);
//         setError(null);

//         // Use the `userId` to fetch the user's current details
//         const result = await editUserById(userId, {} as UpdatedUserRequestBody);
//         console.log('User data fetched:', result);

//         if (result) {
//           setUserEdit(result);
//           localStorage.setItem('userEdit', JSON.stringify(result)); // Persist fetched data
//         } else {
//           throw new Error(`User with ID ${userId} not found.`);
//         }
//       } catch (err: any) {
//         setError(err.message || 'An error occurred while fetching user data.');
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchUserData();
//   }, [userId]);

//   const handleEditSubmit = async (updatedData: UpdatedUserRequestBody) => {
//     if (!userId) {
//       setError('No user ID available. Please log in again.');
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       // Use `updateUserById` to send updated user data to the backend
//       const result = await editUserById(userId, updatedData);
//       console.log('Updated user data:', result);

//       if (result) {
//         setUserEdit(result);
//         localStorage.setItem('userEdit', JSON.stringify(result)); // Update persisted data
//         alert('User updated successfully!');
//         router.push('/profile'); // Redirect to profile or desired page
//       } else {
//         throw new Error('Failed to update user.');
//       }
//     } catch (err: any) {
//       setError(err.message || 'An error occurred while updating user data.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div>
//         <p>Error: {error}</p>
//         <button onClick={() => location.reload()}>Retry</button>
//       </div>
//     );
//   }

//   if (!userEdit) {
//     return <div>User not found.</div>;
//   }

//   return (
//     <UserEdit
//       initialValues={userEdit.user} // Pass the current user data to the edit form
//       onSubmit={handleEditSubmit} // Handle form submission
//     />
//   );
// };

// export default UserEditFormPage;
// import React, { useState, useEffect } from 'react';
// import UserEdit from '@/app/components/User/UserEdit'
// import { useUserContext } from '@/app/context/userContext';
// import { UpdatedUserRequestBody, UserProfile } from '@/app/utilities/definitions';

// const UserEditPage: React.FC = () => {
//   const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
//   const { currentUser: userContextCurrentUser } = useUserContext();

//   useEffect(() => {
//     // Retrieve user from state or localStorage
//     const storedUser = localStorage.getItem('currentUser');
//     const parsedUser = storedUser ? JSON.parse(storedUser) : null;

//     // Use the context currentUser if available, otherwise fallback to localStorage
//     if (userContextCurrentUser) {
//       setCurrentUser(userContextCurrentUser);
//     } else if (parsedUser) {
//       setCurrentUser(parsedUser);
//     }
//   }, [userContextCurrentUser]);

//   const handleUserUpdate = async (updatedUser: UserProfile) => {
//     try {
//       // Example logic: Update user and persist changes to localStorage
//       localStorage.setItem('currentUser', JSON.stringify(updatedUser));
//       setCurrentUser(updatedUser); // Update state
//       console.log('User updated successfully:', updatedUser);
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   if (!currentUser) {
//     return <div>Loading current user...</div>;
//   }

//   return (
//     <div>
//       <h1>Edit User</h1>
//       <UserEdit
//         initialValues={currentUser} // Pass current user details as initial values
//         onSubmit={handleUserUpdate} // Handle form submission
//       />
//     </div>
//   );
// };

// export default UserEditPage;


// 'use client'
// import React, { useState, useEffect } from 'react';
// import UserEdit from '@/app/components/User/UserEdit'
// import { UpdatedUserRequestBody, UserProfile } from '@/app/utilities/definitions';
// import { useUserContext } from '@/app/context/userContext';
// import { useRouter } from 'next/navigation';

// const EditUserPage: React.FC = () => {
//   const { currentUser, editUserById } = useUserContext();
//   const router = useRouter();
//   const [initialValues, setInitialValues] = useState<UserProfile | null>(null);

//   useEffect(() => {
//     // Simulate fetching the current user details for editing
//     if (currentUser) {
//       setInitialValues(currentUser);
//     }
//   }, [currentUser]);

//   const handleUserUpdate = async (updatedUser: UpdatedUserRequestBody) => {

//     if (!updatedUser.id) {
//       console.error('User ID is required for updating.');
//       return; // Prevent the function from running if `id` is undefined
//     }
//     const updatedProfile = await editUserById(updatedUser.id, updatedUser); // Returns UserProfile
//     if (updatedProfile) {
//       router.push('/user/login'); // Redirect after successful update
//     }
//   };

//   if (!initialValues) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Edit User</h1>
//       <UserEdit
//         initialValues={initialValues} // Pass the current user as initial values
//         onSubmit={handleUserUpdate} // Submit logic
//       />
//     </div>
//   );
// };

// export default EditUserPage;



// 'use client';
// import React, { useState, useEffect } from 'react';
// import UserEdit from '@/app/components/User/UserEdit';
// import { UpdatedUserRequestBody, UserProfile } from '@/app/utilities/definitions';
// import { useUserContext } from '@/app/context/userContext';
// import { useRouter } from 'next/navigation';
// import { Update } from 'next/dist/build/swc/types';

// const EditUserPage: React.FC = () => {
//   const { currentUser, editUserById } = useUserContext();
//   const router = useRouter();
//   const [initialValues, setInitialValues] = useState<UpdatedUserRequestBody | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   useEffect(() => {
//     if (currentUser) {
//       setInitialValues(currentUser);
//     } else {
//       // Redirect if no user found
//       setErrorMessage('No user found. Redirecting to login...');
//       setTimeout(() => router.push('/user/login'), 2000);
//     }
//   }, [currentUser, router]);

//   const handleUserUpdate = async (updatedUser: UpdatedUserRequestBody) => {
//     try {
//       if (!updatedUser.id) {
//         console.error('User ID is required for updating.');
//         setErrorMessage('User ID is missing. Please try again.');
//         return;
//       }

//       const updatedProfile = await editUserById(updatedUser.id, updatedUser); // Returns UserProfile
//       if (updatedProfile) {
//         // Redirect based on role
//         if (updatedProfile.role === 'admin') {
//           router.push('/admin'); // Admin dashboard
//         } else if (updatedProfile.role === 'user') {
//           router.push('/employee'); // User dashboard
//         } else {
//           setErrorMessage('Unknown role. Unable to redirect.');
//         }
//       } else {
//         setErrorMessage('Failed to update user. Please try again.');
//       }
//     } catch (error) {
//       setErrorMessage('An unexpected error occurred. Please try again.');
//       console.error('Error updating user:', error);
//     }
//   };

//   if (!initialValues) {
//     return (
//       <div>
//         {errorMessage ? (
//           <p>{errorMessage}</p>
//         ) : (
//           <p>Loading user details...</p>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Edit User</h1>
//       <UserEdit
//         initialValues={initialValues} // Pass the current user as initial values
//         onSubmit={handleUserUpdate} // Submit logic
//       />
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//     </div>
//   );
// };

// export default EditUserPage;

// 'use client'

// import React, { useState, useEffect } from 'react';
// import UserEdit from '@/app/components/User/UserEdit';
// import { UpdatedUserRequestBody, UserProfile } from '@/app/utilities/definitions';
// import { useUserContext } from '@/app/context/userContext';
// import { useRouter } from 'next/navigation';

// const EditUserPage: React.FC = () => {
//   const { currentUser, editUserById } = useUserContext();
//   const router = useRouter();
//   const [initialValues, setInitialValues] = useState<UpdatedUserRequestBody | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   useEffect(() => {
//     if (currentUser) {
//       setInitialValues({
//         ...currentUser,
//         id: currentUser.id?.toString() || '', // Convert number to string or default to empty
//         username: currentUser.username || undefined,
//         email: currentUser.email || undefined, // Replace null with undefined
//         password: '', // Add password field with an empty string,
//         privacyPolicy: false || undefined,
//         role: currentUser.role || undefined, // Replace null with undefined
      
//       });
//     } else {
//       // Redirect if no user found
//       setErrorMessage('No user found. Redirecting to login...');
//       setTimeout(() => router.push('/user/login'), 2000);
//     }
//   }, [currentUser, router]);
  
//   const handleUserUpdate = async (updatedUser: UpdatedUserRequestBody) => {
//     try {
//       if (!updatedUser.id) {
//         console.error('User ID is required for updating.');
//         setErrorMessage('User ID is missing. Please try again.');
//         return;
//       }

//       const updatedProfile = await editUserById(updatedUser.id, updatedUser); // Returns UserProfile
//       if (updatedProfile) {
//         // Redirect based on role
//         if (updatedProfile.role === 'admin') {
//           router.push('/admin'); // Admin dashboard
//         } else if (updatedProfile.role === 'user') {
//           router.push('/employee'); // User dashboard
//         } else {
//           setErrorMessage('Unknown role. Unable to redirect.');
//         }
//       } else {
//         setErrorMessage('Failed to update user. Please try again.');
//       }
//     } catch (error) {
//       setErrorMessage('An unexpected error occurred. Please try again.');
//       console.error('Error updating user:', error);
//     }
//   };

//   if (!initialValues) {
//     return (
//       <div>
//         {errorMessage ? (
//           <p>{errorMessage}</p>
//         ) : (
//           <p>Loading user details...</p>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Edit User</h1>
//       <UserEdit
//         initialValues={initialValues} // Pass the current user as initial values
//         onSubmit={handleUserUpdate} // Submit logic
//       />
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//     </div>
//   );
// };

// export default EditUserPage;
// 'use client';

// import React, { useState, useEffect } from 'react';
// import UserEdit from '@/app/components/User/UserEdit';
// import { UpdatedUserRequestBody, UserProfile } from '@/app/utilities/definitions';
// import { useUserContext } from '@/app/context/userContext';
// import { useRouter } from 'next/navigation';

// const EditUserPage: React.FC = () => {
//   const { currentUser, editUserById } = useUserContext();
//   const router = useRouter();
//   const [initialValues, setInitialValues] = useState<UpdatedUserRequestBody | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   useEffect(() => {
//     if (currentUser) {
//       console.log('current User in edit page:', currentUser)
//       setInitialValues({
//         id: currentUser.id?.toString() || '', // Convert number to string
//         username: currentUser.username!,
//         email: currentUser.email!,
//         password: '', // Default empty string
//         privacyPolicy: false, // Default to false
//         role: currentUser.role!,
//       });
//     } else {
//       setErrorMessage('No user found. Redirecting to login...');
//       setTimeout(() => router.push('/user/login'), 2000);
//     }
//   }, [currentUser, router]);

//   const handleUserUpdate = async (updatedUser: UpdatedUserRequestBody) => {
//     try {
//       if (!updatedUser.id) {
//         setErrorMessage('User ID is missing. Please try again.');
//         return;
//       }

//       const updatedProfile = await editUserById(updatedUser.id, updatedUser);
//       if (updatedProfile) {
//         switch (updatedProfile.role) {
//           case 'admin':
//             router.push('/admin');
//             break;
//           case 'user':
//             router.push('/employee');
//             break;
//           default:
//             setErrorMessage('Unknown role. Unable to redirect.');
//         }
//       } else {
//         setErrorMessage('Failed to update user. Please try again.');
//       }
//     } catch (error) {
//       setErrorMessage('An unexpected error occurred. Please try again.');
//       console.error('Error updating user:', error);
//     }
//   };

//   if (!initialValues) {
//     return (
//       <div>
//         {errorMessage ? (
//           <p style={{ color: 'red' }}>{errorMessage}</p>
//         ) : (
//           <p>Loading user details...</p>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Edit User</h1>
//       <UserEdit
//         initialValues={initialValues}
//         onSubmit={handleUserUpdate}
//       />
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//     </div>
//   );
// };

// export default EditUserPage;






// EditUserPage.tsx

// 'use client';

// import React, { useState, useEffect } from 'react';
// import UserEdit from '@/app/components/User/UserEdit';
// import { UpdatedUserRequestBody, UserProfile } from '@/app/utilities/definitions';
// import { useUserContext } from '@/app/context/userContext';
// import { useRouter } from 'next/navigation';

// const EditUserPage: React.FC = () => {
//   const { currentUser, editUserById } = useUserContext();
//   const router = useRouter();
//   const [initialValues, setInitialValues] = useState<UpdatedUserRequestBody | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   useEffect(() => {
//     if (currentUser) {
//       console.log('current User in edit page:', currentUser);
//       setInitialValues({
//         id: currentUser.id?.toString() || '', // Convert number to string
//         username: currentUser.username!,
//         email: currentUser.email!,
//         password: '', // Default empty string
//         privacyPolicy: false, // Default to false
//         role: currentUser.role!,
//       });
//     } else {
//       setErrorMessage('No user found. Redirecting to login...');
//       setTimeout(() => router.push('/user/login'), 2000);
//     }
//   }, [currentUser, router]);

//   const handleUserUpdate = async (updatedUser: UpdatedUserRequestBody) => {
//     try {
//       if (!updatedUser.id) {
//         setErrorMessage('User ID is missing. Please try again.');
//         return;
//       }

//       const updatedProfile = await editUserById(updatedUser.id, updatedUser);
//       if (updatedProfile) {
//         switch (updatedProfile.role) {
//           case 'admin':
//             router.push('/admin');
//             break;
//           case 'user':
//             router.push('/employee');
//             break;
//           default:
//             setErrorMessage('Unknown role. Unable to redirect.');
//         }
//       } else {
//         setErrorMessage('Failed to update user. Please try again.');
//       }
//     } catch (error) {
//       setErrorMessage('An unexpected error occurred. Please try again.');
//       console.error('Error updating user:', error);
//     }
//   };

//   if (!initialValues) {
//     return (
//       <div>
//         {errorMessage ? (
//           <p style={{ color: 'red' }}>{errorMessage}</p>
//         ) : (
//           <p>Loading user details...</p>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Edit User</h1>
//       <UserEdit
//         initialValues={initialValues}
//         onSubmit={handleUserUpdate}
//       />
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//     </div>
//   );
// };

// export default EditUserPage;



'use client';
import React, { useState, useEffect } from 'react';
import UserEdit from '@/app/components/User/UserEdit';
import { UpdatedUserRequestBody, UserProfile } from '@/app/utilities/definitions';
import { useUserContext } from '@/app/context/userContext';
import { useRouter } from 'next/navigation';

const EditUserPage: React.FC = () => {
  const { currentUser, editUserById } = useUserContext();
  const router = useRouter();
  const [initialValues, setInitialValues] = useState<UpdatedUserRequestBody | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      console.log('current User in edit page:', currentUser);
      setInitialValues({
        username: currentUser.username!,
        email: currentUser.email!,
        password: '', // Default empty string
        privacyPolicy: false, // Default to false
        role: currentUser.role!,
      });
    } else {
      setErrorMessage('No user found. Redirecting to login...');
      setTimeout(() => router.push('/user/login'), 2000);
    }
  }, [currentUser, router]);

const handleUserUpdate = async (updatedUser: UpdatedUserRequestBody) => {
  try {
    const userId =  currentUser?.id?.toString();
    console.log(' id in page', userId)

    if (!userId) {
      setErrorMessage('User ID is missing. Please try again.');
      return;
    }

    const updatedProfile = await editUserById(userId, updatedUser);
    if (updatedProfile) {
      switch (updatedProfile.role) {
        case 'admin':
          router.push('/admin');
          break;
        case 'user':
          router.push('/employee');
          break;
        default:
          setErrorMessage('Unknown role. Unable to redirect.');
      }
    } else {
      setErrorMessage('Failed to update user. Please try again.');
    }
  } catch (error) {
    setErrorMessage('An unexpected error occurred. Please try again.');
    console.error('Error updating user:', error);
  }
};
if (!initialValues) {
  return (
    <div>
      {errorMessage ? (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
}

return (
  <div>
    <h1>Edit User</h1>
    <UserEdit
      initialValues={initialValues}
      onSubmit={handleUserUpdate}
    />
    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
  </div>
);
};

export default EditUserPage;

