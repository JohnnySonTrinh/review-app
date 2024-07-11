import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';
import btnStyles from '../../styles/Button.module.css';
import appStyles from '../../App.module.css';
import styles from '../../styles/ReviewCreateEditForm.module.css';

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();

  const [profileData, setProfileData] = useState({
    name: '',
    content: '',
    github: '',
    linkedin: '',
  });
  const { name, content, github, linkedin } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, content, github, linkedin } = data;
          setProfileData({ name, content, github, linkedin });
        } catch (err) {
          // console.log(err);
          history.push('/');
        }
      } else {
        history.push('/');
      }
    };

    handleMount();
  }, [currentUser, history, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('content', content);
    formData.append('github', github);
    formData.append('linkedin', linkedin);

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  const textFields = (
    <div className={` ${styles.Header} text-center`}>
      <Form.Group>
        <Form.Label>Bio</Form.Label>
        <Form.Control
          className={`${styles.Input}`}
          as='textarea'
          value={content}
          onChange={handleChange}
          name='content'
          rows={7}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant='warning' key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group className='mt-3'>
        <Form.Label>
          <i className='fa-brands fa-github'></i>GitHub
        </Form.Label>
        <Form.Control
          className={`${styles.Input}`}
          type='text'
          value={github}
          onChange={handleChange}
          name='github'
        />
      </Form.Group>
      {errors?.github?.map((message, idx) => (
        <Alert variant='warning' key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group className='mt-3'>
        <Form.Label>
          <i className='fa-brands fa-linkedin'></i>LinkedIn
        </Form.Label>
        <Form.Control
          className={`${styles.Input}`}
          type='text'
          value={linkedin}
          onChange={handleChange}
          name='linkedin'
        />
      </Form.Group>
      {errors?.linkedin?.map((message, idx) => (
        <Alert variant='warning' key={idx}>
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
        <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type='submit'>
          Save
        </Button>
      </div>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit} className='py-2 p-0 p-md-2' md={7} lg={8}>
      <Container
        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
      >
        {textFields}
      </Container>
    </Form>
  );
};

export default ProfileEditForm;
