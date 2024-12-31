// 'use client';

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { getUsers, getUserById, createUser, updateUser, deleteUser } from '@/app/api/userApi';
// import { User, NewUserRequestBody, UserProfile, UpdatedUserRequestBody } from '@/app/utilities/definitions';
// import { useRouter } from 'next/navigation';

// interface UserContextProps {
//   users: UserProfile[];
//   currentUser: UserProfile | null;
//   token: string | null;
//   loading: boolean;
//   error: string | null;
//   fetchUsers: () => Promise<void>;
//   fetchUserById: (id: string) => Promise<User | null>;
//   userById: User | null;
//   setUserById:React.Dispatch<React.SetStateAction<User | null>>;
//   registerUser: (user: NewUserRequestBody) => Promise<string | null>;
//   logout: () => void;
//   setUsers: React.Dispatch<React.SetStateAction<UserProfile[]>>;
//   setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile | null>>
//   saveToken: (token: string, user: UserProfile) => void;
//   editUserById: (id: string, user: UpdatedUserRequestBody) => Promise<UserProfile | null>;
//   removeUser: (id: string) => Promise<void>;
// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [users, setUsers] = useState<UserProfile[]>([]);
//   const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [userById, setUserById] = useState<User | null>(null);
 
//   const router = useRouter();

//   useEffect(() => {
//     const savedUsers = localStorage.getItem("users");
//     const savedUser = localStorage.getItem("currentUser");
//     const savedToken = localStorage.getItem("token");
   
  
//     // Handle savedUsers
//     if (savedUsers) {
//       try {
//         setUsers(JSON.parse(savedUsers));
//       } catch (error) {
//         console.error("Error parsing savedUsers from localStorage:", error);
//         setUsers([]); // Fallback to empty array if parsing fails
//       }
//     } else {
//       console.warn("No users found in localStorage");
//       setUsers([]); // Default to empty array if nothing is stored
//     }
  
//     // Handle savedUser
//     if (savedUser) {
//       try {
//         setCurrentUser(JSON.parse(savedUser));
//       } catch (error) {
//         console.error("Error parsing savedUser from localStorage:", error);
//         setCurrentUser(null); // Fallback to null if parsing fails
//       }
//     } else {
//       console.warn("No current user found in localStorage");
//       setCurrentUser(null); // Default to null if nothing is stored
//     }

//     if (savedToken) {
//       try {
//         setToken(savedToken);
//       } catch (error) {
//         console.error("Error parsing savedUser from localStorage:", error);
//         setToken(null); // Fallback to null if parsing fails
//       }
//     } else {
//       console.warn("No token found in localStorage");
//       setToken(null); // Default to null if nothing is stored
//     }

    
//   }, []);
  

//   const saveToken = (newToken: string, user: UserProfile) => {
//     try {
//       setToken(newToken);
//       setCurrentUser(user);
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('token', newToken);
//         localStorage.setItem('currentUser', JSON.stringify(user));
//         const isSecure = process.env.NODE_ENV === 'production' ? 'secure;' : '';
//         document.cookie = `token=${newToken}; path=/; ${isSecure ? 'secure;' : ''} samesite=strict; max-age=3600`;
//         // Expires in 1 hour
//       }
//     } catch (error) {
//       console.error('Failed to save token to localStorage or cookies', error);
//     }
//   };


//   const fetchUsers = async () => {
//     if (users && users.length > 0) return;  // No need to fetch if users already exist
//     try {
//       setError(null);
//       setLoading(true);
      

//       const fetchedUsers = await getUsers(token!);
//       setUsers(fetchedUsers!);
//       console.log('fetchedUsers in context:', fetchedUsers);
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('usersList', JSON.stringify(fetchedUsers));
//       }
//     } catch (err) {
//       setError('Failed to fetch users. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

  

//   const fetchUserById = async (id: string): Promise<User | null> => {
//     if (!id) {
//       console.error('fetchUserById called without a valid ID');
//       return null;
//     }
  
//     setError(null);
//     setLoading(true);
  
//     try {
//       const localStorageKey = `user_${id}`;
//       const savedUserById = localStorage.getItem(localStorageKey);
  
//       if (savedUserById) {
//         const parsedUser = JSON.parse(savedUserById);
//         setUserById(parsedUser);
//         console.log(`User with ID ${id} loaded from localStorage:`, parsedUser);
//         return parsedUser;
//       }
  
