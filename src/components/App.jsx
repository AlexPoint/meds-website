import foundationStyles from '../../node_modules/foundation-sites/dist/foundation.css';
import layoutStyles from '../../stylesheets/layout/shared.scss';
import appStyles from '../../stylesheets/components/app.scss';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import DrugSearchBox from './DrugSearchBox';


export default React.createClass({
  render: function() {
    return <div class="row">
    	<Header />
    	<div id="content" className="column row">
    		<h1>Les médicaments n'ont plus aucun secret</h1>
    		<div className="search-box">
                <h3>Quel médicament recherchez-vous ?</h3>
                <div class="medium-6 columns">
                  <label>
                    <DrugSearchBox />
                  </label>
                </div>
    		</div>
    	</div>
    	<Footer />
	</div>;
  }
});