import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import styles from '../styles/RatingModal.module.css';

const RatingModal = ({ show, onHide, reviewId, ratingId, setReviews, title }) => {
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    const fetchUserRating = async () => {
      if (ratingId && show) {
        try {
          const { data } = await axios.get(`/ratings/${ratingId}/`);
          setSelectedRating(data.stars);
        } catch (err) {
          console.error(err);
        }
      } else {
        setSelectedRating(null);
      }
    };

    fetchUserRating();
  }, [ratingId, show]);

  const fetchUpdatedReview = async () => {
    try {
      const { data } = await axios.get(`/reviews/${reviewId}/`);
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.map((review) =>
          review.id === reviewId ? { ...review, ...data } : review
        ),
      }));
    } catch (err) {
      console.error(err); 
    }
  };

  const handleRating = async () => {
    try {
      if (ratingId) {
        await axios.delete(`/ratings/${ratingId}/`);
      }
      await axios.post('/ratings/', { review: reviewId, stars: selectedRating });
      await fetchUpdatedReview();
      onHide();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteRating = async () => {
    try {
      if (ratingId) {
        await axios.delete(`/ratings/${ratingId}/`);
        await fetchUpdatedReview();
        setSelectedRating(null);
        onHide();
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.error("Rating not found. It might have been deleted already.");
        setSelectedRating(null);
        onHide();
      } else {
        console.error(err);
      }
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName={styles.ModalCentered}
      contentClassName={styles.ModalContent}
    >
      <Modal.Header closeButton className={styles.ModalHeader}>
        <Modal.Title className={styles.ModalTitle}>Rate: {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.ModalBody}>
        <div className={styles.StarContainer}>
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
      <Modal.Footer className={styles.ModalFooter}>
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
