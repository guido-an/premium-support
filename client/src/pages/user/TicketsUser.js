import React from 'react'

export default function TicketsUser({currentUser}){

    return(
        <section>
            <h1>Tickets page</h1>
            {currentUser && (<p>Hello {currentUser}</p>)}
        </section>
    )
}