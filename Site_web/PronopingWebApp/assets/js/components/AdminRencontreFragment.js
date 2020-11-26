import React, { Component } from "react";
import { addScoreRencontre, updatePoint } from "../utils/fetching"

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

  addPronostic(){
    this.setState({
      isLoading: true
    })
    addScoreRencontre(this.props.rencontre.id, this.state.tabScore).then(response =>{
      console.log(response)
      if(response){
        updatePoint(this.props.rencontre.id).then(response =>{
          if(response){
            this.setState({
              isLoading: false,
            })
          }
        })
      }
    })
  }

  render(){
    const equipe = this.props.equipe;
    const rencontre = this.props.rencontre;
    console.log(rencontre)
    return (
      <div style={{display:'inline-flex', marginBottom:'5px'}}>
        <div style={{width: '300px'}}>
          <div>Division {equipe.division} : </div>
          <div> {equipe.nom} contre {rencontre.adversaire} </div>
        </div>
        <div>
          <div>Résultat : </div>
          <div style={{display:'inline-flex'}}>
            <input type="number" placeholder="ex: 14" className="form-control w-25 h-75" onChange={this.handleInput1ScoreChange}/>
            <input type="number" placeholder="ex: 2" className="form-control w-25 h-75" onChange={this.handleInput2ScoreChange}/>
            <span className="btn btn-success w-10" onClick={this.addPronostic}>Valider</span>
          </div>
        </div>
      </div>
    );
  }

}

export default AdminRencontreFragment;
