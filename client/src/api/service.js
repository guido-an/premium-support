// import axios from 'axios';

// const service = axios.create({
//   baseURL: process.env.REACT_APP_BASE_URL,
//   withCredentials: true,
// });

// // export const signup = async payload => {
// //   const data = await service.post('/auth/signup', payload);
// //   return data;
// // };

// export const login = (username, password) => {
//   return service
//     .post('/auth/login', {username: username, password: password})
//     .then(res => {
//       return res.data;
//     })
//     .catch(err => {
//       return err;
//     });
// };
// // export const login = async payload => {
// //   try {
// //     const {username, password} = payload;
// //     const {data} = await service.post('/auth/login', {
// //       username,
// //       password,
// //     });
// //     console.log(data, "data")
// //     return data;
// //   }
// //   catch(err){
// //     return err
// //   }
// // };

// export const logout = () => {
//   return service
//     .get('/auth/logout')
//     .then(res => {
//       return res;
//     })
//     .catch(err => {
//       return err;
//     });
// };

// export const getCurrentUser = async () => {
//   const {data} = await service.get('/auth/currentUser');
//   return data;
// };
import axios from 'axios';

export const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});



export const logout = () => {
  return service
    .get('/auth/logout')
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

