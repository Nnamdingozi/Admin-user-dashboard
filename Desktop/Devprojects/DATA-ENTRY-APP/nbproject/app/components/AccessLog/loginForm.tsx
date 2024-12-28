// 'use client';

// import { LoginRequest } from '@/app/utilities/definitions';
// import { useState } from 'react';

// interface UserLoginProps {
//   onSubmit: (userInput: LoginRequest) => Promise<{ token: string } | void>;
// }

// const UserLogin: React.FC<UserLoginProps> = ({ onSubmit}) => {
//   const [userInput, setUserInput] = useState({ username: '', password: '' });
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUserInput({ ...userInput, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!userInput.username || !userInput.password) {
//       setError('Both email and password are required.');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       console.log('User input passed to submit:', userInput);
//       await onSubmit(userInput); // the logic of storing the token is handled outside

//     } catch (err) {
//       setError(`User login failed: ${err}`);
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <form
//         className='mx-auto w-[50%] rounded justify-center align-middle border-2 border-red-950 bg-gray-100'
//         onSubmit={handleSubmit}
//       >
//         <input
//           className='h-10 w-[80%] mb-3 rounded mt-4'
//           type='username'
//           name='username'
//           placeholder='username'
//           value={userInput.username}
//           onChange={handleInputChange}
//           required
//           autoComplete='username'
//         />

//         <input
//           className='h-10 w-[80%] mb-3 rounded'
//           type='password'
//           name='password'
//           placeholder='password'
//           value={userInput.password}
//           onChange={handleInputChange}
//           required
//           autoComplete='current-password'
//         />

//         <button
//           className='bg-rose-100 text-red-800 h-8 w-32 border-3 mb-5 border-red-800 rounded focus:bg-red-800 focus:text-rose-100'
//           type='submit'
//         >
//           {loading ? 'Logging in...' : 'Log In'}
//         </button>

//         {error && <p className='text-red-600 mt-4 text-center'>{error}</p>}
//       </form>
      
      
//     </div>
//   );
// };

// export default UserLogin;


'use client';

import { LoginRequest } from '@/app/utilities/definitions';
import { useState } from 'react';

interface UserLoginProps {
  onSubmit: (userInput: LoginRequest) => Promise<{ token: string } | void>;
}

const UserLogin: React.FC<UserLoginProps> = ({ onSubmit }) => {
  const [userInput, setUserInput] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.username || !userInput.password) {
      setError('Both username and password are required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onSubmit(userInput);
    } catch (err) {
      setError(`Login failed: ${err}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        className="mx-auto w-[50%] rounded justify-center align-middle border-2 border-red-950 bg-gray-100"
        onSubmit={handleSubmit}
      >
        <input
          className="h-10 w-[80%] mb-3 rounded mt-4"
          type="text"
          name="username"
          placeholder="username"
          value={userInput.username}
          onChange={handleInputChange}
          required
          autoComplete="username"
        />

        <input
          className="h-10 w-[80%] mb-3 rounded"
          type="password"
          name="password"
          placeholder="password"
          value={userInput.password}
          onChange={handleInputChange}
          required
          autoComplete="current-password"
        />

        <button
          className="bg-rose-100 text-red-800 h-8 w-32 border-3 mb-5 border-red-800 rounded focus:bg-red-800 focus:text-rose-100"
          type="submit"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default UserLogin;
