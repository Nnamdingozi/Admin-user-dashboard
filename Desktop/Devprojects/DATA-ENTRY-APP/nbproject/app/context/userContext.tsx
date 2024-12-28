// 'use client';

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { getUsers, getUserById, createUser, updateUser, deleteUser } from '@/app/api/userApi';
// import { User, NewUserRequestBody, UpdatedUserRequestBody, UserProfile } from '@/app/utilities/definitions';
// import { useRouter } from 'next/navigation';

// interface UserContextProps {
//   users: User[] | [];
//   currentUser: UserProfile | null;
//   fetchUsers: (token: string) => void;
//   fetchUserById: (token: string, id: number) => void;
//   registerUser: (user: NewUserRequestBody) => Promise<string | null>;
//   editUser: (token: string, id: number, user: UpdatedUserRequestBody) => void;
//   removeUser: (token: string, id: number) => void;
//   loading: boolean;
//   error: string | null;
// setUsers: React.Dispatch<React.SetStateAction<User[] | []>>;
// setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
//   token: string | null;
//   logout: () => void;
//   saveToken: (token: string) => void;
// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [users, setUsers] = useState<User[] | []>([]);
//   const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [token, setToken] = useState<string | null>(null);

//   const router = useRouter();

//   useEffect(() => {
//     // Synchronize state with localStorage on load
//     const savedUser = localStorage.getItem('currentUser')
//     const storedToken = localStorage.getItem('token');
//     if (storedToken && currentUser) {
//       setToken(storedToken);
//       setCurrentUser(JSON.parse(savedUser!));
//     }

//   }, []);

//   const saveToken = (newToken: string) => {
//     try {
//       setToken(newToken);
//       localStorage.setItem('token', newToken);

//     const isSecure = process.env.NODE_ENV === 'production' ? 'secure;' : '';
//     document.cookie = `token=${newToken}; path=/; ${isSecure} samesite=strict; max-age=3600`; // Expires in 1 hour
//   } catch (error) {
//     console.error('Failed to save token to localStorage or cookies', error);
//   }
// };

//   const registerUserAsync = async (newUser: NewUserRequestBody): Promise<string | null> => {
//     try {
//       setLoading(true);
//       setError(null);

//       const { user, token } = await createUser(newUser);

//       // Save token and user details
//       saveToken(token);
//       setCurrentUser(user);
//       localStorage.setItem("currentUser", JSON.stringify(user));

//       return user.role;
//     } catch (err: any) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const registerUser = (newUser: NewUserRequestBody): Promise<string | null> => {
//     return registerUserAsync(newUser);
//   };

//   const fetchUsersAsync = async (token: string) => {
//     try {
//       setLoading(true);
//       setError(null);
//       if(users.length === 0) {

