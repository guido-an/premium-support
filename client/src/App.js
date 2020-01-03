// import React, {useState, useEffect} from 'react';
// import './App.css';
// import {Route, Switch} from 'react-router-dom';
// import NavBar from './components/NavBar';
// import ProtectedRoute from './components/ProtectedRoute';
// import ProtectedRouteAdmin from './components/ProtectedRouteAdmin';
// import Home from './pages/Home';
// import TicketsUser from './pages/user/TicketsUser';
// import CreaTicket from './pages/user/CreaTicket';
// import TicketPage from './pages/user/TicketPage';
// import TicketsAdmin from './pages/admin/TicketsAdmin';
// import {serviceAPI} from './api/serviceAPI';


// function App() {
//   let [currentUser, setCurrentUser] = useState(null);

//   const liftUserUp = user => {
//     setCurrentUser((currentUser = user));
//   };

  
//    useEffect(() => {
//     serviceAPI.get('/auth/currentUser')
//       .then(res => {
//         setCurrentUser((currentUser = res.data.currentUser));
//       })
//       .catch(err => {
//         setCurrentUser((currentUser = null));
//       });
//   }, []);

//   console.log(currentUser, "current user")
//   return (
//     <section>
//            <NavBar liftUserUp={liftUserUp} currentUser={currentUser} />
//       <Switch>
//         <Route
//           exact
//           path="/"
//           render={props => <Home {...props} liftUserUp={liftUserUp} />}
//         />
//         <ProtectedRoute
//           currentUser={currentUser}
//           path="/crea-ticket"
//           component={CreaTicket}
//         />
//         <ProtectedRoute
//           currentUser={currentUser}
//           exact
//           path="/tickets"
//           component={TicketsUser}
//         />
//         <ProtectedRoute
//           currentUser={currentUser}
//           path="/tickets/:id"
//           component={TicketPage}
//         />
//         <ProtectedRouteAdmin
//           currentUser={currentUser}
//           exact
//           path="/admin"
//           component={TicketsAdmin}
//         />
//       </Switch>
//     </section>
//   );
// }

// export default App
import React, {useState, useEffect} from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin';
import Home from './pages/Home';
import TicketsUser from './pages/user/TicketsUser';
import CreaTicket from './pages/user/CreaTicket';
import TicketPage from './pages/user/TicketPage';
import TicketsAdmin from './pages/admin/TicketsAdmin';
import {serviceAPI} from './api/serviceAPI';


function App() {
  let [currentUser, setCurrentUser] = useState({});

  const liftUserUp = user => {
    setCurrentUser((currentUser = user));
  };


   useEffect(() => {
    serviceAPI.get('/auth/currentUser')
      .then(res => {
        setCurrentUser((currentUser = res.data.currentUser));
      })
      .catch(err => {
        setCurrentUser((currentUser = null));
      });
  }, []);

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
          path="/crea-ticket"
          component={CreaTicket}
        />
        <ProtectedRoute
          currentUser={currentUser}
          exact
          path="/tickets"
          component={TicketsUser}
        />
        <ProtectedRoute
          currentUser={currentUser}
          path="/tickets/:id"
          component={TicketPage}
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