"use client";

import UserLogin from '@/app/components/AccessLog/loginForm';
import { LoginRequest } from '@/app/utilities/definitions';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useUserContext } from '@/app/context/userContext';
import { login } from '@/app/api/loginApi';

const UserLoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { saveToken } = useUserContext();
  const router = useRouter();

  const handleLogin = useCallback(async (loginData: LoginRequest): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await login(loginData);

      if (response && response.token && response.user) {
        const { token, user } = response;

        // Save token and set user in context
        localStorage.setItem('token', token);
        saveToken(token, user);

        // Navigate based on role
        const { role } = user;
        role === 'user' ? router.push('/employee') : router.push('/admin');
      } else {
        throw new Error('Invalid login response from server.');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage = err?.response?.data?.message || 'An error occurred during login.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [ router, saveToken]);

  return (
    <div className="LoginContainer">
      {error && <p className="error-text">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <UserLogin onSubmit={handleLogin} />
      )}
    </div>
  );
};

export default UserLoginForm;
