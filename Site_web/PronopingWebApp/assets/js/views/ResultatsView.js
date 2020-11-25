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
          <div>
            <h1>Resultats Page!</h1>
            <div className='clubContainer'>
              <div className='gestionclubContainer'>
                {this.state.rencontres.map(rencontre =>{
                  return(
                    <ResultPronosticFragment rencontre={rencontre} joueur={joueur}/>
                    )
                  })}
              </div>
              <div className='gestionclubContainer'>
              Anciens pronostics
              </div>
            </div>
          </div>

        }
      </div>
    );
  }

}

export default ResultatsView;
