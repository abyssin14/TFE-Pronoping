import React, { Component } from "react";
import { postPronostic, updatePreviousPronostics } from '../utils/fetching'
import Loader from 'react-loader-spinner'

class EditPronosticFragment extends Component {
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
      if(response){
        this.setState({
          pronostic: this.state.tabScore
        })
        updatePreviousPronostics(this.props.joueur).then(response =>{
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
    const rencontre = this.props.rencontre;
    const isLoading = this.state.isLoading;
    const pronostic = this.state.pronostic;
      return (
        <div className='PronosticFragment'>
          { isLoading ?
            <Loader
               type="Rings"
               color="#fb5529"
               height={80}
               width={80}
               className='loader'
               timeout={8000}
            />
          :
          <div>
            {rencontre.equipe.nom} contre {rencontre.adversaire} (division {rencontre.equipe.division}) <br></br>
            pronostics :
            { pronostic ?
                <div style={{marginTop:'5px'}}>{pronostic[0]}/{pronostic[1]}</div>
                :
              <div className='editPronosticContainer'>
                <input type="number" placeholder="ex: 14" className="form-control scoreInput" onChange={this.handleInput1ScoreChange}/>
                <input type="number" placeholder="ex: 2" className="form-control scoreInput" onChange={this.handleInput2ScoreChange}/>
                <span className="btn w-10 h-25" onClick={this.addPronostic}>Valider</span>
              </div>
            }

          </div>
        }
      </div>
    );
  }

  }

export default EditPronosticFragment;
