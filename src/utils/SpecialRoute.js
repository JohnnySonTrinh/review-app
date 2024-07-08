import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const SpecialAdminRoute = ({ component: Component, ...rest }) => {
  const currentUser = useCurrentUser();

  return (
    <Route
      {...rest}
      render={props =>
        currentUser && (currentUser.username === 'tickets' || currentUser.username === 'admin') ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default SpecialAdminRoute;
