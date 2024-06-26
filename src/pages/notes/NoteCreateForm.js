import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, InputGroup } from 'react-bootstrap';

import Avatar from '../../components/Avatar';
import { axiosRes } from '../../api/axiosDefaults';

import styles from '../../styles/NoteCreateEditForm.module.css';

function NoteCreateForm(props) {
  const { review, setReview, setNotes, profileImage, profile_id } = props;
  const [content, setContent] = useState('');

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post('/notes/', {
        content,
        review,
      });
      setNotes((prevNotes) => ({
        ...prevNotes,
        results: [data, ...prevNotes.results],
      }));
      setReview((prevReview) => ({
        results: [
          {
            ...prevReview.results[0],
            notes_count: prevReview.results[0].notes_count + 1,
          },
        ],
      }));
      setContent('');
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Form className='mt-2' onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder='my note...'
            as='textarea'
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type='submit'
      >
        post
      </button>
    </Form>
  );
}

export default NoteCreateForm;
