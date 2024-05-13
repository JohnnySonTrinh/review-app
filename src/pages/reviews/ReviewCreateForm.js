import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import styles from '../../styles/ReviewCreateEditForm.module.css';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';
import { useHistory } from 'react-router';
import { axiosReq } from '../../api/axiosDefaults';
import { useRedirect } from '../../hooks/useRedirect';

function ReviewCreateForm() {
  useRedirect('loggedOut')
  
  const [errors, setErrors] = useState({});
  const [reviewData, setReviewData] = useState({
    title: '',
    content: '',
    github_repo: '',
    live_website: '',
  });

  const { title, content, github_repo, live_website } = reviewData;
  const history = useHistory();

  const handleChange = (event) => {
    setReviewData({
      ...reviewData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('github_repo', github_repo);
    formData.append('live_website', live_website);

    try {
      const { data } = await axiosReq.post('/reviews/', formData);
      history.push(`/reviews/${data.id}`);
    } catch (err) {
      console.error('Error: ', err);
      console.log('Error response data: ', err.response?.data);
      console.log('Error status code: ', err.response?.status);
      console.log('Error headers: ', err.response?.headers);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className={` ${styles.Header} text-center`}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          className={`${styles.Input}`}
          type='text'
          name='title'
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.title?.map((message, idx) => (
        <Alert key={idx} variant='warning'>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          className={`${styles.Input}`}
          as='textarea'
          rows={6}
          name='content'
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.content?.map((message, idx) => (
        <Alert key={idx} variant='warning'>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>
          <i className='fa-brands fa-github'></i>GitHub Link
        </Form.Label>
        <Form.Control
          className={`${styles.Input}`}
          type='url'
          name='github_repo'
          value={github_repo}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.github_repo?.map((message, idx) => (
        <Alert key={idx} variant='warning'>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>
          <i className='fa-solid fa-globe'></i>Live Site
        </Form.Label>
        <Form.Control
          className={`${styles.Input}`}
          type='url'
          name='live_website'
          value={live_website}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.live_website?.map((message, idx) => (
        <Alert key={idx} variant='warning'>
          {message}
        </Alert>
      ))}
      <Button
        className={`${btnStyles.Button} ${btnStyles.Red}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type='submit'>
        Submit Review
      </Button>
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
}

export default ReviewCreateForm;
