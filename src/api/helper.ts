export const baseUrl = 'http://192.168.0.103:8000/';

export const createConfig = (token: string) => {
  return {
    headers: { Authorization: 'Bearer ' + token },
  };
};
