import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

export const signup = async payload => {
  const data = await service.post('/auth/signup', payload);
  return data;
};

export const login = async user => {
  const {data} = await service.post('/auth/login', user);
  console.log('data', data);
  return data;
};

export const logout = async () => {
  const {data} = await service.get('/auth/logout');
  // console.log('data', data);
  return data;
};

export const loggedin = async () => {
  const {data} = await service.get('/auth/loggedin');
  console.log(data, 'data loggedin');
  return data.data.user;
};