//       const fetchedUsers = await getUsers(token);
//       setUsers(fetchedUsers || [])
//     }
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUsers = (token: string) => {
//     fetchUsersAsync(token);
//   };

// const fetchUserByIdAsync = async (token: string, id: number) => {
//   try {
//     setLoading(true);
//     setError(null);
//     const fetchedUser = await getUserById(token, id);
//     setCurrentUser(fetchedUser || null);
//   } catch (err: any) {
//     setError(err.message);
//   } finally {
//     setLoading(false);
//   }
// };

// const fetchUserById = (token: string, id: number) => {
//   fetchUserByIdAsync(token, id);
// };

//   useEffect(() => {
//     const storedUser = localStorage.getItem("currentUser");
//     const storedToken = localStorage.getItem("token");

//     if (storedUser) setCurrentUser(JSON.parse(storedUser));
//     if (storedToken) setToken(storedToken);
//   }, []);

//   // Persist currentUser and token when they change
//   useEffect(() => {
//     if (currentUser) localStorage.setItem("currentUser", JSON.stringify(currentUser));
//     else localStorage.removeItem("currentUser");

//     if (token) localStorage.setItem("token", token);
//     else localStorage.removeItem("token");
//   }, [currentUser, token]);

//   const logout = () => {
//     setCurrentUser(null);
//     setToken(null);
//     localStorage.removeItem("currentUser");
//     localStorage.removeItem("token");
//   };

//   return (
//     <UserContext.Provider
//       value={{
//         users,
//         currentUser,
//         fetchUsers,
//         fetchUserById,
//         registerUser,
//         editUser: () => {}, // Placeholder
//         removeUser: () => {}, // Placeholder
//         loading,
//         error,
//         setUsers,
//         setCurrentUser,
//         token,
//         saveToken,
//         logout,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUserContext = (): UserContextProps => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUserContext must be used within a UserProvider');
//   }
//   return context;
// };


// 'use client';

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { getUsers, getUserById, createUser } from '@/app/api/userApi';
// import { User, NewUserRequestBody, UserProfile } from '@/app/utilities/definitions';
// import { useRouter } from 'next/navigation';

// interface UserContextProps {
//   users: User[];
//   currentUser: UserProfile | null;
//   token: string | null;
//   loading: boolean;
//   error: string | null;
//   fetchUsers: () => Promise<void>;
//   fetchUserById: (token: string, id: number) => Promise<UserProfile | null>
//   registerUser: (user: NewUserRequestBody) => Promise<string | null>;
//   logout: () => void;
//   setUsers: React.Dispatch<React.SetStateAction<User[] | []>>;
//   setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
//   saveToken: (token: string, user: UserProfile) => void;
// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const router = useRouter();

//   useEffect(() => {
//     // Initialize user and token from localStorage
//     const storedUser = localStorage.getItem('currentUser');
//     const storedToken = localStorage.getItem('token');
//     if (storedUser && storedToken) {
//       setCurrentUser(JSON.parse(storedUser));
//       setToken(storedToken);
//     }
//   }, []);

//   useEffect(() => {
//     if (token && (!users || users.length === 0)) {
//       fetchUsers(); // Fetch users only if not already in state or the array is empty
//     }
//   }, [users]); 

//   const saveToken = (newToken: string, user: UserProfile) => {
//     try {
//     setToken(newToken);
//     setCurrentUser(user);
//     localStorage.setItem('token', newToken);
//     localStorage.setItem('currentUser', JSON.stringify(user));

//     const isSecure = process.env.NODE_ENV === 'production' ? 'secure;' : '';
//     document.cookie = `token=${newToken}; path=/; ${isSecure} samesite=strict; max-age=3600`; // Expires in 1 hour
//   } catch (error) {
//     console.error('Failed to save token to localStorage or cookies', error);
//   }
//   };

//   const fetchUsers = async ()=> {
//     try {
//       setLoading(true);
//       const fetchedUsers = await getUsers(token!);
//       setUsers(fetchedUsers!);
//       localStorage.setItem('usersList', JSON.stringify(users))
//     } catch (err) {
//       setError('Failed to fetch users. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };


//   const fetchUserById = async (token: string, id: number): Promise<UserProfile | null>  => {
//     try {
//       setLoading(true);
//       setError(null);
//       const fetchedUser = await getUserById(token!, id!);
//       return fetchedUser
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//     return null
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
//     localStorage.removeItem('currentUser');
//     localStorage.removeItem('token');
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
//         saveToken
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
// import { getUsers, getUserById, createUser } from '@/app/api/userApi';
// import { User, NewUserRequestBody, UserProfile } from '@/app/utilities/definitions';
// import { useRouter } from 'next/navigation';

// interface UserContextProps {
//   users: User[];
//   currentUser: UserProfile | null;
//   token: string | null;
//   loading: boolean;
//   error: string | null;
//   fetchUsers: () => Promise<void>;
//   fetchUserById: (id: string) => Promise<UserProfile | null>;
//   registerUser: (user: NewUserRequestBody) => Promise<string | null>;
//   logout: () => void;
//   setUsers: React.Dispatch<React.SetStateAction<User[]>>;
//   setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
//   saveToken: (token: string, user: UserProfile) => void;
// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [users, setUsers] = useState<User[]>(() => {
//     const savedUsers = localStorage.getItem('usersList');
//     return savedUsers ? JSON.parse(savedUsers) : [];
//   });
//   const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
//     const savedUser = localStorage.getItem('currentUser');
//     return savedUser ? JSON.parse(savedUser) : null;
//   });
//   const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const router = useRouter();

//   const saveToken = (newToken: string, user: UserProfile) => {
//     try {
//       setToken(newToken);
//       setCurrentUser(user);
//       localStorage.setItem('token', newToken);
//       localStorage.setItem('currentUser', JSON.stringify(user));

//       const isSecure = process.env.NODE_ENV === 'production' ? 'secure;' : '';
//       document.cookie = `token=${newToken}; path=/; ${isSecure} samesite=strict; max-age=3600`; // Expires in 1 hour
//     } catch (error) {
//       console.error('Failed to save token to localStorage or cookies', error);
//     }
//   };

//   const fetchUsers = async () => {
//     if (users.length > 0) return; // Avoid refetching if already available in local storage

//     try {
//       setLoading(true);
//       const fetchedUsers = await getUsers(token!);
//       setUsers(fetchedUsers!);
//       localStorage.setItem('usersList', JSON.stringify(fetchedUsers)); // Persist fetched users
//     } catch (err) {
//       setError('Failed to fetch users. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const fetchUserById = async (id: number): Promise<UserProfile | null> => {
//   //   try {
//   //     setLoading(true);
//   //     setError(null);

//   //     const savedUser = localStorage.getItem(`user_${id}`);
//   //     if (savedUser) return JSON.parse(savedUser); // Return cached user if available

//   //     const fetchedUser = await getUserById(token!, id);
//   //     localStorage.setItem(`user_${id}`, JSON.stringify(fetchedUser)); // Cache fetched user
//   //     return fetchedUser;
//   //   } catch (err: any) {
//   //     setError(err.message);
//   //     return null;
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };



