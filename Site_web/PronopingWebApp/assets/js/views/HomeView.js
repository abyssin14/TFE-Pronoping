import React, { Component } from "react";
import {
  Link
} from "react-router-dom";
import qrCode from '../../Images/qr-code.png'

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
          <div className="HomeDescriptionTitle">En quoi ça consiste ?</div>
          <div className="HomeDescriptionText">
            PronoPing est un site réalisé pour le club de tennis de table du PC-Purnode afin que les membres de ce club puissent participer à un jeu de pronostic.
            Sans mise d'argent ni frais de participation, ce jeu a pour unique but d'offrir la possibilité aux membres du club de se mesurer les uns aux autres quant à leur talent de pronostiqueur.
            Un classement est établi dans son onglet dédié afin de classer les joueurs suivant leur nombre de points.
          </div>
          <div className="HomeDescriptionTitle">Comment gagner des points ?</div>
          <div className="HomeDescriptionText">
            Pour gagner des points, c'est très simple : il suffit de pronostiquer.
            Chaque semaine, les administrateurs définiront les rencontres sur lesquelles vous pourrez pronostiquer.
            Une fois les rencontres définies, des formulaires de pronostic vous seront accessibles via l'onglet 'Pronostiquer'.
            Et c'est tout. Plus qu'à attendre que les rencontres soient disputées et que les administrateurs encodent les résultats, après quoi vos points seront mis à jour.
            </div>
          <div className="HomeDescriptionTitle">Comment les points sont-ils calculés ?</div>
          <div className="HomeDescriptionText">
            Les points sont calculés de cette manière : vous gagnerez 10 points si l'issue du match (victoire ou défaite) est correcte.
            Si vous avez, en plus de cela, prédit le score exact du match, vous vous verrez attribuer 5 points supplémentaires.
            Si l'issue du match est incorrecte, vous ne gagnerez malheureusement pas de point.
          </div>
        </div>
        <div className="HomeMobileAppContainer">
          <div className="HomeMobileAppTitle">
            Une application est également disponible sur android, télécharge la :
            <div>
              <img src={qrCode} width='50%' className="qrCode"></img>
              <div className="EtapeDownload">1) Scanez le qr code</div>
              <div className="EtapeDownload">2) téléchargez le fichier (.apk)</div>
              <div className="EtapeDownload">3) Retrouvez le fichier "PronopingApp.apk" dans vos fichiers</div>
              <div className="EtapeDownload">4) Cliquez sur ce fichier pour l'installer</div>
              <div className="EtapeDownload" style={{fontWeight:'normal', fontSize:'15px'}}>Lors du téléchargement et/ou de l'installation, vous aurez peut-être des messages d'alerte vous indiquant que le fichier peut endommager votre smartphone et/ou que la source est inconnue. Poursuivez quand même le téléchargement et l'installation de celui-ci.</div>



            </div>
          </div>
        </div>
      </div>

    );
  }

}

export default HomeView;
