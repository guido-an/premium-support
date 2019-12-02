// import React, {useState} from 'react';
// import {login} from '../api/authService';
// import './Login.css'

// export default function Login({liftUserUp, history}) {
//   let [username, setUsername] = useState('');
//   let [password, setPassword] = useState('');
//   let [error, setError] = useState(null)

//   const onSubmitHandler = e => {
//     e.preventDefault();
//     login(username, password).then(() => {
//       if (username === process.env.REACT_APP_ADMIN) {
//         history.push('/admin');
//       } else {
//         history.push('/tickets');
//       }
//     })
//     .catch(err => {
//       // setError(error = err.response.data.errorMessage)
//       console.log(err.response.data.errorMessage, "errrrr from onsubmit")
//     })
//   };

//   return (
//     <section className="login-section">

//       <form onSubmit={onSubmitHandler}>
//         <p><strong>Username</strong></p>
//         <input
//           onChange={e => setUsername(e.target.value)}
//           type="text"
//           placeholder="Username"
//           name="username"
//         />
//         <p><strong>Password</strong></p>
//         <input
//           onChange={e => setPassword(e.target.value)}
//           type="password"
//           placeholder="*****"
//           name="password"
//         />
//         <button type="submit">LOGIN</button>
//       </form>
//      {error}
//     </section>
//   );
// }

import React, {useState} from 'react';
import {serviceAPI} from '../api/serviceAPI';
import './Login.css';

export default function Login({liftUserUp, history}) {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [error, setError] = useState(null);

  const onSubmitHandler = e => {
    e.preventDefault();
    serviceAPI
      .post('/auth/login', {
        username,
        password,
      })
      .then(res => {
        liftUserUp(res.data.currentUser.username);
        if (username === process.env.REACT_APP_ADMIN) {
          history.push('/admin');
        } else {
          history.push('/tickets');
        }
      })
      .catch(err => {
        setError((error = err.response.data.errorMessage));
      });
  };

  return (
    <section className="login-section">
      <form onSubmit={onSubmitHandler}>
        <p>
          <strong>Username</strong>
        </p>
        <input
          onChange={e => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          name="username"
        />
        <p>
          <strong>Password</strong>
        </p>
        <input
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="*****"
          name="password"
        />
        <button className="button-success" type="submit">LOGIN</button>
      </form>
      {error}
    </section>
  );
}