//       const fetchedUser = await getUserById(id, token!);
//       if (fetchedUser) {
//         setUserById(fetchedUser);
//         console.log(`User with ID ${id} fetched from API:`, fetchedUser);
  
//         if (typeof window !== 'undefined') {
//           localStorage.setItem(localStorageKey, JSON.stringify(fetchedUser));
//         }
  
//         return fetchedUser;
//       }
//     } catch (err: any) {
//       setError(`Failed to fetch user by ID: ${err.message || err}`);
//       console.error(`Error fetching user by ID ${id}:`, err);
//     } finally {
//       setLoading(false);
//     }
  
//     return null;
//   };
  

//   // const editUserById = async (
//   //   id: string,
//   //   updatedUser: UpdatedUserRequestBody
//   // ): Promise<UserProfile | null> => {
//   //   const storedToken = localStorage.getItem('token'); // Use a different name to avoid conflict
  
//   //   if (!storedToken) {
//   //     throw new Error('Authorization token is missing.');
//   //   }
  
//   //   try {
//   //     setError(null);
//   //     setLoading(true);
  
//   //     const { user: updatedUserData, users: updatedUsersArray, token: newToken } = await updateUser(
//   //       id,
//   //       storedToken,
//   //       updatedUser
//   //     );
  
//   //     console.log('id in userContext:', id);
//   //     console.log('Updated user in context:', updatedUserData);
//   //     console.log('Updated users in context:', updatedUsersArray);
  
//   //     if (updatedUserData && updatedUsersArray && newToken) {
//   //       setCurrentUser(updatedUserData);
//   //       setUsers(updatedUsersArray);
//   //       setToken(newToken); // Use the state setter for the token
//   //     }
  
//   //     if (typeof window !== 'undefined') {
//   //       localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
//   //       localStorage.setItem('usersList', JSON.stringify(updatedUsersArray));
//   //       localStorage.setItem('token', newToken!);
//   //     }
  
//   //     return updatedUserData;
//   //   } catch (err: unknown) {
//   //     const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
//   //     setError(errorMessage);
//   //     return null;
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
  
//   const editUserById = async (
//     id: string,
//     updatedUser: UpdatedUserRequestBody
//   ): Promise<UserProfile | null> => {
//     const storedToken = localStorage.getItem('token'); // Use a different name to avoid conflict
  
//     if (!storedToken) {
//       throw new Error('Authorization token is missing.');
//     }
  
//     try {
//       setError(null);
//       setLoading(true);
  
//       // Rename the destructured `token` to avoid conflict
//       const {
//         user: updatedUserData,
//         users: updatedUsersArray,
//         token: updatedToken,
//       } = await updateUser(id, storedToken, updatedUser);
  
//       console.log('id in userContext:', id);
//       console.log('Updated user in context:', updatedUserData);
//       console.log('Updated users in context:', updatedUsersArray);
  
//       if (updatedUserData && updatedUsersArray && updatedToken) {
//         setCurrentUser(updatedUserData);
//         setUsers(updatedUsersArray);
//         setToken(updatedToken); // No conflict now
//       }
  
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
//         localStorage.setItem('usersList', JSON.stringify(updatedUsersArray));
//         localStorage.setItem('token', updatedToken!);
//       }
  
//       return updatedUserData;
//     } catch (err: unknown) {
//       const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
//       setError(errorMessage);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };
  
  
//   // const removeUser = async (id: string): Promise<void> => {
//   //   try {
//   //     console.log('Removing user with ID:', id);
//   // setLoading(true);
//   // setError(null)
//   //     // Call API to delete user
//   //     const response = await deleteUser(id, token!); // `deleteUser` returns the response data directly
//   //     console.log('API response:', response);
  
//   //     // Use the updated user list from the server
//   //     if (response?.users) {
//   //       setUsers(response.users);
//   //       alert(response.message)
  
//   //       // Optionally sync with localStorage
//   //       if (typeof window !== 'undefined') {
//   //         localStorage.setItem('usersList', JSON.stringify(response.users));
//   //       }
//   //     } else {
//   //       throw new Error('Unexpected API response format.');
//   //     }
//   //   } catch (error) {
//   //     console.error('Failed to remove user:', error);
//   //     throw new Error('User removal failed.');
//   //   }
//   // };



