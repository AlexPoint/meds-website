import foundationStyles from '../../node_modules/foundation-sites/dist/foundation.css';
import layoutStyles from '../../stylesheets/layout/shared.scss';
import appStyles from '../../stylesheets/components/app.scss';
import React from 'react';
import Header from './Header';
import Footer from './Footer';


export default React.createClass({
  render: function() {
    return <div class="row">
    	<Header />
    	<div id="content" className="column row">
    		{ this.props.children }
    	</div>
    	<Footer />
	</div>;
  }
});