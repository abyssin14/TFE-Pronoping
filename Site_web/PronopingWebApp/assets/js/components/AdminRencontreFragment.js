import React, { Component } from "react";
import { addScoreRencontre, updatePoint, deleteRencontre } from "../utils/fetching"
import { checkScore } from '../utils/CalculPoints'


class AdminRencontreFragment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      score1: null,
      score2: null,
      tabScore: [],
    };
    this.handleInput1ScoreChange = this.handleInput1ScoreChange.bind(this);
    this.handleInput2ScoreChange = this.handleInput2ScoreChange.bind(this);
    this.addPronostic = this.addPronostic.bind(this);
  }

  handleInput1ScoreChange(event){
    this.setState({
      score1: event.target.value,
      tabScore: [event.target.value, this.state.score2]

    })
  }

  handleInput2ScoreChange(event){
    this.setState({
      score2: event.target.value,
      tabScore: [this.state.score1, event.target.value]

    })
  }
  handleDeleteClick(){
    var confirmation = confirm("Attention en supprimant cette rencontre, tous les pronostics liés à celle-ci seront également supprimés.")
    if(confirmation){
      this.props.loading(true)
      deleteRencontre(this.props.rencontre).then(response =>{
        if(response){
          this.props.reload()
        }
      })
    }
  }
  addPronostic(){
    if(checkScore(this.state.tabScore)){
      this.props.loading()
      addScoreRencontre(this.props.rencontre.id, this.state.tabScore).then(response =>{
        if(response){
          updatePoint(this.props.rencontre.id).then(response =>{
            if(response){
              this.props.reload()
            }
          })
        }
      })
    }else{
      alert('Veuillez entrer un score valide !')
    }
  }

  render(){
    const equipe = this.props.equipe;
    const rencontre = this.props.rencontre;
    return (
      <div className='adminRencontreFragmentContainer'>
        <div style={{width: '300px'}}>
          <div>Division {equipe.division} : </div>
          <div> {equipe.nom} contre {rencontre.adversaire} </div>
        </div>
        <div>
          <div>Résultat : </div>
          <div style={{display:'inline-flex'}}>
            <input type="number" placeholder="ex: 14" className="form-control scoreInput" onChange={this.handleInput1ScoreChange}/>
            <input type="number" placeholder="ex: 2" className="form-control scoreInput" onChange={this.handleInput2ScoreChange}/>
            <span className="btn w-10 h-25" onClick={this.addPronostic}>Valider</span>
          </div>
        </div>
        <div>
          <span className="boutonDelete" onClick={this.handleDeleteClick.bind(this)}>&#x274C;</span>
        </div>
      </div>
    );
  }

}

export default AdminRencontreFragment;
