
import React, {useState} from 'react';
import {serviceAPI} from '../../api/serviceAPI';
import './CreaTicket.css'

export default function CreaTicket({history}) {
  let [title, setTitle] = useState('');
  let [service, setService] = useState('');
  let [message, setMessage] = useState('');


  let formRef = React.createRef();

  const onSubmitHandler = e => {
    e.preventDefault();
    const formData = new FormData(formRef.current)
    serviceAPI
      .post('/crea-ticket', formData)
      .then(() => {
        history.push('/tickets');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="section-container create-ticket-conatiner">
      <h1 className="title-page">Crea un ticket</h1>
      <form onSubmit={onSubmitHandler} ref={formRef}>
       <label>Per quale servizio possiamo aiutarti?</label>
      <select name="service" required>
          <option value="">* Seleziona un servizio</option>
          <option value="Web Development">Web Development</option>
          <option value="Social Media">Social Media</option>
          <option value="Web Marketing">Web Marketing</option>
          <option value="Graphic Design">Graphic Design</option>
        </select>
       <label>Titolo</label>
        <input
          type="text"
          name="title"
          placeholder="* Titolo"
          required
        />
        <label>Messaggio</label>
        <textarea
          className="my-textarea"
          name="message"
          placeholder="* Messaggio"
          rows="10"
          required
        />
        <label>Per caricare un file in .jpeg, .png o screenshot</label>
        <input id="file-upload" type="file" name="picture"/>
        <button className="button-success" type="submit">CREA TICKET</button>
      </form>
      </div>
    </div>
  );
}
