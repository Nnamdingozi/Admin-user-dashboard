
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useUserContext } from '@/app/context/userContext';
// import UserView from '@/app/components/User/UserView';
// import { User } from '@/app/utilities/definitions';

// export default function ViewUserPage({
//   params: paramsPromise,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const { fetchUserById } = useUserContext();

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

//   async function fetchData() {
//     try {
//       setLoading(true);
//       setError(null);

//       const result = await fetchUserById(id);
//       console.log('user data fetched in userview page:', result);

//       if (result) {
//         setUser(result);
//         localStorage.setItem('user', JSON.stringify(result));
//       } else {
//         throw new Error(`User with id ${id} not found`);
//       }
//     } catch (err: any) {
//       setError(err.message || 'An error occurred while fetching user data.');
//     } finally {
//       setLoading(false);
//     }
//   }

//   fetchData();
// }, [id]);

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

//   if (!user) {
//     return <div>User not found.</div>;
//   }

//   return <UserView user={user} />;
// }

'use client';

import React, { useState, useEffect } from 'react';
import { useUserContext } from '@/app/context/userContext';
import UserView from '@/app/components/User/UserView';
import { User } from '@/app/utilities/definitions';

export default function ViewUserPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const [userById, setUserById] = useState<User | null>(null);
  const { fetchUserById, loading, error } = useUserContext();

  // Unwrap `params` using `React.use()`
  const params = React.use(paramsPromise);
  const { id } = params;
  console.log('id from params in useView page:', id);

  useEffect(() => {
    if (!id) {
      return;
    }

    async function fetchData() {
      // Check if user is already in local storage
      const localStorageKey = `user_${id}`;
      const storedUser = localStorage.getItem(localStorageKey);

      if (storedUser) {
        console.log('User fetched from local storage:', storedUser);
        setUserById(JSON.parse(storedUser));
        return;
      }

      // If not in local storage, fetch from API
      try {
        const result = await fetchUserById(id);
        console.log('User data fetched from API:', result);

        if (result) {
          setUserById(result);
          // Store fetched data in local storage
          localStorage.setItem(localStorageKey, JSON.stringify(result));
        } else {
          throw new Error(`User with id ${id} not found`);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    }

    fetchData();
  }, [id, fetchUserById]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => location.reload()}>Retry</button>
      </div>
    );
  }

  if (!userById) {
    return <div>User not found.</div>;
  }

  return <UserView user={userById} />;
}
