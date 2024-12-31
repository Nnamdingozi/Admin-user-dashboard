'use client';

import React, { useState, useEffect } from 'react';
import { UpdatedUserRequestBody, UserProfile } from '@/app/utilities/definitions';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

export interface UserEditProps {
  initialValues: UserProfile | UpdatedUserRequestBody;
  onSubmit: (data: UpdatedUserRequestBody) => void;
}

const editUserSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .optional(),
  email: Yup.string()
    .email('Invalid email address')
    .optional(),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .optional(),
  privacyPolicy: Yup.boolean().required('You must accept the privacy policy'),
  role: Yup.mixed<'admin' | 'user'>()
    .oneOf(['admin', 'user'], 'Invalid role')
    .optional(),
});

const UserEdit: React.FC<UserEditProps> = ({ initialValues, onSubmit }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<UpdatedUserRequestBody>({
    username: initialValues.username || '',
    email: initialValues.email || '',
    password: '',
    privacyPolicy: false,
    role: initialValues.role || '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData({
      username: initialValues.username || '',
      email: initialValues.email || '',
      password: '',
      role: initialValues.role || '',
      privacyPolicy: false,
    });
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' || type === 'radio' ? (e.target as HTMLInputElement).checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate the entire form using Yup
      await editUserSchema.validate(formData, { abortEarly: false });

      // No errors, call onSubmit
      await onSubmit(formData);
    } catch (err: any) {
      if (err instanceof Yup.ValidationError) {
        // Collect all validation errors
        const newErrors: { [key: string]: string } = {};
        err.inner.forEach((error: Yup.ValidationError) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        {errors.username && <p className="text-red-600 text-sm">{errors.username}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="privacyPolicy"
            checked={formData.privacyPolicy}
            onChange={handleChange}
            className="mr-2"
          />
          Accept Privacy Policy
        </label>
        {errors.privacyPolicy && <p className="text-red-600 text-sm">{errors.privacyPolicy}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="role" className="block text-gray-700">Role</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          <option value="" disabled>Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        {errors.role && <p className="text-red-600 text-sm">{errors.role}</p>}
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none"
          onClick={() => router.push('/')}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserEdit;
