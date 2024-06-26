import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Col, Row, Container, Button, Image } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';

import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useProfileData, useSetProfileData } from '../../contexts/ProfileDataContext';

import Asset from '../../components/Asset';
import PopularProfiles from './PopularProfiles';
import Review from '../reviews/Review';
import { ProfileEditDropdown } from '../../components/MoreDropdown';

import styles from '../../styles/ProfilePage.module.css';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';

import { fetchMoreData } from '../../utils/utils';
import NoResults from '../../assets/no-results.png';


function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileReviews, setProfileReviews] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();

  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileReviews }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/reviews/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileReviews(profileReviews);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      <Row noGutters className='px-3 text-center'>
        <Col lg={3} className='text-lg-left'>
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className='m-2'>@{profile?.owner}</h3>
          <Row className='justify-content-center no-gutters'>
            <Col xs={3} className='my-2'>
              <div>{profile?.reviews_count}</div>
              <div>reviews</div>
            </Col>
            <Col xs={3} className='my-2'>
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className='my-2'>
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
          {/* Add GitHub and LinkedIn links here */}
          {profile?.github && profile.github.trim() !== '' && (
            <a
              href={profile.github}
              target='_blank'
              rel='noopener noreferrer'
              className='m-2'
            >
              <i className='fa-brands fa-github'></i>
            </a>
          )}
          {profile?.linkedin && profile.linkedin.trim() !== '' && (
            <a
              href={profile.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              className='m-2'
            >
              <i className='fa-brands fa-linkedin'></i>
            </a>
          )}
        </Col>
        {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
        <Col lg={3} className='text-lg-right'>
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                onClick={() => handleUnfollow(profile)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => handleFollow(profile)}
              >
                follow
              </Button>
            ))}
        </Col>
        {profile?.content && <Col className='p-3'>{profile.content}</Col>}
      </Row>
    </>
  );

  const mainProfileReviews = (
    <>
      <hr />
      <p className='text-center'>{profile?.owner}'s posts</p>
      <hr />
      {profileReviews.results.length ? (
        <InfiniteScroll
          children={profileReviews.results.map((review) => (
            <Review
              key={review.id}
              {...review}
              setReviews={setProfileReviews}
            />
          ))}
          dataLength={profileReviews.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileReviews.next}
          next={() => fetchMoreData(profileReviews, setProfileReviews)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't reviewed yet.`}
        />
      )}
    </>
  );

  return (
    <Row className='mt-5'>
      <Col className='py-2 p-0 p-lg-2 mt-5' lg={8}>
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfileReviews}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className='d-none d-lg-block p-0 p-lg-2'>
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
