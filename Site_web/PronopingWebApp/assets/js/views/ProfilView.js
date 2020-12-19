import React, { Component } from "react";
import { getJoueur } from '../utils/fetching'

class ProfilView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount(){
  }

  render(){
    const joueur = this.props.user;
    const isLoading = this.state.isLoading;
    return (
      <div>
        { isLoading ? <div>chargement....</div> :
        <div className='backgroundContainer'>
          <h1>Mon profil</h1>
          <div className='profilContainer'>
            <div className='informationContainer'>
              <div className='titleContainer'>
                <p className='titleText'>Mes informations</p>
              </div>
              <div className='informationsContentContainer'>
                Nom d'utilisateur : {joueur.username}
              </div>
            </div>
            <div className='editInfoContainer'>
              <div className='titleContainer'>
                <p className='titleText'>Éditer</p>
              </div>
            </div>
          </div>
        </div>
      }
      </div>

    );
  }

}

export default ProfilView;
