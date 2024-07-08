import styles from './App.module.css';

import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';

import './api/axiosDefaults';

import NavBar from './components/NavBar';
import NotFound from './components/NotFound';

import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';

import ReviewCreateForm from './pages/reviews/ReviewCreateForm';
import ReviewPage from './pages/reviews/ReviewPage';
import ReviewsPage from './pages/reviews/ReviewsPage';
import ReviewEditForm from './pages/reviews/ReviewEditForm';

import ProfilePage from './pages/profiles/ProfilePage';
import UsernameForm from './pages/profiles/UsernameForm';
import UserPasswordForm from './pages/profiles/UserPasswordForm';
import ProfileEditForm from './pages/profiles/ProfileEditForm';

import TicketForm from './pages/tickets/TicketForm';
import Tickets from './pages/tickets/Tickets';
import SpecialRoute from './utils/SpecialRoute';

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
          <Route
            exact
            path='/reviews/create'
            render={() => <ReviewCreateForm />}
          />
          <Route exact path='/reviews/:id' render={() => <ReviewPage />} />
          <Route
            exact
            path='/reviews/:id/edit'
            render={() => <ReviewEditForm />}
          />
          <Route exact path='/profiles/:id' render={() => <ProfilePage />} />
          <Route
            exact
            path='/profiles/:id/edit/username'
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path='/profiles/:id/edit/password'
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path='/profiles/:id/edit'
            render={() => <ProfileEditForm />}
          />
          <Route
            exact
            path="/tickets/create"
            render={() => <TicketForm />}
          />
          <SpecialRoute path="/tickets" component={Tickets} />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
