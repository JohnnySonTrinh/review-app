import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Alert, Button, Container, Row, Col, Form } from 'react-bootstrap';

import { axiosRes } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

import btnStyles from '../../styles/Button.module.css';
import appStyles from '../../App.module.css';


const UserPasswordForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: '',
    new_password2: '',
  });
  const { new_password1, new_password2 } = userData;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      // redirect user if they are not the owner of this profile
      history.push('/');
    }
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post('/dj-rest-auth/password/change/', userData);
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
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>New password</Form.Label>
              <Form.Control
                placeholder='new password'
                type='password'
                value={new_password1}
                onChange={handleChange}
                name='new_password1'
              />
            </Form.Group>
            {errors?.new_password1?.map((message, idx) => (
              <Alert key={idx} variant='warning'>
                {message}
              </Alert>
            ))}
            <Form.Group>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                placeholder='confirm new password'
                type='password'
                value={new_password2}
                onChange={handleChange}
                name='new_password2'
              />
            </Form.Group>
            {errors?.new_password2?.map((message, idx) => (
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
                type='submit'
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
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

export default UserPasswordForm;
