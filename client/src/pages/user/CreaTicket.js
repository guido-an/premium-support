import React, {useState} from 'react';
import {service} from '../../api/service';

export default function CreaTicket({history}) {
  let [title, setTitle] = useState('');
  let [message, setMessage] = useState('');


  const onSubmitHandler = e => {
    e.preventDefault();
    service.post('/crea-ticket', {title, message})
      .then(() => {
          console.log("all good")
        history.push("/tickets");
      })
      .catch(err => {
        history.push("/test");
        console.log(err);
      });
  };
  return (
    <div>
      <h1 className="page-title">Crea ticket</h1>
      <form>
        <input
          onChange={e => setTitle(e.target.value)}
          type="text"
          name="title"
          placeholder="Title"
          required={true}
        />
        <textarea
          onChange={e => setMessage(e.target.value)}
          name="message"
          placeholder="Message"
        />
        <button onClick={onSubmitHandler} type="submit">Submit</button>
      </form>
    </div>
  );
}
