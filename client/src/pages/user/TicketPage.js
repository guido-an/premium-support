import './TicketPage.css';
import React, {useState, useEffect} from 'react';
import {serviceAPI} from '../../api/serviceAPI';

const TicketPage = ({match}) => {
  let myId = match.params.id;

  let [ticket, setTicket] = useState({});
  let [messageSuccess, setMessageSuccess] = useState(false);

  const getTicket = () => {
    serviceAPI.get(`/tickets/${myId}`).then(res => {
      setTicket((ticket = res.data.ticket));
    });
  }

  useEffect(() => {
    getTicket()
  }, []); // pass an array as second argument to avoid infinite loop

  let formRef = React.createRef();

  const onSubmitHandler = e => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    serviceAPI
      .post('/answer', formData)
      .then(() => {
        getTicket() // update ticket with new answer
        setMessageSuccess(messageSuccess=true)
      })
      .catch(err => {
        console.log(err);
      });
  };

  console.log(ticket, 'this is the ticket');
  return (
    <section className="section-container">
      <div>
        <h1 className="title-page">{ticket.title}</h1>

        <div className="message-container">
          {ticket.user && (
            <p>
              <strong>{ticket.user.username}</strong>
            </p>
          )}
          <span className="ticket-time">{ticket.time}</span>
          <p>{ticket.message}</p>
        </div>
      </div>

      {ticket.answers &&
        ticket.answers.map((answer, index) => {
          return (
            <div key={index} className={"message-container " + (answer.admin ? 'admin-answer' : '')}>
              <p>
                <strong>{answer.username}</strong>
              </p>
              <span className="ticket-time">{answer.time}</span>
              <p> {answer.message}</p>
            </div>
          );
        })}

      <h2>Nuova risposta</h2> {messageSuccess && (<p style={{color: "green"}}>Messaggio inviato con successo!</p>)}
      <form onSubmit={onSubmitHandler} ref={formRef}>
        <textarea
          className="my-textarea"
          name="message"
          placeholder="* Messaggio"
          rows="10"
          required
        />
        <input type="text" name="_id" value={ticket._id} />
        <input type="text" name="title" value={ticket.title} />
        <input type="text" name="service" value={ticket.service} />
        {ticket.user && ( <input type="text" name="userEmail" value={ticket.user.email} />)}
  
        <button className="button-success" type="submit">
          RISPONDI
        </button>
      </form>
    </section>
  );
};

export default TicketPage;
