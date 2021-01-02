import React, { Component } from "react";
import { getJoueurs } from "../utils/fetching.js"
import Loader from 'react-loader-spinner'

class ClassementView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joueurs: null,
      isLoading: true
    };
  }
  componentDidMount(){
    getJoueurs().then(response=>{
      this.setState({
        isLoading: false,
        joueurs: response
      })
    })
  }
  render(){
    const isLoading = this.state.isLoading
    var joueurs = this.state.joueurs
    if(joueurs){
      joueurs.sort(function(a,b){
        return b.nbPoints - a.nbPoints
      })
    }
    return (
          <div className='backgroundContainer'>
            <h1 className='titlePage'>Classement</h1>
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
                <div className= 'classementContainer'>
                          <table className="tableContainer">
                            <tr className="tableHeadContainer">
                                <th className="tableHeadText">Place</th>
                                <th className="tableHeadTextBig">Nom d'utilisateur</th>
                                <th className="tableHeadText">Points</th>
                            </tr>
                            {joueurs.map((joueur,i) =>{
                            return (
                              <tr className="tableRowContainer" style={i%2!=0? {backgroundColor:'#c9c9c9'} :null}>
                                <td className="tableRowText" style={joueur.id == this.props.user.id ? {fontWeight:'bold', color:'#fb5529'}:null}>{i+1}</td>
                                <td className="tableRowTextBig" style={joueur.id == this.props.user.id ? {fontWeight:'bold', color:'#fb5529'}:null}> {joueur.username}</td>
                                <td className="tableRowText" style={joueur.id == this.props.user.id ? {fontWeight:'bold', color:'#fb5529'}:null}>{joueur.nbPoints}</td>
                              </tr>
                            )
                          })}
                          </table>
                </div>
              </div>
            }
          </div>

    );
  }

}

export default ClassementView;
