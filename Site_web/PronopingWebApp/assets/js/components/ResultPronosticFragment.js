import React, { Component } from "react";
import { getClub, postEquipe, postPronostic } from '../utils/fetching'

class ResultPronosticFragment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      score1: null,
      score2: null,
      tabScore: [],
      pronostic: null
    };
    this.handleInput1ScoreChange = this.handleInput1ScoreChange.bind(this);
    this.handleInput2ScoreChange = this.handleInput2ScoreChange.bind(this);
    this.addPronostic = this.addPronostic.bind(this);


  }

  componentDidMount(){
    this.getPronostic()
    }
  getPronostic(){
      var joueur = this.props.joueur;
      var pronostics = this.props.rencontre.pronostics;
      for(let i=0; i < pronostics.length; i++){
        let id = pronostics[i].joueur.substring(13);
        if(joueur.id == id){
          this.setState({
            pronostic: this.props.rencontre.pronostics[i].score
          })
        }
      }
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
    postPronostic(this.props.joueur, this.props.rencontre, this.state.tabScore).then(response =>{
      console.log(response)
      if(response){
        this.setState({
          isLoading: false,
          pronostic: this.state.tabScore
        })
      }
    })
  }

  render(){
    const rencontre = this.props.rencontre;
    const isLoading = this.state.isLoading;
    const pronostic = this.state.pronostic;
      return (
        <div>
          { isLoading ? <div>chargement....</div> :
          <div>
            {rencontre.equipe.nom} contre {rencontre.adversaire} (division {rencontre.equipe.division}) <br></br>
            pronostics :
            { pronostic ?
                <div>{pronostic[0]}/{pronostic[1]}</div>
                :
              <div>
                Vous n'avez pas encore pronostiqué pour ce match.
              </div>
            }

          </div>
        }
      </div>
    );
  }

  }

export default ResultPronosticFragment;
