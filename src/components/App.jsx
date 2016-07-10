import layoutStyles from '../../stylesheets/layout/shared.scss';
import React from 'react';
import Header from './Header';
import Footer from './Footer';


export default React.createClass({
  render: function() {
    return <div class="row">
    	<Header />
    	<div id="content" className="column row">Hello</div>
    	<Footer />
	</div>;
  }
});