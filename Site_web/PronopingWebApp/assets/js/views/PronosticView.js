import React, { Component } from "react";
import { getRencontres } from '../utils/fetching';
import PronosticFragment from '../components/PronosticFragment';

class PronosticView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };

  }

  componentDidMount(){
    console.log(this.props.user)
    getRencontres().then( response =>{
      console.log(response);
      this.setState({
        listRencontres: response,
        isLoading: false
      });
    });
  }

  render(){
    const joueur = this.props.user;
    const isLoading = this.state.isLoading;
    return (
      <div>
        { isLoading ? <div>chargement....</div> :
        <div>
          <h1>Pronostic Page!</h1>
          <div>
            {this.state.listRencontres.map(rencontre =>{
              return(
                <PronosticFragment rencontre={rencontre} joueur={joueur}/>
              )
            })}
          </div>
        </div>
      }
    </div>
    );
  }

}

export default PronosticView;
