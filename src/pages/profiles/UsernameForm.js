import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';

import { axiosRes } from '../../api/axiosDefaults';
import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';

import btnStyles from '../../styles/Button.module.css';
import appStyles from '../../App.module.css';

const UsernameForm = () => {
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const { id } = useParams();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  useEffect(() => {
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      history.push('/');
    }
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put('/dj-rest-auth/user/', {
        username,
      });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className='mt-5'>
      <Col className='py-2 mx-auto text-center mt-5' md={6}>
        <Container className={appStyles.Content}>
          <Form onSubmit={handleSubmit} className='my-2'>
            <Form.Group>
              <Form.Label>Change username</Form.Label>
              <Form.Control
                placeholder='username'
                type='text'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>
            {errors?.username?.map((message, idx) => (
              <Alert key={idx} variant='warning'>
                {message}
              </Alert>
            ))}
            <div className='d-flex justify-content-around mt-4'>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Red}`}
                onClick={() => history.goBack()}
              >
                Cancel
              </Button>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                type='submit'
              >
                Save
              </Button>
            </div>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UsernameForm;
