import React, { Component } from "react";
import { getClub, addMatriculeToClub } from '../utils/fetching'

class JoueursManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matricule: "",
      isLoading: false,
      listMatricules: []

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addMatricule = this.addMatricule.bind(this);
  }
  componentDidMount(){
    this.setState({
      listMatricules : this.props.club.listMatricules
    })
  };
  handleInputChange(event){
    this.setState({
      matricule: event.target.value
    })
  }
  addMatricule(){
    this.setState({
      isLoading: true,
      listMatricules: []
    })
    let listMatriculesUpdate = this.props.club.listMatricules;
    listMatriculesUpdate.push(this.state.matricule)
    addMatriculeToClub(7,listMatriculesUpdate).then(response =>{
      console.log(response)
      if(response){
        this.setState({
          isLoading: false,
          listMatricules: listMatriculesUpdate,
        })
      }
      else{
        console.log("erreur")
        this.setState({
          isLoading: false,
        })
      }
    })
  }

  render(){
    const isLoading = this.state.isLoading
    return (
      <div>
      { isLoading ? <div>chargement....</div> :
        <div>
          <h1>gestion des joueurs</h1>
          <div>
            liste des matricules :
            {this.state.listMatricules.map(item =>{
              return(
                <div>{item}</div>
              )
            })}
          </div>
          <div>
            Ajouter un matricule : <input type="text" placeholder="Ex: 141414" className="form-control w-25 h-75" onChange={this.handleInputChange}/>
          <span className="btn btn-success w-10" onClick={this.addMatricule}>Ajouter</span>
          </div>
        </div>
      }
    </div>

    );
  }

}

export default JoueursManagement;
