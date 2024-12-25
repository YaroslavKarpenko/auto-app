import axios from 'axios';
import { baseUrl, createConfig } from './helper';

const fetchMarks = async (token: string) => {
  const response = await axios.get(baseUrl + 'api/v1/marks', createConfig(token));

  return response.data;
};

const fetchModels = async (token: string) => {
  const response = await axios.get(baseUrl + 'api/v1/models', createConfig(token));

  return response.data;
};

export default { fetchMarks, fetchModels };