//   const removeUser = async (id: string): Promise<void> => {
//     try {
//       console.log('Removing user with ID:', id);
//       setLoading(true);
//       setError(null);
  
//       // Call API to delete user
//       const response = await deleteUser(id, token!); // `deleteUser` returns the response data directly
//       console.log('API response:', response);
  
//       if (response?.message) {
//         // Filter out the removed user from the current users state
//         setUsers((prevUsers) => prevUsers.filter((user) => user.id !== Number(id)));
  
//         alert(response.message);
  
//         // Optionally sync with localStorage
//         if (typeof window !== 'undefined') {
//           const updatedUsers = JSON.parse(localStorage.getItem('usersList') || '[]');
//           const filteredUsers = updatedUsers.filter((user: { id: string }) => user.id !== id);
//           localStorage.setItem('usersList', JSON.stringify(filteredUsers));
//         }
//       } else {
//         throw new Error('Unexpected API response format.');
//       }
//     } catch (error) {
//       console.error('Failed to remove user:', error);
//       setError('User removal failed.');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };
  
  
//   const registerUser = async (newUser: NewUserRequestBody): Promise<string | null> => {
//     try {
//       setLoading(true);
//       const { user, token } = await createUser(newUser);
//       saveToken(token, user);
//       return user.role;
//     } catch (err: any) {
//       setError(err.message);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     setCurrentUser(null);
//     setToken(null);
//     setUsers([]);
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem('currentUser');
//       localStorage.removeItem('token');
//       localStorage.removeItem('usersList');
//       localStorage.removeItem('user_${id}');
//     }
//     router.push('/'); // Redirect to homepage
//   };

//   return (
//     <UserContext.Provider
//       value={{
//         users,
//         currentUser,
//         token,
//         loading,
//         error,
//         fetchUsers,
//         fetchUserById,
//         registerUser,
//         logout,
//         setUsers,
//         setCurrentUser,
//         saveToken,
//         editUserById,
//         removeUser,
//         userById,
//         setUserById
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUserContext must be used within a UserProvider');
//   }
//   return context;
// };





// 'use client';

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { getUsers, getUserById, createUser, updateUser, deleteUser } from '@/app/api/userApi';
// import { User, NewUserRequestBody, UserProfile, UpdatedUserRequestBody } from '@/app/utilities/definitions';
// import { useRouter } from 'next/navigation';

// interface UserContextProps {
//   users: User[];
//   currentUser: UserProfile | null;
//   token: string | null;
//   loading: boolean;
//   error: string | null;
//   fetchUsers: () => Promise<void>;
//   fetchUserById: (id: string) => Promise<User | null>;
//   registerUser: (user: NewUserRequestBody) => Promise<string | null>;
//   logout: () => void;
//   setUsers: React.Dispatch<React.SetStateAction<User[]>>;
//   setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
//   saveToken: (token: string, user: UserProfile) => void;
//   editUserById: (id: string, user: UpdatedUserRequestBody) => Promise<UserProfile | null>;
//   removeUser: (id: string) => Promise<void>;
// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [userById, setUserById] = useState<User | null>(null);
 
//   const router = useRouter();

//   useEffect(() => {
//     const savedUsers = localStorage.getItem("users");
//     const savedUser = localStorage.getItem("currentUser");
//     const savedToken = localStorage.getItem("token");
//     const savedUserById = localStorage.getItem(user_${id})
  
//     // Handle savedUsers
//     if (savedUsers) {
//       try {
//         setUsers(JSON.parse(savedUsers));
//       } catch (error) {
//         console.error("Error parsing savedUsers from localStorage:", error);
//         setUsers([]); // Fallback to empty array if parsing fails
//       }
//     } else {
//       console.warn("No users found in localStorage");
//       setUsers([]); // Default to empty array if nothing is stored
//     }
  
//     // Handle savedUser
//     if (savedUser) {
//       try {
//         setCurrentUser(JSON.parse(savedUser));
//       } catch (error) {
//         console.error("Error parsing savedUser from localStorage:", error);
//         setCurrentUser(null); // Fallback to null if parsing fails
//       }
//     } else {
//       console.warn("No current user found in localStorage");
//       setCurrentUser(null); // Default to null if nothing is stored
//     }

