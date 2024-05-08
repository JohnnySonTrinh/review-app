import React, { useEffect, useState } from 'react';
import Review from './Review';
import Asset from '../../components/Asset';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import NoResults from '../../assets/no-results.png';

import appStyles from '../../App.module.css';
import styles from '../../styles/ReviewsPage.module.css';
import { useLocation } from 'react-router';
import { axiosReq } from '../../api/axiosDefaults';

function ReviewsPage(message, filter = '') {
  const [reviews, setReviews] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axiosReq.get(`/reviews/?${filter}`);
        setReviews(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchReviews();
  }, [filter, pathname]);

  return (
    <Row className='h-100'>
      <Col className='py-2 p-0 p-lg-2 mt-5' lg={8}>
        <p>Popular profiles mobile</p>
        {hasLoaded ? (
          <>
            {reviews.results.length ? (
              reviews.results.map((review) => (
                <Review key={review.id} {...review} setReviews={setReviews} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className='d-none d-lg-block p-0 p-lg-2 mt-5'>
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default ReviewsPage;
