
import { axiosInstance, validateLogin, handleApiError } from '@/app/validation/validation';
import { LoginRequest } from '@/app/utilities/definitions';
import { ApiError } from '@/app/validation/errorEnum';
import { User, AccessLog } from '@/app/utilities/definitions';

export const login = async (loginData: LoginRequest): Promise<{ user: User; token: string, accessLog: AccessLog }> => {
  try {
    console.log('Attempting login with payload:', loginData);

    // Validate the login payload
    const isValidLogin = await validateLogin(loginData);
    if (!isValidLogin) {
      throw new Error(ApiError.INVALID_PAYLOAD);
    }

    // Send login request to API
    const response = await axiosInstance.post('/login', loginData);
    console.log('Login response:', response.data);

    // Return the user, token, and access log from the API response
    return { user: response.data.mockUser, token: response.data.token, accessLog: response.data.accessLog};

  } catch (err) {
    const errorMessage = handleApiError(err);
    console.error('Login failed with error:', errorMessage);
    throw new Error(errorMessage);
  }
};