//     if (savedToken) {
//       try {
//         setToken(savedToken);
//       } catch (error) {
//         console.error("Error parsing savedUser from localStorage:", error);
//         setToken(null); // Fallback to null if parsing fails
//       }
//     } else {
//       console.warn("No token found in localStorage");
//       setToken(null); // Default to null if nothing is stored
//     }

//     if (savedUserById) {
//       try {
//         setUserById(JSON.parse(savedUserById));
//       } catch (error) {
//         console.error("Error parsing savedUser from localStorage:", error);
//         setUserById(null); // Fallback to null if parsing fails
//       }
//     } else {
//       console.warn("No token found in localStorage");
//       setUserById(null); // Default to null if nothing is stored
//     }
//   }, []);
  

//   const saveToken = (newToken: string, user: UserProfile) => {
//     try {
//       setToken(newToken);
//       setCurrentUser(user);
      // if (typeof window !== 'undefined') {
      //   localStorage.setItem('token', newToken);
      //   localStorage.setItem('currentUser', JSON.stringify(user));
      //   const isSecure = process.env.NODE_ENV === 'production' ? 'secure;' : '';
      //   document.cookie = `token=${newToken}; path=/; ${isSecure ? 'secure;' : ''} samesite=strict; max-age=3600`;
    
      // }
//     } catch (error) {
//       console.error('Failed to save token to localStorage or cookies', error);
//     }
//   };

//   const fetchUsers = async () => {
//     if (users && users.length > 0) return;  // No need to fetch if users already exist
//     try {
//       setError(null);
//       setLoading(true);

//       const fetchedUsers = await getUsers(token!);
//       setUsers(fetchedUsers!);
//       console.log('fetchedUsers in context:', fetchedUsers);
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('usersList', JSON.stringify(fetchedUsers));
//       }
//     } catch (err) {
//       setError('Failed to fetch users. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUserById = async (id: string): Promise<User | null> => {
//     try {
//       setError(null);
//       setLoading(true);
  
//       const fetchedUser = await getUserById(id, token!);
//       console.log('id in usercontext:', id);
//       console.log('fetched user in context:', fetchedUser);
  
//       if (typeof window !== 'undefined') {
//         localStorage.setItem(user_${id}, JSON.stringify(fetchedUser));
//       }
  
//       return fetchedUser;
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
  
//     return null;
//   };
  
  

//   const editUserById = async (
//     id: string,
//     updatedUser: UpdatedUserRequestBody
//   ): Promise<UserProfile | null> => {
//     const token = localStorage.getItem('token'); // Fetch the token from storage

//     if (!token) {
//       throw new Error('Authorization token is missing.');
//     }

//     try {
//       setError(null);
//       setLoading(true);

//       const { user: updatedUserData, users: updatedUsersArray, token: newToken } = await updateUser(id, token, updatedUser);

//       console.log('id in userContext:', id);
//       console.log('Updated user in context:', updatedUserData);
//       console.log('Updated users in context:', updatedUsersArray);
      
   
//       if(updatedUserData && updatedUsersArray && token)

//       setCurrentUser(updatedUserData);
//       setUsers(updatedUsersArray!);
//       setToken(token)
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
//         localStorage.setItem('userList', JSON.stringify(updatedUsersArray));
//         localStorage.setItem('token', newToken!);
//       }

//       return updatedUserData;
//     } catch (err: unknown) {
//       const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
//       setError(errorMessage);
//       return null; // Explicitly returning null in case of failure
//     } finally {
//       setLoading(false);
//     }
//   };


  
//   const removeUser = async (id: string) => {
//     try {
//       console.log('Removing user with ID:', id);
  
//       // Call API to delete user
//       const response = await deleteUser(id, token!); // deleteUser returns the response data directly
//       console.log('API response:', response);
  
//       // Use the updated user list from the server
//       if (response?.users) {
//         setUsers(response.users);
//         alert(response.message)
  
//         // Optionally sync with localStorage
//         if (typeof window !== 'undefined') {
//           localStorage.setItem('usersList', JSON.stringify(response.users));
//         }
//       } else {
//         throw new Error('Unexpected API response format.');
//       }
//     } catch (error) {
//       console.error('Failed to remove user:', error);
//       throw new Error('User removal failed.');
//     }
//   };
  
