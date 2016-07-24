import $ from 'jquery';
import _ from 'underscore';
import config from '../config/settings.js'
import foundationStyles from '../../node_modules/foundation-sites/dist/foundation.css';
import layoutStyles from '../../stylesheets/layout/shared.scss';
import appStyles from '../../stylesheets/components/drug.scss';
import React from 'react';
import DrugPrice from './DrugPrice';

class DrugPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {currentCis: this.props.params.cis};
  }
  loadDrugFromServer(){
    var that = this;
    $.ajax({
      url: config.serverUrl + '/api/drugGroup',
      data: {cis: this.props.params.cis},
      beforeSend: function(){
        that.setState({loading: true})
      },
      success: (data) => {
        this.setState({
          group: data[0],
          loading: false
        })
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    })
    .done(function(){
      that.setState({loading: false})
    })
  }
  componentDidMount() {
    this.loadDrugFromServer();
  }
  render() {
    var that = this;

    if(this.state.loading){
      return (<div id="content" className="column row loading">loading...</div>)
    }

    console.log("state.group: %s", JSON.stringify(this.state.group))
    var currentDrug;
    var otherDrugs;
    if(this.state.group && this.state.group.drugAndTypes){
      currentDrug = _.find(this.state.group.drugAndTypes, function(drugAndType){
        return drugAndType.drug && drugAndType.drug.cis == that.state.currentCis;
      });
      otherDrugs = _.filter(this.state.group.drugAndTypes, function(drugAndType){
        return drugAndType.drug && drugAndType.drug.cis != that.state.currentCis;
      })
    }

    if(typeof(currentDrug) === "undefined" || typeof(currentDrug.drug) === "undefined"){
      console.log("Drug undefined")
      return (<div iv="content" className="column row">Drug couldn''t be found in db</div>)
    }

    var price = <DrugPrice compositions={currentDrug.drug.compositions} />
    return (
    	<div id="content" className="column row">
    		<h1>{currentDrug ? currentDrug.drug.name: "undefined"}</h1>
        <div>
          Laboratoire: {currentDrug ? currentDrug.drug.owner : undefined}
        </div>
        <ul>
          {price}
        </ul>
        <div>
          Autres médicaments du même groupe:
        </div>
    	</div>);
  }
}

export default DrugPage;