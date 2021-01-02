import React, { Component } from "react";
import { deletePronostic } from '../utils/fetching'

class AdminPronosticFragment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };

  }
  componentDidMount(){

  }
  handleDeleteClick(){

    var confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce pronostic ?")
    if(confirmation){
      this.props.loading()
      deletePronostic(this.props.pronostic.id).then(response =>{
        if(response){
          this.props.reload()
        }
      })
    }
  }
  render(){
    const pronostic = this.props.pronostic
    return (
      <div style={{position:'relative'}}>
        <div className='adminPronosticFragmentContainer'>
          <div className='adminPronosticFragmentContainerCell'>
            {pronostic.joueur.username}
          </div>
          <div className='adminPronosticFragmentContainerCell'>
            {pronostic.rencontre.equipe.nom} contre {pronostic.rencontre.adversaire}
          </div>
          <div className='adminPronosticFragmentContainerCell'>
            {pronostic.score[0]}/{pronostic.score[1]}
          </div>
        </div>
        <div style={{position:'absolute',top:5, right:5}}>
          <span className="boutonDelete" onClick={this.handleDeleteClick.bind(this)}>&#x274C;</span>
        </div>
      </div>

    );
  }

}

export default AdminPronosticFragment;