//   const registerUser = async (newUser: NewUserRequestBody): Promise<string | null> => {
//     try {
//       setLoading(true);
//       const { user, token } = await createUser(newUser);
//       saveToken(token, user);
//       return user.role;
//     } catch (err: any) {
//       setError(err.message);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     setCurrentUser(null);
//     setToken(null);
//     setUsers([]);
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem('currentUser');
//       localStorage.removeItem('token');
//       localStorage.removeItem('usersList');
//       localStorage.removeItem('user_${id}');
//     }
//     router.push('/'); // Redirect to homepage
//   };

//   return (
//     <UserContext.Provider
//       value={{
//         users,
//         currentUser,
//         token,
//         loading,
//         error,
//         fetchUsers,
//         fetchUserById,
//         registerUser,
//         logout,
//         setUsers,
//         setCurrentUser,
//         saveToken,
//         editUserById,
//         removeUser
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUserContext must be used within a UserProvider');
//   }
//   return context;




// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { getUsers, getUserById, createUser, updateUser, deleteUser } from '@/app/api/userApi';
// import { User, NewUserRequestBody, UserProfile, UpdatedUserRequestBody } from '@/app/utilities/definitions';
// import { useRouter } from 'next/navigation';
// import { useAccessLogContext } from './accesslogContext';

// interface UserContextProps {
//   users: User[];
//   currentUser: UserProfile | null;
//   token: string | null;
//   loading: boolean;
//   error: string | null;
//   fetchUsers: () => Promise<void>;
//   fetchUserById: (id: string) => Promise<User | null>;
//   userById: User | null;
//   setUserById:React.Dispatch<React.SetStateAction<User | null>>;
//   registerUser: (user: NewUserRequestBody) => Promise<string | null>;
//   logout: () => void;
//   setUsers: React.Dispatch<React.SetStateAction<User[]>>;
//   setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile | null>>
//   saveToken: (token: string, user: UserProfile) => void;
//   editUserById: (id: string, user: UpdatedUserRequestBody) => Promise<User | null>;
//   removeUser: (id: string) => Promise<void>;
// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [userById, setUserById] = useState<User | null>(null);
 
//   const router = useRouter();

//   const { clearAccessLogsFromStorage } = useAccessLogContext();

//   useEffect(() => {
//     const savedUsers = localStorage.getItem("users");
//     const savedUser = localStorage.getItem("currentUser");
//     const savedToken = localStorage.getItem("token");
   
  
//     // Handle savedUsers
//     if (savedUsers) {
//       try {
//         setUsers(JSON.parse(savedUsers));
//       } catch (error) {
//         console.error("Error parsing savedUsers from localStorage:", error);
//         setUsers([]); // Fallback to empty array if parsing fails
//       }
//     } else {
//       console.warn("No users found in localStorage");
//       setUsers([]); // Default to empty array if nothing is stored
//     }
  
//     // Handle savedUser
//     if (savedUser) {
//       try {
//         setCurrentUser(JSON.parse(savedUser));
//       } catch (error) {
//         console.error("Error parsing savedUser from localStorage:", error);
//         setCurrentUser(null); // Fallback to null if parsing fails
//       }
//     } else {
//       console.warn("No current user found in localStorage");
//       setCurrentUser(null); // Default to null if nothing is stored
//     }

//     if (savedToken) {
//       try {
//         setToken(savedToken);
//       } catch (error) {
//         console.error("Error parsing savedUser from localStorage:", error);
//         setToken(null); // Fallback to null if parsing fails
//       }
//     } else {
//       console.warn("No token found in localStorage");
//       setToken(null); // Default to null if nothing is stored
//     }

    
//   }, []);
  

//   const saveToken = (newToken: string, user: UserProfile) => {
//     try {
//       setToken(newToken);
//       setCurrentUser(user);
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('token', newToken);
//         localStorage.setItem('currentUser', JSON.stringify(user));
//         const isSecure = process.env.NODE_ENV === 'production' ? 'secure;' : '';
//         document.cookie = token=${newToken}; path=/; ${isSecure ? 'secure;' : ''} samesite=strict; max-age=3600;
//         // Expires in 1 hour
//       }
//     } catch (error) {
//       console.error('Failed to save token to localStorage or cookies', error);
//     }
//   };


//   const fetchUsers = async () => {
//     if (users && users.length > 0) return;  // No need to fetch if users already exist
//     try {
//       setError(null);
//       setLoading(true);
      

