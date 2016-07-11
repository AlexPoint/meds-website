import React from 'react';
import AutosuggessThemes from '../../stylesheets/components/DrugSearchBox.scss';
import Autosuggest from 'react-autosuggest';


const drugs = [
    {
        cis: 1,
        name: 'doliprane',
        price: 1.0
    },
    {
        cis: 2,
        name: 'fervex',
        price: 1.10
    },
    {
        cis: 3,
        name: 'toplexile',
        price: 5.0
    }
]

function getSuggestions(value) {
	console.log("search drug for: "+ value);
	const inputValue = value.trim().toLowerCase();

	var filteredList = inputValue.length === 0 ? [] : drugs.filter(d =>
    	d.name.toLowerCase().indexOf(inputValue) >= 0
	);
	console.log(filteredList.length + " elements in filtered list")
	return filteredList;
}

function getSuggestionValue(suggestion) { // when suggestion selected, this function tells
  return suggestion.name;                 // what should be the value of the input
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

class Example extends React.Component {
	constructor() {
	    super();

	    this.state = {
	      value: '',
	      suggestions: getSuggestions('')
	    };

	    this.onChange = this.onChange.bind(this);
	    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  	}
  	onChange(event, { newValue }) {
	    this.setState({
	    	value: newValue
	    });
	}
	onSuggestionsUpdateRequested({ value }) {
	    this.setState({
	    	suggestions: getSuggestions(value)
	    });
	}
	render(){
		const { value, suggestions } = this.state;
	    const inputProps = {
	      placeholder: 'doliprane, fervex...',
	      value,
	      onChange: this.onChange
	    };
		return <Autosuggest suggestions={suggestions}
		   onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
		   getSuggestionValue={getSuggestionValue}
		   renderSuggestion={renderSuggestion}
		   inputProps={inputProps} />
	}
}

export default Example;
