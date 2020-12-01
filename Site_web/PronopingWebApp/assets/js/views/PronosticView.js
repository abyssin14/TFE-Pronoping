import React, { Component } from "react";
import { getRencontres, updatePreviousPronostics } from '../utils/fetching';
import EditPronosticFragment from '../components/EditPronosticFragment';

class PronosticView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };

  }

  componentDidMount(){
    getRencontres().then( response =>{
      console.log(response);
      this.setState({
        listRencontres: response,
        isLoading: false
      });
    });
  }

  renderRencontre(){
    var listRencontreNotFinished = []
    for(let r=0; r < this.state.listRencontres.length; r++){
      if(!this.state.listRencontres[r].isFinished){
        listRencontreNotFinished.push(this.state.listRencontres[r])
      }
    }
    var html = new Array();
    for(let i=0; i < listRencontreNotFinished.length; i++){
      html.push(<EditPronosticFragment rencontre={listRencontreNotFinished[i]} joueur={this.props.user}/>)
    }
    return html;
  }

  render(){
    const joueur = this.props.user;
    const isLoading = this.state.isLoading;
    return (
      <div>
        { isLoading ? <div>chargement....</div> :
        <div>
          <h1>Pronostic Page!</h1>
          <div>
            {this.renderRencontre()}
          </div>
        </div>
      }
    </div>
    );
  }

}

export default PronosticView;