//       const fetchedUsers = await getUsers(token!);
//       setUsers(fetchedUsers!);
//       console.log('fetchedUsers in context:', fetchedUsers);
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('usersList', JSON.stringify(fetchedUsers));
//       }
//     } catch (err) {
//       setError('Failed to fetch users. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

  

//   const fetchUserById = async (id: string): Promise<User | null> => {
//     if (!id) {
//       console.error('fetchUserById called without a valid ID');
//       return null;
//     }
  
//     setError(null);
//     setLoading(true);
  
//     try {
//       const localStorageKey = user_${id};
//       const savedUserById = localStorage.getItem(localStorageKey);
  
//       if (savedUserById) {
//         const parsedUser = JSON.parse(savedUserById);
//         setUserById(parsedUser);
//         console.log(User with ID ${id} loaded from localStorage:, parsedUser);
//         return parsedUser;
//       }
  
//       const fetchedUser = await getUserById(id, token!);
//       if (fetchedUser) {
//         setUserById(fetchedUser);
//         console.log(User with ID ${id} fetched from API:, fetchedUser);
  
//         if (typeof window !== 'undefined') {
//           localStorage.setItem(localStorageKey, JSON.stringify(fetchedUser));
//         }
  
//         return fetchedUser;
//       }
//     } catch (err: any) {
//       setError(Failed to fetch user by ID: ${err.message || err});
//       console.error(Error fetching user by ID ${id}:, err);
//     } finally {
//       setLoading(false);
//     }
  
//     return null;
//   };
  

  
//   const editUserById = async (
//     id: string,
//     updatedUser: UpdatedUserRequestBody
//   ): Promise<User | null> => {
//     const storedToken = localStorage.getItem('token'); // Use a different name to avoid conflict
  
//     if (!storedToken) {
//       throw new Error('Authorization token is missing.');
//     }
  
//     try {
//       setError(null);
//       setLoading(true);
  
//       // Rename the destructured token to avoid conflict
//       const {
//         user: updatedUserData,
//         users: updatedUsersArray,
//         token: updatedToken,
//       } = await updateUser(id, storedToken, updatedUser);
  
//       console.log('id in userContext:', id);
//       console.log('Updated user in context:', updatedUserData);
//       console.log('Updated users in context:', updatedUsersArray);
  
//       if (updatedUserData && updatedUsersArray && updatedToken && updatedUserData.user.role) {

//         const flattenedUser: UserProfile = {
//           id: updatedUserData.id,
//           username: updatedUserData.user.username,
//           email: updatedUserData.user.email,
//           role: updatedUserData.user.role ,
         
//         };
  

//         setCurrentUser(flattenedUser);
//         setUsers(updatedUsersArray);
//         setToken(updatedToken); // No conflict now
//       }
  
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
//         localStorage.setItem('usersList', JSON.stringify(updatedUsersArray));
//         localStorage.setItem('token', updatedToken!);
//       }
  
//       return updatedUserData;
//     } catch (err: unknown) {
//       const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
//       setError(errorMessage);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const removeUser = async (id: string): Promise<void> => {
//     try {
//       console.log('Removing user with ID:', id);
//       setLoading(true);
//       setError(null);
  
//       // Call API to delete user
//       const response = await deleteUser(id, token!); // deleteUser returns the response data directly
//       console.log('API response:', response);
  
//       if (response?.message) {
//         // Filter out the removed user from the current users state
//         setUsers((prevUsers) => prevUsers.filter((user) => user.id !== Number(id)));
  
//         alert(response.message);
  
//         // Optionally sync with localStorage
//         if (typeof window !== 'undefined') {
//           const updatedUsers = JSON.parse(localStorage.getItem('usersList') || '[]');
//           const filteredUsers = updatedUsers.filter((user: { id: string }) => user.id !== id);
//           localStorage.setItem('usersList', JSON.stringify(filteredUsers));
//         }
//       } else {
//         throw new Error('Unexpected API response format.');
//       }
//     } catch (error) {
//       console.error('Failed to remove user:', error);
//       setError('User removal failed.');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };
  
  
//   const registerUser = async (newUser: NewUserRequestBody): Promise<string | null> => {
//     try {
//       setLoading(true);
//       const { user, token } = await createUser(newUser);
//       saveToken(token, user);
//       return user.role;
//     } catch (err: any) {
//       setError(err.message);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     setCurrentUser(null);
//     setToken(null);
//     setUsers([]);
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem('currentUser');
//       localStorage.removeItem('token');
//       localStorage.removeItem('usersList');
//       localStorage.removeItem('user_${id}');
//      clearAccessLogsFromStorage();
//     }
//     router.push('/'); // Redirect to homepage
//   };

