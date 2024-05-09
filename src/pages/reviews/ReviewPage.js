import React, { useEffect, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import appStyles from '../../App.module.css';
import { useParams } from 'react-router';
import { axiosReq } from '../../api/axiosDefaults';
import Review from './Review';
import Note from '../notes/Note';

import NoteCreateForm from '../notes/NoteCreateForm';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

function ReviewPage() {
  const { id } = useParams();
  const [review, setReview] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [notes, setNotes] = useState({ results: [] });

  useEffect(() => {
    console.log(`Component mounting or updating for review ID: ${id}`);

    const fetchData = async () => {
      try {
        const [{ data: review }, { data: notes }] = await Promise.all([
          axiosReq.get(`/reviews/${id}`),
          axiosReq.get(`/notes/?review=${id}`),
        ]);
        setReview({ results: [review] });
        setNotes(notes);
        console.log(notes);
        console.log(`Notes fetched for review ID ${id}:`, notes);
      } catch (err) {
        console.error(`Error fetching data for review ID ${id}:`, err);
      }
    };

    fetchData();

    return () => {
      console.log(`Cleaning up for review ID ${id}`);
    };
  }, [id]);

  return (
    <Row className='h-100'>
      <Col className='py-2 p-0 p-lg-2' lg={8}>
        <p>Popular profiles for mobile</p>
        <Review {...review.results[0]} setReviews={setReview} reviewPage />
        <Container className={`${appStyles.Content}`}>
          {currentUser ? (
            <NoteCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              review={id}
              setReview={setReview}
              setNotes={setNotes}
            />
          ) : notes.results.length ? (
            'Notes'
          ) : null}
          {notes.results.length ? (
            notes.results
              .filter((note) => note.review === review.results[0].id)
              .map((note) => (
                <Note
                  key={note.id}
                  {...note}
                  setReview={setReview}
                  setNotes={setNotes}
                />
              ))
          ) : currentUser ? (
            <span>No notes yet, be the first to note!</span>
          ) : (
            <span>No notes... yet</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className='d-none d-lg-block p-0 p-lg-2'>
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default ReviewPage;
