import React, { Component } from "react";
import { getClub, postEquipe } from '../utils/fetching'

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
  }
  componentDidMount(){
    console.log(this.props.club)
    this.setState({
      listEquipes : this.props.club.equipes
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
    let listEquipesUpdate = this.props.club.equipes
    listEquipesUpdate.push({
          "nom": this.state.equipe,
          "division": parseInt(this.state.division),
    })
    postEquipe(this.state.equipe,parseInt(this.state.division),1).then(response =>{
      console.log(response)
      if(response){
        this.setState({
          listEquipes: listEquipesUpdate,
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
              <div>
                <h1>gestion des équipes</h1>

                liste des équipes :
                {this.state.listEquipes.map(item =>{
                  return(
                    <div>{item.nom}  {item.division}</div>
                  )
                })}
              </div>

            <div>
              Ajouter une équipe :
            <input type="text" placeholder="Nom de l'équipe" className="form-control w-50 h-75" onChange={this.handleInputEquipeChange}/>
            <input type="number" placeholder="Division de l'équipe" className="form-control w-50 h-75" onChange={this.handleInputDivisionChange}/>
            <span className="btn btn-success w-10" onClick={this.addEquipe}>Ajouter</span>
            </div>
          </div>
        }
      </div>
    );
  }

  }

export default EquipesManagement;
