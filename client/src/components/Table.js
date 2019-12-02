import React from 'react';
import { Link } from 'react-router-dom'
import './Table.css'


const Table = ({array}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Titolo</th>
          <th>Data</th>
          <th>Servizio</th>
          <th>Stato</th>
          <th>Ticket</th>
        </tr>
      </thead>
      <tbody>
        {array.map((item, index) => {
          return (
            <tr key={index}>
              <td> <strong>{item.title}</strong></td>
              <td> {item.time}</td>
              <td> {item.service}</td>
               {item.active ? 'aperto' : 'chiuso'}
              <td> <Link to={`/tickets/${item._id}`}>> Vedi ticket </Link></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
