import React, {useState} from 'react';
import {serviceAPI} from '../api/serviceAPI';
import './Login.css';

export default function Login({liftUserUp, history}) {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');


  const onSubmitHandler = e => {
    e.preventDefault();
    serviceAPI
      .post('/auth/login', {
        username,
        password,
      })
      .then(res => {
        const currentUser = res.data.currentUser
        liftUserUp(currentUser);
        if (currentUser.admin) {
          history.push('/admin');
        } else {
          history.push('/tickets');
        }
      })
      .catch(err => {
        console.log(err)
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
    </section>
  );
}
