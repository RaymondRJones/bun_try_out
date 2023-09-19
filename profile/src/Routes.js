import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App'; // Your existing App component
import SwipeComponent from './SwipeComponent'; // The component for /swipe route

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/swipe" component={SwipeComponent} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
}

export default Routes;