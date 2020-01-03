import React from 'react';
import Login from '../components/Login';

export default function Home({liftUserUp, history}) {
  return (
    <section>
      <h1 style={{ textAlign: 'center'}} className="title-page">Premium support</h1>
      <Login liftUserUp={liftUserUp} history={history} />
    </section>
  );
}