// const fetchUserById = async (id: string): Promise<UserProfile | null> => {
//   if (!id) throw new Error('Invalid user ID');

//   setLoading(true);
//   setError(null);

//   try {

//     const savedUser = localStorage.getItem(`user_${id}`);
//     if (savedUser) return JSON.parse(savedUser);

//     const fetchedUser = await getUserById(id, token!);
//     if (!fetchedUser) throw new Error('User not found');

//     localStorage.setItem(`user_${id}`, JSON.stringify(fetchedUser));
//     return fetchedUser;
//   } catch (err: any) {
//     setError(err.message || 'Failed to fetch user.');
//     return null;
//   } finally {
//     setLoading(false);
//   }
// };





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
//     localStorage.removeItem('currentUser');
//     localStorage.removeItem('token');
//     localStorage.removeItem('usersList');
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
// import { getUsers, getUserById, createUser, updateUser } from '@/app/api/userApi';
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
//   registerUser: (user: NewUserRequestBody) => Promise<string | null>;
//   logout: () => void;
//   setUsers: React.Dispatch<React.SetStateAction<UserProfile[]>>;
//   setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
//   saveToken: (token: string, user: UserProfile) => void;
//   editUserById: (id: string, user: UpdatedUserRequestBody) => Promise<UserProfile | null>;
// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [users, setUsers] = useState<UserProfile[]>(() => {
//     const savedUsers = localStorage.getItem('usersList');
//     return savedUsers ? JSON.parse(savedUsers) : [];
//   });
//   const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
//     const savedUser = localStorage.getItem('currentUser');
//     return savedUser ? JSON.parse(savedUser) : null;
//   });
//   const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const router = useRouter();

//   const saveToken = (newToken: string, user: UserProfile) => {
//     try {
//       setToken(newToken);
//       setCurrentUser(user);
//       localStorage.setItem('token', newToken);
//       localStorage.setItem('currentUser', JSON.stringify(user));

//       const isSecure = process.env.NODE_ENV === 'production' ? 'secure;' : '';
//       document.cookie = `token=${newToken}; path=/; ${isSecure} samesite=strict; max-age=3600`; // Expires in 1 hour
//     } catch (error) {
//       console.error('Failed to save token to localStorage or cookies', error);
//     }
//   };


//   useEffect(() => {
//     const storedCurrentUser = localStorage.getItem('currentUser');
//     const storedUserList = localStorage.getItem('userList');

