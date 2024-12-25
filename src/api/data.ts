import axios from 'axios';
import FormData from 'form-data';
const baseUrl = 'http://192.168.0.104:8001/main-server/v1/data';

const createConfig = (token: string) => {
  return {
    headers: { Authorization: 'Bearer ' + token },
  };
};

const getAll = async (token: string) => {
  const response = await axios.get(baseUrl + '/all/get/by/user', createConfig(token));

  return response.data.events;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addNewData = async (token: string, newDataObj: any) => {
  const formData = new FormData();

  formData.append('title', newDataObj.title);
  formData.append('description', newDataObj.description);
  formData.append('location', newDataObj.location);
  formData.append('startTime', newDataObj.startTime);
  formData.append('endTime', newDataObj.endTime);
  formData.append('file', newDataObj.file);
  const response = await axios.post(baseUrl + '/all', formData, createConfig(token));
  return response.data;
};

const downloadFile = async (token: string, fileId: string) => {
  const response = await axios.get(baseUrl + '/download' + `/${fileId}`, {
    ...createConfig(token),
    responseType: 'blob',
  });

  return response.data;
};

const deleteData = async (token: string, fileId: string, title: string) => {
  const response = await axios.delete(
    baseUrl + '/delete' + `/${title}` + `/${fileId}`,
    createConfig(token),
  );
  return response.data;
};

export default { getAll, addNewData, downloadFile, deleteData };
