import React from 'react';
import Login from '../components/Login';

export default function Home({liftUserUp, history}) {
  return (
    <section>
      <h1 className="title-page">Login</h1>
      
      <Login liftUserUp={liftUserUp} history={history} />
    </section>
  );
}