import axios from 'axios';

import { UserCredentials } from '../store/user/types';

const baseUrl = 'http://192.168.0.103:8000/api/v1/login';

export const login = async (authCredentials: UserCredentials) => {
  const response = await axios.post(baseUrl, authCredentials);
  return response.data;
};
