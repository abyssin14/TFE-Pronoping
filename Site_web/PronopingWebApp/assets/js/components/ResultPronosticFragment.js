import React, { Component } from "react";

class ResultPronosticFragment extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          if(this.props.isCurrentlySection){
            if(!this.props.rencontre.pronostics[i].isFinished){
              this.setState({
                pronostic: this.props.rencontre.pronostics[i],
              })
            }
          }else{
            if(this.props.rencontre.pronostics[i].isFinished){
              this.setState({
                pronostic: this.props.rencontre.pronostics[i],
              })
            }
          }


        }
      }
    }

  render(){
    const rencontre = this.props.rencontre;
    const pronostic = this.state.pronostic;
    const date = new Date(rencontre.date).toLocaleDateString();

      return (
          <div>
            { pronostic ?
              <div className='ResultPronosticFragmentContainer'>
                <div style={{position:'relative'}}>
                  {!this.props.isCurrentlySection ?
                    <div style={{position:'absolute'}}>
                      {date}
                    </div>
                  :null}
                    <p className='ResultPronosticFragmentRencontreText'>{rencontre.equipe.nom} contre {rencontre.adversaire} (division {rencontre.equipe.division})</p>
                    <div className='ResultPronosticFragmentPronoResultContainer'>
                      <p className='ResultPronosticFragmentPronosticText'>Votre pronostics : {pronostic.score[0]}/{pronostic.score[1]}</p>
                      <p className='ResultPronosticFragmentResultatText'>Résultat : {rencontre.score.length > 0 ? rencontre.score[0]+'/'+rencontre.score[1] : 'indisponible'}</p>
                    </div>
                    <div className='ResultPronosticFragmentPointsContainer'>
                      <p>Points rapporté : {pronostic.pointsRapportes != null ? pronostic.pointsRapportes : 'indisponible'}</p>
                    </div>
                  </div>
              </div>
              :null}
          </div>
    );
  }

  }

export default ResultPronosticFragment;
