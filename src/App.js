import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from './pages/posts/PostCreateForm';
import ReviewCreateForm from './pages/reviews/ReviewCreateForm';
import ReviewPage from './pages/reviews/ReviewPage';
import ReviewsPage from './pages/reviews/ReviewsPage';
import { useCurrentUser } from './contexts/CurrentUserContext';

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || '';

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <ReviewsPage message='No results found. Adjust the search keyword' />
            )}
          />
          <Route
            exact
            path='/feed'
            render={() => (
              <ReviewsPage
                message='No results found. Adjust the search keyword or follow a user'
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path='/liked'
            render={() => (
              <ReviewsPage
                message='No results found. Adjust the search keyword or like a review'
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route exact path='/signin' render={() => <SignInForm />} />
          <Route exact path='/signup' render={() => <SignUpForm />} />
          <Route exact path='/posts/create' render={() => <PostCreateForm />} />
          <Route
            exact
            path='/reviews/create'
            render={() => <ReviewCreateForm />}
          />
          <Route exact path='/reviews/:id' render={() => <ReviewPage />} />
          <Route render={() => <h1>404 Page not found!</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
