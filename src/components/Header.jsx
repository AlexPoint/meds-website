import foundationStyles from '../../node_modules/foundation-sites/dist/foundation.css';
import headerStyles from '../../stylesheets/components/header.scss';
import React from 'react';


export default React.createClass({
  render: function() {
    return <div id="header">
    	<div className="column row">
	    	<div id="logo">Logo</div>
	    	<a href="#" className="contact-us">Contact us</a>
		</div>
    </div>;
  }
});