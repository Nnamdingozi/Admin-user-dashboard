// import axios, { AxiosError, AxiosResponse } from 'axios';
// import * as Yup from 'yup';
// import { ApiError } from '@/app/validation/errorEnum'; // Assuming ErrorEnum is in a separate file
// import { Login, LoginRequest } from '@/app/utilities/definitions';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';


// const userSchema = Yup.object().shape({
//   username: Yup.string().min(3).required('Username is required'),
//   email: Yup.string().email().required('Email is required'), 
//    password: Yup
//   .string()
//   .min(8, 'Password must be at least 8 characters long')
//   .matches(
//     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
//     'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
//   )
//   .required('Password is required'),
//   privacyPolicy: Yup.boolean().required('Privacy policy acceptance is required'),
  
//   role: Yup.mixed<'admin' | 'user'>().oneOf(['admin', 'user']).required('Role is required'),
// });

// // Login validation schema
// const loginSchema = Yup.object().shape({
//     username: Yup.string().min(3).required('Username is required'),
//     password: Yup
//     .string()
//     .min(8, 'Password must be at least 8 characters long')
//     .matches(
//       /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
//       'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
//     )
//     .required('Password is required'),
//   });

// // Utility function to handle API errors
// export const handleApiError = (err: unknown) => {
//   if (axios.isAxiosError(err)) {
//     if (!err.response) {
//       // Network errors, connection issues
//       console.error(ApiError.NETWORK_ERROR, err);
//       return ApiError.NETWORK_ERROR;
//     }
//     if (err.response.status === 401) {
//       // Authentication errors (Unauthorized)
//       console.error(ApiError.AUTH_ERROR, err.response);
//       return ApiError.AUTH_ERROR;
//     }
//     if (err.response.status >= 500) {
//       // Server errors (5xx)
//       console.error(ApiError.SERVER_ERROR, err.response);
//       return ApiError.SERVER_ERROR;
//     }
//     if (err.response.status >= 400 && err.response.status < 500) {
//       // Client-side errors (4xx)
//       console.error('Client error:', err.response);
//       return err.response.data?.message || ApiError.UNKNOWN_ERROR;
//     }
//   } else if (err instanceof Error) {
//     // Non-Axios errors
//     console.error('Error:', err.message);
//     return ApiError.UNKNOWN_ERROR;
//   }
//   return ApiError.UNKNOWN_ERROR; // Fallback
// };

// // Axios instance with baseURL and default settings
// export const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Automatically attach token to requests
// export const configWithToken = (token: string | null) => ({
//   headers: {
//     Authorization: token ? `Bearer ${token}` : '',
//   },
// });

// // Validate if the server's response has valid data
// export const validatePayload = async (payload: any) => {
//     try {
//       await userSchema.validate(payload); // Validate with Yup schema
//       return true;
//     } catch (err: any) {
//       console.error('Validation failed:', err.message);
//       return false;
//     }
//   };
//    export const validateLogin = async(payload:LoginRequest) => {
//     try {
//         await loginSchema.validate(payload); // Validate with Yup schema
//         return true;
//       } catch (err: any) {
//         console.error('Validation failed:', err.message);
//         return false;
//       }

//    }

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
    .required(), // Users editing their profile may not need to re-accept the privacy policy
  role: Yup.mixed<'admin' | 'user'>()
    .oneOf(['admin', 'user'], 'Invalid role')
    .optional(),
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

// Utility function to handle API errors
export const handleApiError = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    if (!err.response) {
      console.error('Network error:', err);
      return ApiError.NETWORK_ERROR;
    }
    if (err.response.status === 401) {
      console.error('Authentication error:', err.response);
      return ApiError.AUTH_ERROR;
    }
    if (err.response.status >= 500) {
      console.error('Server error:', err.response);
      return ApiError.SERVER_ERROR;
    }
    console.error('Client error:', err.response);
    return err.response.data?.message || ApiError.UNKNOWN_ERROR;
  }
  if (err instanceof Error) {
    console.error('Unexpected error:', err.message);
    return err.message;
  }
  return ApiError.UNKNOWN_ERROR;
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
