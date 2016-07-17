import foundationStyles from '../../node_modules/foundation-sites/dist/foundation.css';
import headerStyles from '../../stylesheets/components/header.scss';
import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render: function() {
    return <div id="header">
    	<div className="column row">
	    	<div id="logo">Logo</div>
	    	<Link to="/contact" className="contact-us">Contact us</Link>
		</div>
    </div>;
  }
});