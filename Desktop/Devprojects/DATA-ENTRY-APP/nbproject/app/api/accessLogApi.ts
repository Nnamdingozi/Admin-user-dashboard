
import { ApiError } from '@/app/validation/errorEnum';

 import { axiosInstance, validatePayload, handleApiError, configWithToken,} from '@/app/validation/validation'

// import type declaration
import { AccessLog, UpdateAccessLog,  LoginRequest } from '@/app/utilities/definitions';


// export const login = async (loginData: LoginRequest) => {
//   try {
//     const response = await axiosInstance.post('/login', loginData);

//     const { token, user } = response.data;

//     // Store the token (e.g., in localStorage or cookies)
//     localStorage.setItem('token', token);

//     // Return user details
//     return user;
//   } catch (err: unknown) {
//     const errorMessage = handleApiError(err);
//     throw new Error(errorMessage);
// }
// };



export const getAccessLogs = async (token: string): Promise<AccessLog[] | undefined> => {
  try {
    const response = await axiosInstance.get('/accesslogs', configWithToken(token));
    if (!validatePayload(response)) {
      throw new Error(ApiError.INVALID_PAYLOAD); // Invalid payload from the server
    }
    console.log('AccessLog for all user:', response.data);
    return response.data;
  }  catch (err: unknown) {
    const errorMessage = handleApiError(err);
    throw new Error(errorMessage); 
  }
  
};

export const getAccessLogById = async (token:string, id: number):Promise<AccessLog | null> => {
  try {
  const response = await axiosInstance.get(`/accesslogs${id}`, configWithToken(token));
  if (!validatePayload(response)) {
    throw new Error(ApiError.INVALID_PAYLOAD); 
  }

  console.log('Access log by Id:', response.data);
  return response.data;
} catch (err: unknown) {
  const errorMessage = handleApiError(err);
  throw new Error(errorMessage);
}
};

export const createAccessLog = async (log: AccessLog): Promise<AccessLog | null> => {
  try {
    const response = await axiosInstance.post('/accesslogs', log);
    if (!validatePayload(response)) {
      throw new Error(ApiError.INVALID_PAYLOAD); 
    }

    console.log('Access log succeesfully created:', response.data);
    return response.data
  } catch (err: unknown) {
    const errorMessage = handleApiError(err);
    throw new Error(errorMessage);
  }
};

export const updateAccessLog = async (token: string, id: number, log:UpdateAccessLog):Promise<AccessLog | null> => {
  try {
  const response = await axiosInstance.put(`accesslogs/${id}`, log, configWithToken(token));
  if (!validatePayload(response)) {
    throw new Error(ApiError.INVALID_PAYLOAD); 
  }

  console.log('Access log updated successfully:', response.data);
  return response.data;
} catch (err: unknown) {
  const errorMessage = handleApiError(err);
  throw new Error(errorMessage);
}
};

export const deleteAccessLog = async (token: string, id: number) => {
  try {
  const response = await axiosInstance.delete(`accesslogs/${id}`, configWithToken(token));
  if (!validatePayload(response)) {
    throw new Error(ApiError.INVALID_PAYLOAD); // Invalid payload from the server
  }

  return response.data;
} catch (err: unknown) {
  const errorMessage = handleApiError(err);
  throw new Error(errorMessage);
}
};
