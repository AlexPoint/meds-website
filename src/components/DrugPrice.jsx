import React from 'react';

class DrugPrice extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    console.log("compositions: %s", JSON.stringify(this.props.compositions))
    var compositions = this.props.compositions;
    var composition = {};
    if(compositions && compositions.length == 1){
      composition = compositions[0]
    }
    return (
      <div>
        {composition.price}€ - taux de remboursement : <span>{composition.reimbursementRate * 100}%</span>
      </div>
      )
  }
}

export default DrugPrice;