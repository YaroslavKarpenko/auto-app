/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { baseUrl, createConfig } from './helper';
import { Ad } from '../store/ad/types';
import FormData from 'form-data';

const createAd = async (token: string, newAdObj: Ad) => {
  const formData = new FormData();
  try {
    formData.append('name', newAdObj.name);
    formData.append('race', newAdObj.race);
    formData.append('releaseYear', newAdObj.releaseYear);
    formData.append('markId', newAdObj.mark);
    formData.append('modelId', newAdObj.model);
    formData.append('cost', newAdObj.cost);
    formData.append('address', newAdObj.address);
    formData.append('description', newAdObj.description);
    formData.append('image', newAdObj.image);
    const response = await axios.post(baseUrl + 'api/v1/cars', formData, createConfig(token));
    console.log('Server response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const fetchAds = async (
  token: string,
  page: number,
  markId: string | null,
  modelId: string | null,
) => {
  try {
    let url = baseUrl;
    if (markId && modelId) {
      url += `api/v1/cars/by-mark-and-model/${markId}/${modelId}/${page}`;
      console.log('1');
    } else if (markId) {
      url += `api/v1/cars/by-mark/${markId}/${page}`;
      console.log('2');
    } else {
      url += `api/v1/cars/${page}`;
      console.log('3');
    }
    const response = await axios.get(url, createConfig(token));
    console.log('Server response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching ads:', error);
    throw error;
  }
};

const fetchAllAdsForCurrentUser = async (token: string) => {
  try {
    const response = await axios.get(baseUrl + 'api/v1/cars-my', createConfig(token));
    console.log('Server response:', response.data);
    return response.data.cars;
  } catch (error) {
    console.error('Error fetching ads:', error);
    throw error;
  }
};

const fetchAllAdsForAnyUser = async (token: string, userId: string) => {
  try {
    const response = await axios.get(
      baseUrl + `api/v1/cars/by-user/${userId}`,
      createConfig(token),
    );
    console.log('Server response:', response.data);
    return response.data.cars;
  } catch (error) {
    console.error('Error fetching ads:', error);
    throw error;
  }
};

const fetchSingleAd = async (token: string, id: string) => {
  try {
    const response = await axios.get(baseUrl + `api/v1/cars/by-id/${id}`, createConfig(token));
    console.log('Server response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching ad:', error);
    throw error;
  }
};

const deleteAd = async (token: string, id: string) => {
  try {
    const response = await axios.delete(baseUrl + `api/v1/cars/delete/${id}`, createConfig(token));
    console.log('Server response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting ad:', error);
    throw error;
  }
};

const updateAd = async (token: string, id: string, newAdObj: any) => {
  const formData = new FormData();
  try {
    formData.append('name', newAdObj.name);
    formData.append('race', newAdObj.race);
    formData.append('releaseYear', newAdObj.releaseYear);
    formData.append('markId', newAdObj.mark);
    formData.append('modelId', newAdObj.model);
    formData.append('cost', newAdObj.cost);
    formData.append('address', newAdObj.address);
    formData.append('description', newAdObj.description);
    formData.append('image', newAdObj.image);
    const response = await axios.post(
      baseUrl + `api/v1/cars/update/${id}`,
      formData,
      createConfig(token),
    );
    console.log('Server response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export default {
  createAd,
  fetchAds,
  fetchAllAdsForCurrentUser,
  fetchAllAdsForAnyUser,
  fetchSingleAd,
  deleteAd,
  updateAd,
};
