import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Home from './components/Home';
import Drug from './components/Drug';
import Contact from './components/Contact';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
	    <IndexRoute component={Home} />
    	<Route path="contact" component={Contact} />
    	<Route path="drug/:cis" component={Drug} />
    </Route>
  </Router>
, document.getElementById("root"))