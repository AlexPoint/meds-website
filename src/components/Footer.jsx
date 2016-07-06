//import styles from '/stylesheets/modules/footer';
require("../stylesheets/modules/footer.scss");
import React from 'react';


export default React.createClass({
  render: function() {
    return <div id="footer">
    	<ul>
    		<li><a href="#">contact</a></li>
    	</ul>
    </div>;
  }
});