import React, { Component } from "react";
import { getEquipesInClub, postEquipe, deleteEquipe } from '../utils/fetching'
import Loader from 'react-loader-spinner'

class EquipesManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      listEquipes: [],
      equipe: "",
      division: Number,
    };
    this.handleInputEquipeChange = this.handleInputEquipeChange.bind(this);
    this.handleInputDivisionChange = this.handleInputDivisionChange.bind(this);
    this.addEquipe = this.addEquipe.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);

  }
  componentDidMount(){
    this.setState({
      isLoading: true,
    })
    getEquipesInClub(this.props.club.id).then(response=>{
      response.sort(function(a,b){
        return a.division - b.division
      })
        this.setState({
          listEquipes : response,
          isLoading: false
        })
    })

  };
  handleInputEquipeChange(event){
    this.setState({
      equipe: event.target.value
    })
  }
  handleInputDivisionChange(event){
    this.setState({
      division: event.target.value
    })
  }
  addEquipe(){
    this.setState({
      isLoading: true,
      listEquipes: [],
    })
    postEquipe(this.state.equipe,parseInt(this.state.division),1).then(response =>{
      if(response){
        this.componentDidMount()
      }

    })
  }
  handleDeleteClick(equipe){
    var confirmation = confirm("Attention en supprimant cette équipe, toutes les rencontres liées à celle-ci seront également supprimées.")
    if(confirmation){
      this.setState({
        isLoading: true
      })
      deleteEquipe(equipe).then(response =>{
        if(response){
          this.componentDidMount()
        }
      })
    }
  }
  render(){
    const isLoading = this.state.isLoading
      return (
        <div className="RencontresManagementContainer">
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
              <div>
                {this.state.listEquipes.map(equipe =>{
                  return(
                    <div className="equipeFragment">
                      <div className="equipeFragmentText">{equipe.nom}</div>
                      <div className="equipeFragmentText">Divsion {equipe.division}</div>
                      <div className="deleteEquipe"><span className="boutonDelete" onClick={this.handleDeleteClick.bind(this, equipe)}>&#x274C;</span></div>
                    </div>
                  )
                })}
              </div>

            <div>


            </div>
            <div className="addEquipeContainer">
                <p style={{textAlign:'center'}}>Ajouter une équipe :</p>
                  <input type="text" placeholder="Nom de l'équipe" className="form-control addRencontreInput" onChange={this.handleInputEquipeChange}/>
                  <input type="number" placeholder="Division de l'équipe" className="form-control addRencontreInput" onChange={this.handleInputDivisionChange}/>
                <span className="btn w-100" onClick={this.addEquipe}>Ajouter</span>
            </div>
          </div>
        }
      </div>
    );
  }

  }

export default EquipesManagement;
