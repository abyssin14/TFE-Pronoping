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
          if(!this.props.rencontre.pronostics[i].isFinished)
          this.setState({
            pronostic: this.props.rencontre.pronostics[i],
          })
        }
      }
    }

  render(){
    const rencontre = this.props.rencontre;
    const isLoading = this.state.isLoading;
    const pronostic = this.state.pronostic;

      return (
        <div>
          { isLoading ? <div>chargement....</div> :
          <div>
            { pronostic ?
              <div>
              { !pronostic.isFinished ?
                <div>
                    {rencontre.equipe.nom} contre {rencontre.adversaire} (division {rencontre.equipe.division}) <br></br>
                    <div style={{display:"inline-flex"}}>
                      <div>pronostics :</div>
                      <div>{pronostic.score[0]}/{pronostic.score[1]}</div>
                    </div>
                    <div>
                      Résultat :
                      { rencontre.score.length > 0 ?
                        <div>
                          <div>{rencontre.score[0]}/{rencontre.score[1]}</div>
                          <div>Points rapporté : {pronostic.pointsRapportes}</div>
                        </div>
                        :
                          <div>
                          Pas encore disponible.
                        </div>
                      }
                    </div>
                  </div>
                :null}
              </div>
              :null}
          </div>
        }
      </div>
    );
  }

  }

export default ResultPronosticFragment;
