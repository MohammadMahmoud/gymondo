import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Header from '../components/header';
import Home from '../pages/home';
import Workout from '../pages/workout-details';
import 'antd/dist/antd.css';
import './style.css';

/* this is a container for app, including the routing */

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/workout/:id' component={Workout} />
        <Route exact path='/' component={Home} />
        <Route path='*' exact>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
