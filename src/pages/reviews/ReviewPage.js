import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

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
  const [notes, setNotes] = useState({ results: [], next: null });

  const fetchNotes = async (url) => {
    try {
      const { data } = await axiosReq.get(url);
      return data;
    } catch (err) {
      console.error(`Error fetching notes:`, err);
      return { results: [], next: null };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewData = await axiosReq.get(`/reviews/${id}`);
        const initialNotesData = await fetchNotes(`/notes/?review=${id}`);
        setReview({ results: [reviewData.data] });
        setNotes(initialNotesData);
      } catch (err) {
        console.error(`Error fetching data for review ID ${id}:`, err);
      }
    };

    fetchData();
  }, [id]);

  const fetchMoreNotes = async () => {
    if (notes.next) {
      const newNotes = await fetchNotes(notes.next);
      setNotes((prevNotes) => ({
        ...prevNotes,
        results: [...prevNotes.results, ...newNotes.results],
        next: newNotes.next,
      }));
    }
  };

  const filteredNotes = notes.results.filter(note => note.review === parseInt(id));

  return (
    <Row className='h-100'>
      <Col className='py-2 p-0 p-lg-2' lg={8}>
        <p>Popular profiles for mobile</p>
        <Review {...review.results[0]} setReviews={setReview} reviewPage />
        <Container className={`${appStyles.Content}`}>
          {currentUser && (
            <NoteCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              review={id}
              setReview={setReview}
              setNotes={setNotes}
            />
          )}
          <InfiniteScroll
            dataLength={filteredNotes.length}
            next={fetchMoreNotes}
            hasMore={!!notes.next}
            loader={<h4>Loading...</h4>}
            endMessage={<p style={{ textAlign: 'center' }}>
              <b>You have seen all notes.</b>
            </p>}
          >
            {filteredNotes.map((note) => (
              <Note key={note.id} {...note} setReview={setReview} setNotes={setNotes} />
            ))}
          </InfiniteScroll>
        </Container>
      </Col>
      <Col lg={4} className='d-none d-lg-block p-0 p-lg-2'>
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default ReviewPage;
