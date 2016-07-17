import foundationStyles from '../../node_modules/foundation-sites/dist/foundation.css';
import layoutStyles from '../../stylesheets/layout/shared.scss';
import appStyles from '../../stylesheets/components/drug.scss';
import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default React.createClass({
  render: function() {
    return <div>
          	<div id="content" className="column row">
          		<h1>Page pour le médicament avec le code {this.props.params.cis}</h1>
          	</div>
      	</div>;
  }
});