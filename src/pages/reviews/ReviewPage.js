import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Col, Row, Container } from 'react-bootstrap';

import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

import Review from './Review';
import Note from '../notes/Note';
import NoteCreateForm from '../notes/NoteCreateForm';
import PopularProfiles from '../profiles/PopularProfiles';

import appStyles from '../../App.module.css';


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

  const filteredNotes = notes.results.filter(
    (note) => note.review === parseInt(id)
  );

  return (
    <Row className='h-100 mt-5'>
      <Col className='py-2 p-0 p-lg-2 mt-3' lg={8}>
        <PopularProfiles mobile />
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
          >
            {filteredNotes.map((note) => (
              <Note
                key={note.id}
                {...note}
                setReview={setReview}
                setNotes={setNotes}
              />
            ))}
          </InfiniteScroll>
        </Container>
      </Col>
      <Col lg={4} className='d-none d-lg-block p-0 p-lg-2'>
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ReviewPage;
