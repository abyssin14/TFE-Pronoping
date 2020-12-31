import React, { Component } from "react";
import {
  Link
} from "react-router-dom";

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
  }

  render(){
    return (
      <div className='backgroundContainer' style={{position:'relative'}}>
        <div className="BienvenueText">Bienvenue sur <span style={{color:'#fb5529'}}>P</span>rono<span style={{color:'#fb5529'}}>P</span>ing !</div>
        <div className="HomeDescriptionContainer">
          <div className="HomeDescriptionTitle">En quoi ça consite ?</div>
          <div className="HomeDescriptionText">
            PronoPing est un site réalisé pour le club de tennis de table du PC-Purnode afin que les membres de ce club puissent participer à un jeu de pronostic.
            Sans mise d'argent ni frais de participation, ce jeu à pour unique but d'offrir la possibilité aux membres du club se mesurer les uns les autres quant à leur talent de pronostiqueur.
            Un classement est établi dans son onglet dédié afin de classer les joueurs suivant leur nombre de points.
          </div>
          <div className="HomeDescriptionTitle">Comment gagner des points ?</div>
          <div className="HomeDescriptionText">
            Pour gagner des points c'est très simple, il suffit de pronostiquer. Chaques semaines les administrateurs définiront les rencontres sur lesquelles vous pourrez pronostiquer.
            Une fois les rencontres définient, des formulaires de pronostic vous seront disponibles via l'onglet 'Pronostiquer'.
            Et c'est tout, plus qu'à attendre que les rencontres soient disputées et que les administrateurs encodent les résultats, après quoi vos points seront mis à jour.
            </div>
          <div className="HomeDescriptionTitle">Comment les points sont-ils calculés ?</div>
          <div className="HomeDescriptionText">
            Les points sont calculés de cette manière : vous gagnerez 10 points si l'issu du match (victoire ou défaite) est correcte, si vous avez en plus de ça prédit le score exact du match vous vous verrez attribuer 5 points supplémentaires.
            Si l'issu du matct est incorrecte vous ne gagnerez malheureusement pas de points.
          </div>
        </div>
        <div className="HomeMobileAppContainer">
          <div className="HomeMobileAppTitle">
            Une application est également disponible sur android, télécharge la :
            <Link to="/app.js" target="_blank" download>
              Qr Code
            </Link>
          </div>
        </div>
      </div>

    );
  }

}

export default HomeView;
