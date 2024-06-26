import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Form, Col, Row, Container } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import { axiosReq } from '../../api/axiosDefaults';
import { fetchMoreData } from '../../utils/utils';

import Review from './Review';
import Asset from '../../components/Asset';
import PopularProfiles from '../profiles/PopularProfiles';

import NoResults from '../../assets/no-results.png';

import appStyles from '../../App.module.css';
import styles from '../../styles/ReviewsPage.module.css';

function ReviewsPage({ message, filter = '' }) {
  const [reviews, setReviews] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axiosReq.get(
          `/reviews/?${filter}search=${query}`
        );
        setReviews(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchReviews();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <Row className='h-100'>
      <Col className='py-2 p-0 p-lg-2 mt-5' lg={8}>
        <PopularProfiles mobile />
        <i
          className={`fas fa-search mt-5 d-none d-lg-block ${styles.SearchIcon}`}
        />
        <i className={`fas fa-search d-lg-none ${styles.SearchIcon}`} />
        <Form
          className={`${styles.SearchBar} mt-5`}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type='text'
            className='mr-sm-2'
            placeholder='Search'
          />
        </Form>

        {hasLoaded ? (
          <>
            {reviews.results.length ? (
              <InfiniteScroll
                children={reviews.results.map((review) => (
                  <Review key={review.id} {...review} setReviews={setReviews} />
                ))}
                dataLength={reviews.results.length}
                loader={<Asset spinner />}
                hasMore={!!reviews.next}
                next={() => fetchMoreData(reviews, setReviews)}
              />
            ) : (
              <Container className={`mt-3 ${appStyles.Content}`}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={`${appStyles.Content} mt-5`}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className='d-none d-lg-block p-0 p-lg-2 mt-5'>
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ReviewsPage;
