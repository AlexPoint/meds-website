import $ from 'jquery';
import _ from 'underscore';
import config from '../config/settings.js'
import foundationStyles from '../../node_modules/foundation-sites/dist/foundation.css';
import layoutStyles from '../../stylesheets/layout/shared.scss';
import appStyles from '../../stylesheets/components/drug.scss';
import React from 'react';

function drugViewModel(drugAndType){
  if(typeof(drugAndType) === "undefined" || typeof(drugAndType.drug) === "undefined"){
    return {};
  }

  // TODO: we inverted compositions and presentations in the db; invert below when db has been fixed
  var presentation = drugAndType.drug.compositions && drugAndType.drug.compositions.length > 0 ?
    drugAndType.drug.compositions[0] : "";
  var compositions = drugAndType.drug.presentations ? _.map(drugAndType.drug.presentations, function(pres){
    return {
      substanceName: pres.substanceName,
      substanceCode: pres.substanceCode,
      format: pres.name
    }
  }): [];
  return {
    genericType: 0 <= drugAndType.type && drugAndType.type <= 4 ? genericTypes[drugAndType.type] : "",
    name: drugAndType.drug.name,
    cis: drugAndType.drug.cis,
    owner: drugAndType.drug.owner,
    price: presentation.price,
    reimbursementRate: presentation.reimbursementRate,
    compositions: compositions
  }
}

const genericTypes = [
  "princeps", // 0 
  "générique", // 1
  "génériques par complémentarité posologique", // 2
  "", //  undefined
  "générique substituable" // 4
];

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

    var model = drugViewModel(currentDrug);
    var otherDrugViews = _.map(otherDrugs, function(drugAndType){
      var model = drugViewModel(drugAndType);
      return (<li key={model.cis}>{model.name}: {model.price}€ (taux de remboursement: {model.reimbursementRate * 100}%) - {model.genericType}</li>)
    })

    //var price = <DrugPrice compositions={currentDrug.drug.compositions} />
    var compositions = _.map(model.compositions, function(compo){
      return (<div key={compo.substanceCode}>{compo.substanceName} ({compo.format})</div>);
    })
    return (
    	<div id="content" className="column row">
    		<h1>{model.name}</h1>
        <div>
          Pathologies contre lesquelles ce médicament peut être prescrit... (TODO)
        </div>
        <div>
          {model.price}€ - taux de remboursement : {model.reimbursementRate * 100}% - {model.genericType}
        </div>
        <div>
          Autres médicaments du même groupe:
          <ul>
            {otherDrugViews}
          </ul>
        </div>
        <div>
          <h3>Details</h3>
          <div>
            Laboratoire: {model.owner}
          </div>
          <div>
            Format: {model.format}
          </div>
          <div>
            Principes actifs:
            {compositions}
          </div>
        </div>
    	</div>);
  }
}

export default DrugPage;