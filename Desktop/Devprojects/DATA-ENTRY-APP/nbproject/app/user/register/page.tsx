

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

  // Handle user registration
  // Handle user registration
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

      <div className="w-full md:w-[40%] h-28 bg-gradient-to-r from-rose-100 to-red-800 flex flex-col items-center justify-center p-6 rounded-lg">
        <p className="text-lg font-semibold text-white mb-4">Already have an account?</p>
        <Link href="/user/login">
          <button className="mt-3 bg-rose-100 text-red-800 px-6 py-2 rounded-lg shadow-md transition-colors duration-200 hover:bg-red-800 hover:text-rose-100">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserRegistration;