//     if (storedCurrentUser) {
//       setCurrentUser(JSON.parse(storedCurrentUser));
//     }
//     if (storedUserList) {
//       setUsers(JSON.parse(storedUserList));
//     }
//   }, []);

//   const fetchUsers = async () => {
//     if (users.length > 0) return; // No need to fetch if users already exist
//     try {
//       setError(null)
//       setLoading(true);

//       const fetchedUsers = await getUsers(token!);
//       setUsers(fetchedUsers!);
//       console.log('fetchedUsers in context:', fetchedUsers)
//       localStorage.setItem('usersList', JSON.stringify(fetchedUsers));
//     } catch (err) {
//       setError('Failed to fetch users. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUserById = async (id: string): Promise<User | null> => {
//     try {
//       setError(null)
//       setLoading(true);

//       const fetchedUser = await getUserById(id, token!);
//       console.log('id in usercontext:', id)
//       console.log('fetched user in context:', fetchedUser)
//       localStorage.setItem('currentUser', JSON.stringify(fetchedUser));
//       return fetchedUser;
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//     return null;
//   };

//   // const editUserById = async (id: string, updatedUser: UpdatedUserRequestBody): Promise<UserProfile| null, token: string> => {
//   //   if (!token) {
//   //     throw new Error('Authorization token is missing.');
//   //   }

//   //   try {
//   //     setError(null);
//   //     setLoading(true);

//   //     const updatedUserResponse = await updateUser(id, token, updatedUser);

//   //     console.log('id in userContext:', id);
//   //     console.log('Updated user in context:', updatedUserResponse);

//   //     // Update the users array state
//   //     // setUsers((prevUsers) => {
//   //     //   // Replace the updated user in the users array
//   //     //   return prevUsers.map((user) =>
//   //     //     user.id === updatedUserResponse!.id ? { ...user, ...updatedUserResponse } : user
//   //     //   );
//   //     // });
//   //     setCurrentUser(updatedUserResponse);
//   //     // Optionally store the updated user in localStorage
//   //     localStorage.setItem('currentUser', JSON.stringify(updatedUserResponse));

//   //     return updatedUserResponse;
//   //   } catch (err: unknown) {
//   //     const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
//   //     setError(errorMessage);
//   //     return null; // Explicitly returning null in case of failure
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };



//   // const editUserById = async (
//   //   id: string,
//   //   updatedUser: UpdatedUserRequestBody
//   // ): Promise<UserProfile | null> => {
//   //   const token = localStorage.getItem('token'); // Fetch the token from storage
  
//   //   if (!token) {
//   //     throw new Error('Authorization token is missing.');
//   //   }
  
//   //   try {
//   //     setError(null);
//   //     setLoading(true);
  
//   //     // Send the request with the stored token
//   //     const { user: updatedUserResponse } = await updateUser(id, token, updatedUser);
  
//   //     console.log('id in userContext:', id);
//   //     console.log('Updated user in context:', updatedUserResponse);
  
//   //     // Ensure the response is in a flattened UserProfile format
//   //     const flattenedUser: UserProfile = {
//   //       id: updatedUserResponse?.id ?? null,
//   //       username: updatedUserResponse?.username ?? '',
//   //       email: updatedUserResponse?.email ?? '',
//   //       role: updatedUserResponse?.role ?? '',
//   //     };
  
//   //     // Update the current user in state and local storage
//   //     setCurrentUser(flattenedUser);
//   //     localStorage.setItem('currentUser', JSON.stringify(flattenedUser));
  
//   //     // Refresh the users list by calling fetchUsers
//   //     await fetchUsers();
  
//   //     return flattenedUser;
//   //   } catch (err: unknown) {
//   //     const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
//   //     setError(errorMessage);
//   //     return null; // Explicitly returning null in case of failure
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
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
  
//       // Send the request with the stored token
//       const { user: updatedUserResponse, users: updatedUsersArray, token: newToken } = await updateUser(id, token, updatedUser);
  
