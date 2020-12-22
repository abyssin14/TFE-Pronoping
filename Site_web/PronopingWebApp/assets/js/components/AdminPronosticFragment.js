import React, { Component } from "react";
import { getPronostics } from '../utils/fetching'

class AdminPronosticFragment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };

  }
  componentDidMount(){

  }

  render(){
    const pronostic = this.props.pronostic
    console.log(pronostic)
    return (
      <div>{pronostic.joueur.username}</div>
    );
  }

}

export default AdminPronosticFragment;
