import $ from 'jquery';
import React from 'react';
import AutosuggessThemes from '../../stylesheets/components/DrugSearchBox.scss';
import Autosuggest from 'react-autosuggest';
import config from '../config/settings.js'

function getSuggestionValue(drug) { // when suggestion selected, this function tells
  return drug.name;                 // what should be the value of the input
}

function renderSuggestion(drug) {
  return (
    <span>{drug.name}</span>
  );
}

class Example extends React.Component {
	constructor() {
	    super();

	    this.state = {
	      value: '',
	      suggestions: []
	    };

	    this.onChange = this.onChange.bind(this);
	    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  	}
  	loadSuggestions(value) {
  		// Don't fetch drug names on server if less than 3 characters
  		if(typeof(value) === undefined || value.length < 3){
  			this.setState({suggestions: []})
  			return;
  		}

	    this.setState({
	      isLoading: true
	    });
	    
	    // Call server for the list of drugs
	    $.ajax({
	    	url: config.serverUrl + '/api/drug',
	    	data: {name: value},
	    	success: function(names){
	    		this.setState({
	    			suggestions: names,
	    			isLoading: false
	    		})
	    	}.bind(this),
	    	error: function(xhr, status, err){
	    		this.setState({isLoading: false})
	    	}.bind(this)
	    })
	}
  	onChange(event, { newValue }) {
	    this.setState({
	    	value: newValue
	    });
	}
	onSuggestionsUpdateRequested({ value }) {
		this.loadSuggestions(value);
	}
	render(){
		const { value, suggestions, isLoading } = this.state;
	    const inputProps = {
	      placeholder: "doliprane, fervex...",
	      value,
	      onChange: this.onChange
	    };
	    const status = (isLoading ? 'loading' : '');
		return <Autosuggest suggestions={suggestions}
		   onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
		   getSuggestionValue={getSuggestionValue}
		   renderSuggestion={renderSuggestion}
		   inputProps={inputProps} 
		   className={status}/>
	}
}

export default Example;
