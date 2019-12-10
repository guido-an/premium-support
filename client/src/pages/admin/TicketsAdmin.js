import React, {useEffect, useState}  from 'react'
import { serviceAPI } from '../../api/serviceAPI'
import Table from '../../components/Table'


export default function TicketsAdmin(){
    let [tickets, setTickets] = useState([])

    useEffect(() => {
        serviceAPI.get('/admin')
        .then(res => {
         setTickets((tickets = res.data));
          console.log(res, "tickets for admin")
        })
      }, []); // pass an array as second argument to avoid infinite loop
    
    return(
        <section className="section-container">
            <h1>Tickets admin</h1>
            <Table array={tickets}></Table>
        </section>
    )
}

