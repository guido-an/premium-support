import React, {useState, useEffect} from 'react'
import {serviceAPI} from '../../api/serviceAPI';
import TableUser from '../../components/Table'

export default function TicketsUser({currentUser}){

    let [tickets, setTickets] = useState([])


    useEffect(() => {
        serviceAPI.get('/tickets')
        .then(res => {
          setTickets((tickets = res.data));
          console.log(tickets, "tickets from page")
        })
      }, []); // pass an array as second argument to avoid infinite loop

    return(
        
        <section>
            <div className="section-container">
            {currentUser && (<h1 className="title-page">Hello {currentUser.username}!</h1>)}
              <TableUser array={tickets}></TableUser>
            </div>
        </section>
    )
}