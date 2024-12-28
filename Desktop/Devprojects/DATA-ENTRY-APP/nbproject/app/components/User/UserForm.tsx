// import React, { useState } from 'react';
// // import { useHistory } from 'react-router-dom';
// // import './UserForm.css';

// function UserForm() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     privacyPolicy: false,
//   });
//   const history = useHistory();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Submit form data to server
//     console.log('Form data submitted:', formData);
//     history.push('/');
//   };

//   const handleCancel = () => {
//     history.push('/');
//   };

//   return (
//     <form className="user-form" onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label htmlFor="username">Username</label>
//         <input
//           type="text"
//           id="username"
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="password">Password</label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//       </div>
// <div className="form-group">
//   <label>
//     <input
//       type="radio"
//       name="privacyPolicy"
//       checked={formData.privacyPolicy}
//       onChange={handleChange}
//       required
//     />
//     Accept Privacy Policy
//   </label>
// </div>
//       <div className="form-buttons">
//         <button type="submit">Submit</button>
//         <button type="button" onClick={handleCancel}>Cancel</button>
//       </div>
//     </form>
//   );
// }

// export default UserForm;




'use client';

import { NewUserRequestBody } from '@/app/utilities/definitions';
import { useState } from 'react';
import * as Yup from 'yup';

interface UserFormProps {
  onSubmit: (userInput: NewUserRequestBody) => Promise<void>;
}

// Yup schema for validation

const registrationSchema = Yup.object().shape({
  username: Yup.string().min(3).required('Username is required'),
  email: Yup.string().email().required('Email is required'),
  password: Yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
  privacyPolicy: Yup.boolean().oneOf([true], 'Privacy policy acceptance is required').required(),

  role: Yup.string().oneOf(['admin', 'user']).required('Role is required'),

});


const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [userInput, setUserInput] = useState({
    username: '',
    email: '',
    password: '',
    privacyPolicy: false,
    role: '', 

  });
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, privacyPolicy: e.target.checked });
  };

  const validateField = async (fieldName: keyof typeof userInput) => {
    try {
      await registrationSchema.validateAt(fieldName, userInput);  // Use validateAt instead of yup.reach
      setError((prev) => ({ ...prev, [fieldName]: '' }));
    } catch (err: any) {
      if (err instanceof Yup.ValidationError) {
        setError((prev) => ({ ...prev, [fieldName]: err.message }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registrationSchema.validate(userInput, { abortEarly: false });
      await onSubmit(userInput);
      setUserInput({ username: '', email: '', password: '',  role: '', privacyPolicy: false});
      setError({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          newErrors[error.path || 'general'] = error.message;
        });
        setError(newErrors);
      } else {
        setError({ general: 'An error occurred, please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="h-auto p-8 border border-gray-200 w-full max-w-md mx-auto rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="font-semibold text-center text-red-800 mb-4">Register a new account</h2>

      <div className="mb-4">
        <label htmlFor="username" className="sr-only">Username</label>
        <input
          id="username"
          className="h-10 w-full p-2 border border-rose-300 rounded focus:outline-none focus:border-red-600 text-black"
          type="text"
          name="username"
          placeholder="Username"
          value={userInput.username}
          onChange={handleInputChange}
          onBlur={() => validateField('username')}
          aria-invalid={!!error.username}
          aria-describedby="username-error"
          required
        />
        {error.username && <p id="username-error" className="text-red-600 text-sm">{error.username}</p>}

      </div>

      <div className="mb-4">
        <label htmlFor="email" className="sr-only">Email</label>
        <input
          id="email"
          className="h-10 w-full p-2 border border-rose-300 rounded focus:outline-none focus:border-red-600 text-black"
          type="email"
          name="email"
          placeholder="Email"
          value={userInput.email}
          onChange={handleInputChange}
          onBlur={() => validateField('email')}
          aria-invalid={!!error.email}
          aria-describedby="email-error"
          required
        />
        {error.email && <p id="email-error" className="text-red-600 text-sm">{error.email}</p>}
      </div>


      <div className="mb-4">
        <label htmlFor="password" className="sr-only">Password</label>
        <input
          id="password"
          className="h-10 w-full p-2 border border-rose-300 rounded focus:outline-none focus:border-red-600 text-gray-700"
          type="password"
          name="password"
          placeholder="Password"
          value={userInput.password}
          onChange={handleInputChange}
          onBlur={() => validateField('password')}
          aria-invalid={!!error.password}
          aria-describedby="password-error"
          required
        />
        {/* <small className="text-gray-500">Password must include uppercase, lowercase, number, and special character.</small> */}
        {error.password && <p id="password-error" className="text-red-600 text-sm">{error.password}</p>}
      </div>


      <div className="mb-4">
        <label htmlFor="privacyPolicy" className="flex items-center">
          <input
            type="checkbox"
            name="privacyPolicy"
            checked={userInput.privacyPolicy}
            onChange={handleCheckboxChange}
            required
            className="mr-2"
          />
          Accept Privacy Policy
        </label>
        {error.privacyPolicy && <p className="text-red-600 text-sm">{error.privacyPolicy}</p>}
      </div>


      <div className="mb-4">
        <label htmlFor="role" className="sr-only">Role</label>
        <select
          id="role"
          className="h-10 w-full p-2 border border-rose-300 rounded focus:outline-none focus:border-red-600 text-gray-700"
          name="role"
          value={userInput.role}
          onChange={handleInputChange}
          onBlur={() => validateField('role')}
          aria-invalid={!!error.role}
          aria-describedby="role-error"
          required
        >
          <option value="" disabled>Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        {error.role && <p id="role-error" className="text-red-600 text-sm">{error.role}</p>}
      </div>




      <button
        className="bg-rose-100 text-red-800 font-semibold h-12 w-full rounded mt-6 hover:bg-red-800 hover:text-rose-100"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default UserForm;

