import React, {useState} from 'react';
import {serviceAPI} from '../../api/serviceAPI';

export default function CreaTicket({history}) {
  let [title, setTitle] = useState('');
  let [service, setService] = useState('');
  let [message, setMessage] = useState('');


  const onSubmitHandler = e => {
    e.preventDefault();
    serviceAPI
      .post('/crea-ticket', {title, service, message})
      .then(() => {
        console.log('all good');
        history.push('/tickets');
      })
      .catch(err => {
         debugger
        console.log(err);
      });
    console.log(service, "service")
  };
  return (
    <div>
      <h1 className="page-title">Crea ticket</h1>
      <form onSubmit={onSubmitHandler}>
        <input
          onChange={e => setTitle(e.target.value)}
          type="text"
          name="title"
          placeholder="Title"
          required
        />
        <select onChange={e => setService(e.target.value)} required>
         <option value="">* Seleziona un servizio</option>
          <option value="Web Development">Web Development</option>
          <option value="Social Media">Social Media</option>
          <option value="Web Marketing">Web Marketing</option>
          <option value="Graphic Design">Graphic Design</option>
        </select>
        <textarea
          onChange={e => setMessage(e.target.value)}
          name="message"
          placeholder="Message"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
