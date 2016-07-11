import foundationStyles from '../../node_modules/foundation-sites/dist/foundation.css';
import footerStyles from '../../stylesheets/components/footer.scss';
import React from 'react';


export default React.createClass({
  render: function() {
    return <div id="footer">
    	<div className="column row">
    		<a ref="#">Contact us</a>
    	</div>
    </div>;
  }
});