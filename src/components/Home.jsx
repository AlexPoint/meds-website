import React from 'react';
import DrugSearchBox from './DrugSearchBox';

export default React.createClass({
	render: function(){
		return (
			<div>
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
		)
	}
})