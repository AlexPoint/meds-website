import $ from 'jquery';
import _ from 'underscore';
import config from '../config/settings.js'
import foundationStyles from '../../node_modules/foundation-sites/dist/foundation.css';
import layoutStyles from '../../stylesheets/layout/shared.scss';
import appStyles from '../../stylesheets/components/drug.scss';
import React from 'react';

class DrugPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {currentCis: this.props.params.cis};
  }
  loadDrugFromServer(){
    $.ajax({
      url: config.serverUrl + '/api/drugGroup',
      data: {cis: this.props.params.cis},
      success: (data) => {
        this.setState({group: data[0]})
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    })
  }
  componentDidMount() {
    this.loadDrugFromServer();
  }
  render() {
    var that = this;
    console.log("state.group: %s", JSON.stringify(this.state.group))
    var currentDrug;
    if(this.state.group && this.state.group.drugAndTypes){
      currentDrug = _.find(this.state.group.drugAndTypes, function(drugAndType){
        return drugAndType.drug && drugAndType.drug.cis == that.state.currentCis
      });
    }
    console.log(currentDrug)
    return (
      <div>
      	<div id="content" className="column row">
      		<h1>{currentDrug ? currentDrug.drug.name: "undefined"}</h1>
      	</div>
    	</div>);
  }
}

export default DrugPage;