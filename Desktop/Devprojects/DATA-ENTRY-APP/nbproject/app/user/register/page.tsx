
'use client';

import React, { useState } from 'react';
import UserForm from '@/app/components/User/UserForm';
import { NewUserRequestBody } from '@/app/utilities/definitions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUserContext } from '@/app/context/userContext';

const UserRegistration = () => {
  const { registerUser, loading, error } = useUserContext(); // Using context for state
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleRegister = async (newUser: NewUserRequestBody): Promise<void> => {
    console.log('User object received in register page:', newUser);
    setErrorMessage('');

    try {
      // Await the return value from registerUser
      const role = await registerUser(newUser); // Call registerUser directly

      if (role === 'user') {
        router.push('/employee');
      } else if (role === 'admin') {
        router.push('/admin');
      } else {
        setErrorMessage('Unexpected role. Please contact support.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message || 'Registration failed. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex h-auto items-center flex-col">
      <div className="w-full md:w-1/2 h-full bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {errorMessage && (
            <div className="text-red-600 bg-red-100 p-3 rounded mb-4">
              <strong>{errorMessage}</strong>
            </div>
          )}

          {loading ? (
            <div className="text-center text-rose-600">Processing...</div>
          ) : (
            <UserForm onSubmit={handleRegister} />
          )}
        </div>
      </div>

      <div className="w-full md:w-[40%] h-16 bg-gradient-to-r from-bkue-100 to-blue-500 flex align-middle justify-between p-6 rounded-lg border-2">
        <p className="text-lg font-semibold text-blue-600 mb-4">Already have an account?</p>
        <Link href="/user/login">
          <button className=" bg-blue-100 text-blue-600 h-10 w-20 rounded-lg shadow-md transition-colors duration-200 hover:bg-red-800 hover:text-rose-100">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserRegistration;
