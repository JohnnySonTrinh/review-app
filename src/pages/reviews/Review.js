import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';

import Avatar from '../../components/Avatar';
import { MoreDropdown } from '../../components/MoreDropdown';

import styles from '../../styles/Review.module.css';

const Review = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    notes_count,
    likes_count,
    like_id,
    title,
    content,
    github_repo,
    live_website,
    updated_on,
    reviewPage,
    setReviews,
    average_rating,
    rating_id,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const [userRating, setUserRating] = useState(null);

  useEffect(() => {
    if (currentUser && rating_id) {
      const fetchUserRating = async () => {
        try {
          const { data } = await axiosRes.get(`/ratings/${rating_id}/`);
          setUserRating(data.stars);
        } catch (err) {
          // console.log(err);
        }
      };
      fetchUserRating();
    }
  }, [currentUser, rating_id]);

  const handleEdit = () => {
    history.push(`/reviews/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/reviews/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post('/likes/', { review: id });
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.map((review) => {
          return review.id === id
            ? {
                ...review,
                likes_count: review.likes_count + 1,
                like_id: data.id,
              }
            : review;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}`);
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.map((review) => {
          return review.id === id
            ? {
                ...review,
                likes_count: review.likes_count - 1,
                like_id: null,
              }
            : review;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  const handleRating = async (rating) => {
    try {
      if (rating_id) {
        // Delete existing rating
        await axiosRes.delete(`/ratings/${rating_id}/`);
      }

      // Create new rating
      const { data } = await axiosRes.post('/ratings/', { review: id, stars: rating });
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.map((review) => {
          return review.id === id
            ? {
                ...review,
                average_rating: data.average_rating, // Update with the new average rating
                rating_id: data.id, // Update the rating_id with the new one
              }
            : review;
        }),
      }));
      setUserRating(rating); // Update the user's rating selection
    } catch (err) {
      // console.log(err);
    }
  };

  const renderStars = () => {
    const stars = [];
    const ratingToDisplay = userRating !== null ? userRating : Math.round(average_rating || 0);

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={i <= ratingToDisplay ? styles.FilledStar : styles.EmptyStar}
          onClick={() => handleRating(i)}
          style={{ cursor: 'pointer' }}
        />
      );
    }
    return stars;
  };

  return (
    <Card className={styles.Review}>
      <Card.Body>
        <Media className='align-items-center justify-content-between'>
          <Link className='font-weight-bold' to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className='d-flex align-items-center'>
            <span>{updated_on}</span>
            {is_owner && reviewPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/reviews/${id}`}>
        <Card alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className='text-center font-weight-bold'>{title}</Card.Title>}
        {github_repo && github_repo.trim() !== '' && (
          <a href={github_repo} target='_blank' rel='noopener noreferrer'>
            <i className='fa-brands fa-github'></i>
          </a>
        )}
        {live_website && live_website.trim() !== '' && (
          <a href={live_website} target='_blank' rel='noopener noreferrer'>
            <i className='fa fa-globe'></i>
          </a>
        )}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.ReviewBar}>
          {is_owner ? (
            <OverlayTrigger
              placement='top'
              overlay={<Tooltip>You can't like your own review!</Tooltip>}
            >
              <i className='far fa-heart' />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement='top'
              overlay={<Tooltip>Log in to like reviews!</Tooltip>}
            >
              <i className='far fa-heart' />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/reviews/${id}`}>
            <i className='far fa-comments' />
          </Link>
          {notes_count}
          {/* Display the average rating */}
          <div>
            {renderStars()}
            <span className={styles.AverageRating}>({average_rating ? average_rating.toFixed(1) : `${userRating ?? average_rating}` })</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Review;
