'use client'

import React, { useEffect } from 'react';
import { useUserContext } from '@/app/context/userContext';
import UserView from '@/app/components/User/UserView';
import { User } from '@/app/utilities/definitions';

export default function ViewUserPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const { fetchUserById, userById, loading, error } = useUserContext();

  // Unwrap `params` using `React.use()`
  const params = React.use(paramsPromise);
  const { id } = params;
  console.log('id from params in useView page:', id);

  useEffect(() => {
    if (!id) {
      return;
    }

    async function fetchData() {
      // Trigger fetching user data from the context
      await fetchUserById(id);
    }

    fetchData();
  }, [id]);

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