//       console.log('id in userContext:', id);
//       console.log('Updated user in context:', updatedUserResponse);
//       console.log('Updated user in context:', updatedUsersArray);
//       // Ensure the response is in a flattened UserProfile format
//       const flattenedUser: UserProfile = {
//         id: updatedUserResponse?.id ?? null,
//         username: updatedUserResponse?.username ?? '',
//         email: updatedUserResponse?.email ?? '',
//         role: updatedUserResponse?.role ?? '',
//       };
  
//       // Update the current user in state and local storage
//       setCurrentUser(flattenedUser);
//       localStorage.setItem('currentUser', JSON.stringify(flattenedUser));
  
//       // Update the users list in state and local storage with the new users array
//       setUsers(updatedUsersArray!); // Assuming `setUsers` is the state updater function for the user list
//       localStorage.setItem('userList', JSON.stringify(updatedUsersArray)); // Assuming the user list is stored under 'userList'
  
//       // Replace the token in state and local storage with the new token
//       setToken(newToken!); // Assuming `setToken` is the state updater function for the token
//       localStorage.setItem('token', newToken!); // Replacing the old token in localStorage
  
//       return flattenedUser;
//     } catch (err: unknown) {
//       const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
//       setError(errorMessage);
//       return null; // Explicitly returning null in case of failure
//     } finally {
//       setLoading(false);
//     }
//   };
  



//   // const editUserById = async (id: string, updatedUser: UpdatedUserRequestBody): Promise<UserProfile | null> => {
//   //   if (!token) {
//   //     throw new Error('Authorization token is missing.');
//   //   }

//   //   try {
//   //     setError(null);
//   //     setLoading(true);

//   //     // Update user details on the server
//   //     const updatedUserResponse = await updateUser(id, token, updatedUser);

//   //     console.log('id in userContext:', id);
//   //     console.log('Updated user in context:', updatedUserResponse);

//   //     // Update currentUser if the edited user is the current user
//   //     if (currentUser && currentUser.id === updatedUserResponse!.id) {
//   //       setCurrentUser(updatedUserResponse);
//   //       localStorage.setItem('currentUser', JSON.stringify(updatedUserResponse));
//   //     }

//   //     // Update the userList state
//   //     setUsers((prevUsers) => {
//   //       const updatedUserList = prevUsers.map((user) =>
//   //         user.id === updatedUserResponse.id ? { ...user, ...updatedUserResponse } : user
//   //       );
//   //       // Update the user list in localStorage
//   //       localStorage.setItem('userList', JSON.stringify(updatedUserList));
//   //       return updatedUserList;
//   //     });

//   //     return updatedUserResponse;
//   //   } catch (err: unknown) {
//   //     const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
//   //     setError(errorMessage);
//   //     return null;
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };


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
//     setUsers([])
//     localStorage.removeItem('currentUser');
//     localStorage.removeItem('token');
//     localStorage.removeItem('usersList');
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
//         editUserById
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
import { User, NewUserRequestBody, UserProfile, UpdatedUserRequestBody } from '@/app/utilities/definitions';
import { useRouter } from 'next/navigation';

interface UserContextProps {
  users: UserProfile[];
  currentUser: UserProfile | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  fetchUserById: (id: string) => Promise<User | null>;
  registerUser: (user: NewUserRequestBody) => Promise<string | null>;
  logout: () => void;
  setUsers: React.Dispatch<React.SetStateAction<UserProfile[]>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  saveToken: (token: string, user: UserProfile) => void;
  editUserById: (id: string, user: UpdatedUserRequestBody) => Promise<UserProfile | null>;
  removeUser: (id: string) => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    const savedUser = localStorage.getItem("currentUser");
    const savedToken = localStorage.getItem("token");
  
