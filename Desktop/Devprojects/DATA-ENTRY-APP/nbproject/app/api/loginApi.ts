
// import { axiosInstance, validateLogin, handleApiError } from '@/app/validation/validation';
// import { LoginRequest } from '@/app/utilities/definitions';
// import { ApiError } from '@/app/validation/errorEnum';

// export const login = async (loginData: LoginRequest) => {
//   try {
//     // Validate the login data before making the API request
//     const isValidLogin = await validateLogin(loginData);
//     if (!isValidLogin) {
//       throw new Error(ApiError.INVALID_PAYLOAD); // Handle invalid login data
//     }

//     // Make API request
//     const response = await axiosInstance.post('/login', loginData);

//     console.log('User login successful');
//     const { token, user } = response.data;

//     // Store the token (e.g., in localStorage or cookies)
//     localStorage.setItem('token', token);

//     // Return user details
//     return user;
//   } catch (err: unknown) {
//     // Handle API errors with custom utility
//     const errorMessage = handleApiError(err);
//     throw new Error(errorMessage);
//   }
// };




import { axiosInstance, validateLogin, handleApiError } from '@/app/validation/validation';
import { LoginRequest } from '@/app/utilities/definitions';
import { ApiError } from '@/app/validation/errorEnum';
import { UserProfile } from '@/app/utilities/definitions';

export const login = async (loginData: LoginRequest): Promise<{ user: UserProfile; token: string }>  => {
  try {
    console.log('Attempting login with payload:', loginData); // Debugging payload

    // Validate the login payload
    const isValidLogin = await validateLogin(loginData);
    if (!isValidLogin) {
      throw new Error(ApiError.INVALID_PAYLOAD);
    }

    // Send login request to API
    const response = await axiosInstance.post('/login', loginData);
    console.log('Login response:', response.data);

    return { user: response.data.user, token: response.data.token };
   
  } catch (err) {
    const errorMessage = handleApiError(err);
    console.error('Login failed with error:', errorMessage);
    throw new Error(errorMessage);
  }
};
