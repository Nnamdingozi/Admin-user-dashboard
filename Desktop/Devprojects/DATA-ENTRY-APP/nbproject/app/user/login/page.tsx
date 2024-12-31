'use client';

import UserLogin from '@/app/components/AccessLog/loginForm';
import { LoginRequest } from '@/app/utilities/definitions';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useUserContext } from '@/app/context/userContext';
import { login } from '@/app/api/loginApi';
import { useAccessLogContext } from '@/app/context/accesslogContext';
import { UserProfile } from '@/app/utilities/definitions';

const UserLoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { saveToken } = useUserContext();
  const router = useRouter();
  const { setAccessLogs, setAccessLog } = useAccessLogContext();

  const handleLogin = useCallback(async (loginData: LoginRequest): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
        const responseData = await login(loginData);

        // Validate response data
        if (!responseData.token || !responseData.user ) {
            throw new Error('Missing required fields in login response.');
        }

        const {user, token, accessLog } = responseData;
        console.log('user from login:', user);
        console.log('token from loging:', token)

        // Save token and user details
        try {
            localStorage.setItem('token', token);
            localStorage.setItem('accessLog', JSON.stringify(accessLog));
        } catch (storageError) {
            console.warn('LocalStorage is unavailable:', storageError);
        }

        // Save token and user profile
        saveToken(token, {
            id: user.id,
            username: user.user?.username || 'Unknown User',
            email: user.user?.email || 'Unknown Email',
            role: user.user?.role ?? null,
        });

        // Save access logs
        setAccessLogs((prevLogs) => [...prevLogs, accessLog]);
        setAccessLog(accessLog)

        // Redirect based on user role
        const userRole = user.user?.role;
        if (userRole) {
            router.push(userRole === 'user' ? '/employee' : '/admin');
        } else {
            throw new Error('User role is undefined.');
        }
    } catch (err: any) {
        console.error('Login error:', {
            message: err.message,
            stack: err.stack,
            response: err.response?.data,
        });

        const errorMessage = err.message || 'An unexpected error occurred.';
        setError(errorMessage);
    } finally {
        setLoading(false);
    }
  }, [router, saveToken, setAccessLogs]);

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






// 'use client';

// import UserLogin from '@/app/components/AccessLog/loginForm';
// import { LoginRequest } from '@/app/utilities/definitions';
// import { useRouter } from 'next/navigation';
// import { useState, useCallback } from 'react';
// import { useUserContext } from '@/app/context/userContext';
// import { login } from '@/app/api/loginApi';
// import { useAccessLogContext } from '@/app/context/accesslogContext';
// import { UserProfile } from '@/app/utilities/definitions';

// const UserLoginForm: React.FC = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const { saveToken } = useUserContext();
//   const router = useRouter();
//   const { setAccessLogs, setAccessLog } = useAccessLogContext();

//   const handleLogin = useCallback(async (loginData: LoginRequest): Promise<void> => {
//     setLoading(true);
//     setError(null);

//     try {
//         const response = await login(loginData);

        

//         if (response?.token && response?.user && response?.accessLog) {
//             const { token, user, accessLog } = response;

//             // Save token and user details
//             try {
//                 localStorage.setItem('token', token);
//                 localStorage.setItem('accessLog', JSON.stringify(accessLog));
//             } catch (storageError) {
//                 console.warn('LocalStorage is unavailable:', storageError);
//             }

//             saveToken(token, {
//                 id: user.id,
//                 username: user.user?.username || 'Unknown User',
//                 email: user.user?.email || 'Unknown Email',
//                 role: user.user?.role ?? null,
//             });

//             // Save access logs
//             setAccessLogs((prevLogs) => [...prevLogs, accessLog]);

//             // Redirect based on role
//             const userRole = user.user?.role;
//             if (userRole) {
//                 router.push(userRole === 'user' ? '/employee' : '/admin');
//             } else {
//                 throw new Error('User role is undefined.');
//             }
//         } else {
//             throw new Error('Invalid login response from server.');
//         }
//     } catch (err: any) {
//         console.error('Login error:', {
//             message: err.message,
//             stack: err.stack,
//             response: err.response?.data,
//         });

//         const errorMessage = err.message || 'An unexpected error occurred.';
//         setError(errorMessage);
//     } finally {
//         setLoading(false);
//     }
// }, [router, saveToken, setAccessLogs]);



  // const handleLogin = useCallback(async (loginData: LoginRequest): Promise<void> => {
  //   setLoading(true);
  //   setError(null);
  
  //   try {
  //     const response = await login(loginData);
  
  //     if (response?.token && response?.user && response?.accessLog) {
  //       const { token, user, accessLog } = response;
  
  //       // Save token and user details
  //       localStorage.setItem('token', token);
  //       saveToken(token, {
  //         id: user.id,
  //         username: user.user.username,
  //         email: user.user.email,
  //         role: user.user.role ?? null,
  //       });
  
  //       // Save access logs
  //       localStorage.setItem('accessLog', JSON.stringify(accessLog));
  //       setAccessLogs((prevLogs) => [...prevLogs, accessLog]);
  
  //       // Redirect based on role
  //       router.push(user.user.role === 'user' ? '/employee' : '/admin');
  //     } else {
  //       throw new Error('Invalid login response from server.');
  //     }
  //   } catch (err: any) {
  //     console.error('Login error:', err);
  //     const errorMessage = err?.message || 'An unexpected error occurred.';
  //     setError(errorMessage);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [router, saveToken, setAccessLogs]);
  

//   return (
//     <div className="LoginContainer">
//       {error && <p className="error-text">{error}</p>}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <UserLogin onSubmit={handleLogin} />
//       )}
//     </div>
//   );
// };

// export default UserLoginForm;
