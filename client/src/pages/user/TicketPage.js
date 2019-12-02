import React, {useState, useEffect} from 'react'
import {serviceAPI} from '../../api/serviceAPI';

const TicketPage = ({match}) => {
    let [ticket, setTicket] = useState({})

   console.log(match.params)
    // useEffect(() => {

       
    //     serviceAPI.get('/ticket')
    //     .then(res => {
    //      console.log(props)
    //     })
    //   }, []); // pass an array as second argument to avoid infinite loop

    return(
   <h1 className="title-page">Ticket Page</h1>
    )
}

export default TicketPage