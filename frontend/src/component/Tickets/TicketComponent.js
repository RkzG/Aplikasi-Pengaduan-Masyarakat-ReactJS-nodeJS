import React from "react";
import { Link } from "react-router-dom";

const TicketsComponent = ({ tickets }) => {
  // a function that assigns bootstrap styling classes based on
  // the status of the ticket
  const assignColorToTicketStatus = (ticket) => {
    if (ticket.status === "completed") {
      return "p-3 mb-2 bg-success text-white";
    } else if (ticket.status === "in_progress") {
      return "p-3 mb-2 bg-warning text-dark";
    } else if (ticket.status === "opened") {
      return "p-3 mb-2 bg-light text-dark";
    }
  };
  return (
    <div className="container">
      {tickets.length === 0 ? (
        "You currently have no tickets created"
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Issue</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.title}</td>
                <td>{ticket.request}</td>
                <td className={assignColorToTicketStatus(ticket)}>
                  {ticket.status}
                </td>
                <td>
                  <Link to={`/ticket/${ticket.id}`}>See comments</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TicketsComponent;
