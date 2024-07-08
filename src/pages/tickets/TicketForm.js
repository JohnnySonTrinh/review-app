import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

import styles from "../../styles/TicketForm.module.css";
import btnStyles from "../../styles/Button.module.css";

function TicketForm() {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/tickets/", formData);
      setSuccess(true);
      setFormData({
        title: "",
        message: "",
        email: "",
      });
      setErrors({});
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  };

  return (
    <div className={styles.Container}>
      <Form
        onSubmit={handleSubmit}
        className={`${styles.TicketForm} mt-5 text-center`}
      >
        <h1>Create a Ticket</h1>
        <p className="text-center text-secondary">Do you need help?</p>
        {success && (
          <Alert variant="success">Ticket created successfully!</Alert>
        )}
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            className={`${styles.Input}`}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title?.map((message, idx) => (
            <Alert key={idx} variant="danger">
              {message}
            </Alert>
          ))}
        </Form.Group>
        <Form.Group controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            className={`${styles.Input}`}
            as="textarea"
            rows={3}
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message?.map((message, idx) => (
            <Alert key={idx} variant="danger">
              {message}
            </Alert>
          ))}
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className={`${styles.Input}`}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email?.map((message, idx) => (
            <Alert key={idx} variant="danger">
              {message}
            </Alert>
          ))}
        </Form.Group>
        <Button
          className={`${btnStyles.Button} ${btnStyles.Blue}`}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default TicketForm;