//   return (
//     <UserContext.Provider
//       value={{
//         users,
//         currentUser,
//         token,
//         loading,
//         error,
//         fetchUsers,
//         fetchUserById,
//         registerUser,
//         logout,
//         setUsers,
//         setCurrentUser,
//         saveToken,
//         editUserById,
//         removeUser,
//         userById,
//         setUserById
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUserContext must be used within a UserProvider');
//   }
//   return context;
// };






'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '@/app/api/userApi';
import { User, NewUserRequestBody, UserProfile, UpdatedUserRequestBody, updateUserResponseBody } from '@/app/utilities/definitions';
import { useRouter } from 'next/navigation';

interface UserContextProps {
  users: User[];
  currentUser: UserProfile | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  fetchUserById: (id: string) => Promise<User | null>;
  userById: User | null;
  setUserById: React.Dispatch<React.SetStateAction<User | null>>;
  registerUser: (user: NewUserRequestBody) => Promise<string | null>;
  logout: () => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  saveToken: (token: string, user: UserProfile) => void;
  editUserById: (id: string, user: UpdatedUserRequestBody) => Promise<updateUserResponseBody | null>;
  removeUser: (id: string) => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userById, setUserById] = useState<User | null>(null);

  const router = useRouter();
  

  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    const savedUser = localStorage.getItem('currentUser');
    const savedToken = localStorage.getItem('token');

    setUsers(savedUsers ? JSON.parse(savedUsers) : []);
    setCurrentUser(savedUser ? JSON.parse(savedUser) : null);
    setToken(savedToken || null);
  }, []);

  const saveToken = (newToken: string, user: UserProfile) => {
    setToken(newToken);
    setCurrentUser(user);

    if (typeof window !== 'undefined') {
      localStorage.setItem('token', newToken);
      localStorage.setItem('currentUser', JSON.stringify(user));
      const isSecure = process.env.NODE_ENV === 'production' ? 'secure;' : '';
      document.cookie = `token=${newToken}; path=/; ${isSecure ? 'secure;' : ''} samesite=strict; max-age=3600`;
    }

    console.log('token in context;', token);
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedUsers = await getUsers(token!);
      console.log('token passed into getUser, context', token);
      console.log('users fetched in context:', users);
      setUsers(fetchedUsers);
      localStorage.setItem('users', JSON.stringify(fetchedUsers));
    } catch (err) {
      setError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserById = async (id: string): Promise<User | null> => {
    setLoading(true);
    setError(null);

    try {
      const fetchedUser = await getUserById(id, token!);
      setUserById(fetchedUser);
      localStorage.setItem(`user_${id}`, JSON.stringify(fetchedUser));
      return fetchedUser;
    } catch (err) {
      setError(`Failed to fetch user by ID: ${id}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (newUser: NewUserRequestBody): Promise<string | null> => {
    setLoading(true);

    try {
      const { user, token } = await createUser(newUser);
      saveToken(token, user);
      return user.role;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const editUserById = async (id: string, updatedUser: UpdatedUserRequestBody): Promise<updateUserResponseBody | null> => {
    setLoading(true);
    setError(null);

    try {
      const updatedUserData = await updateUser(id, token!, updatedUser);
      setToken(updatedUserData.token);
      
      const {user, users } = updatedUserData;
      if (user && users) {
        setCurrentUser({
          id: user.id ?? null,
          username: user.user.username ?? null,
          email: user.user.email ?? null,
          role: user.user.role ?? null,
        });

        setUsers(users);
      }

      return updatedUserData;
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    return null;
  };

  const removeUser = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await deleteUser(id, token!);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== Number(id)));
      localStorage.setItem(
        'users',
        JSON.stringify(users.filter((user) => user.id !== Number(id)))
      );
    } catch (err) {
      setError('Failed to remove user.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    setUsers([]);
    localStorage.clear();
    router.push('/');
  };

  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        token,
        loading,
        error,
        fetchUsers,
        fetchUserById,
        registerUser,
        logout,
        setUsers,
        setCurrentUser,
        saveToken,
        editUserById,
        removeUser,
        userById,
        setUserById,
      }}
    >
    {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

