import React from 'react';
import styles from '../../styles/Review.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { axiosRes } from '../../api/axiosDefaults';

const Review = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    github_repo,
    live_website,
    updated_at,
    reviewPage,
    setReview,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post('/likes/', { review: id });
      setReview((prevReviews) => ({
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
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}`);
      setReview((prevReviews) => ({
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
      console.log(err);
    }
  };

  return (
    <Card className={styles.Review}>
      <Card.Body>
        <Media className='align-items-center justify-content-between'>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className='d-flex align-items-center'>
            <span>{updated_at}</span>
            {is_owner && reviewPage && '...'}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/reviews/${id}`}>
        <Card alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className='text-center'>{title}</Card.Title>}
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
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Review;
