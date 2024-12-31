
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
   
    if (updatedProfile?.user) {
     
      const { role  } = updatedProfile.user.user;

      switch (role) {
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

