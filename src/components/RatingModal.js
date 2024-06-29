import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import styles from '../styles/RatingModal.module.css';

const RatingModal = ({ show, onHide, reviewId, ratingId, setReviews }) => {
  const [selectedRating, setSelectedRating] = React.useState(null);

  const handleRating = async () => {
    try {
      if (ratingId) {
        await axios.delete(`/ratings/${ratingId}/`);
      }
      const { data } = await axios.post('/ratings/', { review: reviewId, stars: selectedRating });
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.map((review) => {
          return review.id === reviewId
            ? {
                ...review,
                average_rating: data.average_rating,
                rating_id: data.id,
              }
            : review;
        }),
      }));
      onHide();
    } catch (err) {
      // Handle error
    }
  };

  const handleDeleteRating = async () => {
    try {
      if (ratingId) {
        await axios.delete(`/ratings/${ratingId}/`);
        setReviews((prevReviews) => ({
          ...prevReviews,
          results: prevReviews.results.map((review) => {
            return review.id === reviewId
              ? {
                  ...review,
                  average_rating: review.average_rating,
                  rating_id: null,
                }
              : review;
          }),
        }));
        setSelectedRating(null);
        onHide();
      }
    } catch (err) {
      // Handle error
    }
  };

  return (
    <Modal show={show} onHide={onHide} >
      <Modal.Header closeButton>
        <Modal.Title>Rate this review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <FontAwesomeIcon
              key={star}
              icon={faStar}
              className={star <= selectedRating ? styles.FilledStar : styles.EmptyStar}
              onClick={() => setSelectedRating(star)}
              style={{ cursor: 'pointer', fontSize: '2rem' }}
            />
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDeleteRating} disabled={!ratingId}>
          Delete
        </Button>
        <Button variant="primary" onClick={handleRating}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RatingModal;
