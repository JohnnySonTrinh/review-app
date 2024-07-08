import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import styles from '../../styles/Tickets.module.css';

function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data } = await axios.get('/tickets/');
        console.log('Fetched tickets:', data); 
        if (Array.isArray(data.results)) { 
          setTickets(data.results);
        } else {
          setTickets([]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchTickets();
  }, []);

  const handleResolve = async (id) => {
    try {
      await axios.patch(`/tickets/${id}/`, { resolved: true });
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === id ? { ...ticket, resolved: true } : ticket
        )
      );
    } catch (err) {
      // console.error(err);
    }
  };

  return (
    <Container className={`${styles} mt-5`}>
      <Row className="justify-content-md-center mt-5">
        <Col>
          <h1 className="mt-5 text-center">Manage Tickets</h1>
          <Table striped bordered hover responsive className={`${styles.Tickets}`}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Message</th>
                <th>Email</th>
                <th>Created On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.title}</td>
                  <td>{ticket.message}</td>
                  <td>{ticket.email}</td>
                  <td>{new Date(ticket.created_on).toLocaleDateString('en-GB')}</td>
                  <td>
                    <Button
                      onClick={() => handleResolve(ticket.id)}
                      disabled={ticket.resolved}
                      variant={ticket.resolved ? 'success' : 'warning'}
                    >
                      {ticket.resolved ? 'Resolved' : 'Resolve'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Tickets;
