import React, { Component } from "react";

class ResultatsView extends Component {
  render(){
    return (
      <div>
        <h1>Resultats Page!</h1>
        <div className='clubContainer'>
          <div className='gestionclubContainer'>
            Pronostic en cours
          </div>
          <div className='gestionclubContainer'>
          Anciens pronostics
          </div>
        </div>
      </div>
    );
  }

}

export default ResultatsView;
