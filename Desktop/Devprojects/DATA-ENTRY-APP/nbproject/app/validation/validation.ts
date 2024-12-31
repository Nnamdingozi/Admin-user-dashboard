
import axios, { AxiosError } from 'axios';
import * as Yup from 'yup';
import { ApiError } from '@/app/validation/errorEnum';
import { LoginRequest, UpdatedUserRequestBody } from '@/app/utilities/definitions';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';


const userSchema = Yup.object().shape({
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
  privacyPolicy: Yup.boolean().required('Privacy policy acceptance is required'),

  role: Yup.mixed<'admin' | 'user'>().oneOf(['admin', 'user']).required('Role is required'),
});

// Login validation schema
const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters long')
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
});


const editUserSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .optional(), // Allows the field to be omitted or undefined
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
  privacyPolicy: Yup.boolean()
    .required(), 
  role: Yup.mixed<'admin' | 'user'>()
    .oneOf(['admin', 'user'], 'Invalid role')
    .optional(),
});




const accessLogSchema = Yup.object().shape({
  userId: Yup.string().min(3).required('Username is required'),
  accessTime: Yup.string().email().required('Email is required'),
  accessLocate: Yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
  privacyPolicy: Yup.boolean().required('Privacy policy acceptance is required'),

  role: Yup.mixed<'admin' | 'user'>().oneOf(['admin', 'user']).required('Role is required'),
});


// Automatically attach token to requests
export const configWithToken = (token: string | null) => ({
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

// Validate if the server's response has valid data
export const validatePayload = async (payload: any) => {
  try {
    await userSchema.validate(payload); // Validate with Yup schema
    return true;
  } catch (err: any) {
    console.error('Validation failed:', err.message);
    return false;
  }
};

// Utility function to validate login payload
export const validateLogin = async (payload: LoginRequest): Promise<boolean> => {
  try {
    console.log('Validating login payload:', payload); // Debugging payload
    await loginSchema.validate(payload, { abortEarly: false }); // Show all validation errors
    return true;
  } catch (err: Yup.ValidationError | any) {
    console.error('Validation errors:', err.errors); // Log all validation errors
    return false;
  }
};
export const handleApiError = (err: unknown): string => {
  // Check if the error is an Axios error
  if (axios.isAxiosError(err)) {
    if (!err.response) {
      console.error('Network error:', err);
      return ApiError.NETWORK_ERROR; // Ensure this is a string
    }

    // Handle specific status codes
    if (err.response.status === 401) {
      console.error('Authentication error:', err.response);
      return ApiError.AUTH_ERROR; // Ensure this is a string
    }

    if (err.response.status >= 500) {
      console.error('Server error:', err.response);
      return ApiError.SERVER_ERROR; // Ensure this is a string
    }

    // Handle client errors with fallback for message
    console.error('Client error:', err.response);
    return err.response.data?.message ?? ApiError.UNKNOWN_ERROR;  // Provide fallback value if message is undefined
  }

  // Handle cases where the error is an instance of Error
  if (err instanceof Error) {
    console.error('Unexpected error:', err.message);
    return err.message ?? ApiError.UNKNOWN_ERROR;  // Provide fallback value if message is undefined
  }

  // Default to a generic error message if the error is not recognized
  return ApiError.UNKNOWN_ERROR;  // Ensure fallback value is always a string
};




// Axios instance with baseURL and default headers
export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const validateUpdate = async (payload: UpdatedUserRequestBody): Promise<boolean> => {
  try {
    console.log('Validating update payload:', payload); // Debugging payload
    await editUserSchema.validate(payload, { abortEarly: false }); // Show all validation errors
    return true;
  } catch (err: Yup.ValidationError | any) {
    console.error('Validation errors:', err.errors); // Log all validation errors
    return false;
  }
};
