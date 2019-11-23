import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5000/auth',
  withCredentials: true,
});

// export const signup = async payload => {
//   const data = await service.post('/auth/signup', payload);
//   return data;
// };

// export const login = async (username, password) => {
//   try {
//     const {data} = await service.post('/auth/login', {
//       username: username,
//       password: password,
//     });
//     console.log("data", data)
//     return data;
//   }
//   catch(err){
//     console.log(err)
//   }

// };

export const login = (username, password) => {
  return service
    .post("/login", { username: username, password: password })
    .then(res => {
      console.log(res.data)
      return res.data
    })
    .catch(err => {
      return err
    })
};


export const logout = async () => {
  const {data} = await service.get('/logout');
  console.log("logout", data)
  return data;
};

export const getCurrentUser = async () => {
  const {data} = await service.get('/currentUser');
  console.log(data, 'getcurrentuser');
  return data;
};
