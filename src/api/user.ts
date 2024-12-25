import axios from 'axios';
import { UserCredentials, User } from '../store/user/types';
import { baseUrl, createConfig } from './helper';

export const createUser = async (newUserObj: UserCredentials): Promise<User> => {
  try {
    const response = await axios.post(baseUrl + 'api/registration', newUserObj);
    console.log('Server response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const fetchUserInformation = async (token: string): Promise<User> => {
  try {
    const response = await axios.get(baseUrl + 'api/v1/about-me-info', createConfig(token));
    console.log('Server response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user information:', error);
    throw error;
  }
};
