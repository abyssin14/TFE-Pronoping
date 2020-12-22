import React, { Component } from "react";
import { getRencontres } from "../utils/fetching.js"
import ResultPronosticFragment from '../components/ResultPronosticFragment.js'

class ResultatsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rencontres: null,
      isLoading: true
    };
  }
  componentDidMount(){
    getRencontres().then(response => {
      this.setState({
        isLoading: false,
        rencontres: response
      });
    })
  }
  render(){
    const isLoading = this.state.isLoading;
    const joueur = this.props.user;

    return (
      <div>
        { isLoading ? <div>chargement...</div> :
          <div className='backgroundContainer'>
            <h1>Resultats</h1>
            <div className='doubleContainer'>
              <div className='demiContainer'>
                <div className='titleContainer'>
                  <p className='titleText'>Pronostics actuels</p>
                </div>
                <div className='pronosticsActuelsContainer'>
                  {this.state.rencontres.map(rencontre =>{
                    return(
                      <ResultPronosticFragment isCurrentlySection={true} rencontre={rencontre} joueur={joueur}/>
                      )
                    })}
                </div>
              </div>
              <div className='demiContainer'>
                <div className='titleContainer'>
                  <p className='titleText'>Anciens pronostics</p>
                </div>
                <div className='pronosticsActuelsContainer'>
                  {this.state.rencontres.map(rencontre =>{
                    return(
                      <ResultPronosticFragment isCurrentlySection={false} rencontre={rencontre} joueur={joueur}/>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>

        }
      </div>
    );
  }

}

export default ResultatsView;