    // Handle savedUsers
    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers));
      } catch (error) {
        console.error("Error parsing savedUsers from localStorage:", error);
        setUsers([]); // Fallback to empty array if parsing fails
      }
    } else {
      console.warn("No users found in localStorage");
      setUsers([]); // Default to empty array if nothing is stored
    }
  
    // Handle savedUser
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing savedUser from localStorage:", error);
        setCurrentUser(null); // Fallback to null if parsing fails
      }
    } else {
      console.warn("No current user found in localStorage");
      setCurrentUser(null); // Default to null if nothing is stored
    }

    if (savedToken) {
      try {
        setToken(savedToken);
      } catch (error) {
        console.error("Error parsing savedUser from localStorage:", error);
        setToken(null); // Fallback to null if parsing fails
      }
    } else {
      console.warn("No token found in localStorage");
      setToken(null); // Default to null if nothing is stored
    }
  }, []);
  

  const saveToken = (newToken: string, user: UserProfile) => {
    try {
      setToken(newToken);
      setCurrentUser(user);
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', newToken);
        localStorage.setItem('currentUser', JSON.stringify(user));
        const isSecure = process.env.NODE_ENV === 'production' ? 'secure;' : '';
        document.cookie = `token=${newToken}; path=/; ${isSecure} samesite=strict; max-age=3600`; // Expires in 1 hour
      }
    } catch (error) {
      console.error('Failed to save token to localStorage or cookies', error);
    }
  };

  const fetchUsers = async () => {
    if (users.length > 0) return; // No need to fetch if users already exist
    try {
      setError(null);
      setLoading(true);

      const fetchedUsers = await getUsers(token!);
      setUsers(fetchedUsers!);
      console.log('fetchedUsers in context:', fetchedUsers);
      if (typeof window !== 'undefined') {
        localStorage.setItem('usersList', JSON.stringify(fetchedUsers));
      }
    } catch (err) {
      setError('Failed to fetch users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserById = async (id: string): Promise<User | null> => {
    try {
      setError(null);
      setLoading(true);
  
      const fetchedUser = await getUserById(id, token!);
      console.log('id in usercontext:', id);
      console.log('fetched user in context:', fetchedUser);
  
      if (typeof window !== 'undefined') {
        localStorage.setItem(`user_${id}`, JSON.stringify(fetchedUser));
      }
  
      return fetchedUser;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  
    return null;
  };
  
  

  const editUserById = async (
    id: string,
    updatedUser: UpdatedUserRequestBody
  ): Promise<UserProfile | null> => {
    const token = localStorage.getItem('token'); // Fetch the token from storage

    if (!token) {
      throw new Error('Authorization token is missing.');
    }

    try {
      setError(null);
      setLoading(true);

      const { user: updatedUserResponse, users: updatedUsersArray, token: newToken } = await updateUser(id, token, updatedUser);

      console.log('id in userContext:', id);
      console.log('Updated user in context:', updatedUserResponse);
      console.log('Updated users in context:', updatedUsersArray);
      
      // const flattenedUser: UserProfile = {
      //   id: updatedUserResponse?.id ?? null,
      //   username: updatedUserResponse?.username ?? '',
      //   email: updatedUserResponse?.email ?? '',
      //   role: updatedUserResponse?.role ?? '',

      // };

      if(updatedUserResponse && updatedUsersArray && token)

      setCurrentUser(updatedUserResponse);
      setUsers(updatedUsersArray!);
      setToken(token)
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentUser', JSON.stringify(updatedUserResponse));
        localStorage.setItem('userList', JSON.stringify(updatedUsersArray));
        localStorage.setItem('token', newToken!);
      }

      return updatedUserResponse;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      return null; // Explicitly returning null in case of failure
    } finally {
      setLoading(false);
    }
  };


  const removeUser = async (id: string) => {
    try {
      setError(null);
      setLoading(true);
  
      // Call the deleteUser API and get the updated users array
      const deletedUserResponse = await deleteUser(id, token!);
      console.log('Updated users after deletion:', deletedUserResponse);
  
      if(deletedUserResponse) {
        setUsers(deletedUserResponse.users);  
          // Update localStorage with the new users list
      localStorage.setItem('usersList', JSON.stringify(deletedUserResponse.users));
  
      }
      
    
  
      // Optionally: Handle success (e.g., showing a success message)
    } catch (err: any) {
      setError('Failed to delete user. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  

  const registerUser = async (newUser: NewUserRequestBody): Promise<string | null> => {
    try {
      setLoading(true);
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

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    setUsers([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      localStorage.removeItem('usersList');
      localStorage.removeItem('user_${id}');
    }
    router.push('/'); // Redirect to homepage
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
        removeUser
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
