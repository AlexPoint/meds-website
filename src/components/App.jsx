import React from 'react';
import Header from './Header';
import Footer from './Footer';


export default React.createClass({
  render: function() {
    return <div>
    	<Header />
    	<div id="content">Hello</div>
    	<Footer />
	</div>;
  }
});