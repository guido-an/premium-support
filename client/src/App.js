import React, {useState, useEffect} from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin';
import Home from './pages/Home';
import TicketsUser from './pages/user/TicketsUser';
import CreaTicket from './pages/user/CreaTicket';
import TicketsAdmin from './pages/admin/TicketsAdmin';
import {service} from './api/service';

function App() {
  let [currentUser, setCurrentUser] = useState(null);

  const liftUserUp = user => {
    setCurrentUser((currentUser = user));
  };

  
   useEffect(() => {
    service.get('/auth/currentUser')
      .then(res => {
        setCurrentUser((currentUser = res.data.currentUser.username));
      })
      .catch(err => {
        setCurrentUser((currentUser = null));
      });
  });


  console.log(currentUser, "current user")
  return (
    <section>
      <NavBar liftUserUp={liftUserUp} currentUser={currentUser} />
      <Switch>
        <Route
          exact
          path="/"
          render={props => <Home {...props} liftUserUp={liftUserUp} />}
        />
        <ProtectedRoute
          currentUser={currentUser}
          exact
          path="/tickets"
          component={TicketsUser}
        />
        <ProtectedRoute
          currentUser={currentUser}
          path="/crea-ticket"
          component={CreaTicket}
        />
        <ProtectedRouteAdmin
          currentUser={currentUser}
          exact
          path="/admin"
          component={TicketsAdmin}
        />
      </Switch>
    </section>
  );
}

export default App