import React, {useState} from 'react';
import {login, getCurrentUser, logout} from '../api/authService'


export default function Login() {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');


  const onSubmitHandler = e => {
    e.preventDefault();
    login(username, password)
    .then(res => {
      console.log(res, "res from login")
    })
    .catch(err => {
      console.log(err, "err from login")
    })
  };

  return (
    <section>
      <form onSubmit={onSubmitHandler}>
        <input
          onChange={e => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          name="username"
        />
        <input
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="*****"
          name="password"
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={logout}>logout</button>
      <button onClick={getCurrentUser}>get current user</button>

    </section>
  );
}
