// auth/protected-route.js

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute  = ({component: Component, currentUser, ...rest}) => {
    return (
      <Route
        {...rest}
        render={ props  => {
            if(currentUser === process.env.REACT_APP_ADMIN){
              return <Component {...props} currentUser={currentUser}/>
            } else {
              return <Redirect to={{pathname: '/', state: {from: props.location}}} />
            }
          }
        }
      />
    )
}
export default ProtectedRoute;