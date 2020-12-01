import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import fr from 'date-fns/locale/fr';
import "react-datepicker/dist/react-datepicker.css";
import { postRencontre, getEquipe, getEquipesInClub } from '../utils/fetching'
import AdminRencontreFragment from './AdminRencontreFragment'

registerLocale('fr', fr)

class RencontresManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listEquipes: [],
      isLoading: false,
      equipeId: null,
      adversaire: "",
      date: null
    };
    this.handleInputAdversaireChange = this.handleInputAdversaireChange.bind(this);
    this.handleInputEquipeChange = this.handleInputEquipeChange.bind(this);
    this.addRencontre = this.addRencontre.bind(this);
    this.setDate = this.setDate.bind(this);

  }
  componentDidMount(){
    this.setState({
      listEquipes : this.props.equipes
    })
    console.log(this.props.equipes.rencontres)
  };
  handleInputAdversaireChange(event){
    this.setState({
      adversaire: event.target.value
    })
  }
  handleInputEquipeChange(event){
    this.setState({
      equipeId: event.target.value
    })
  }
  setDate(date){
    var formatDate = new Date (date.getTime() +4*3600*1000 /*4 hrs in ms*/ )
    this.setState({
      date: formatDate
    })
  }
  async addRencontre(){
    var equipe = await getEquipe(this.state.equipeId)
    this.setState({
      isLoading: true,
      listEquipes: [],
    })
    postRencontre(equipe,this.state.adversaire, this.state.date).then(response =>{
      console.log(response)
      if(response){
        getEquipesInClub(7).then(result => {
          this.setState({
            listEquipes: result,
            isLoading: false
          })
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
          <h1>Pronostics en cours</h1>
          <div>
            liste des équipes :
            {this.state.listEquipes.map(equipe =>{
              return(
                <div>
                  {equipe.rencontres.length > 0 ?
                    <div>
                      { equipe.rencontres.map(rencontre =>{
                        return(
                          <div>
                            {!rencontre.isFinished ?
                                <AdminRencontreFragment rencontre={rencontre} equipe={equipe} />
                              : null}
                          </div>
                        )
                      })}
                    </div>
                     : null
                  }
                </div>
              )
            })}
          </div>
          <div>
            Ajouter une rencontre :
            <select className="form-control w-50 h-75"  value={this.state.equipeId} onChange={this.handleInputEquipeChange}>
            <option value="" disable selected hidden>Choix de l'équipe</option>
            {this.state.listEquipes.map(equipe =>{
              return(
                  <option value={equipe.id}>{equipe.nom}</option>
                )})
              }
            </select>
            <input type="text" placeholder="Nom de l'équipe adverse" className="form-control w-50 h-75" onChange={this.handleInputAdversaireChange}/>
            <DatePicker locale="fr" className="form-control" selected={this.state.date} onChange={date => this.setDate(date)} /> <br></br>
            <span className="btn btn-success w-10" onClick={this.addRencontre}>Ajouter</span>
          </div>
        </div>
      }
    </div>

    );
  }

}

export default RencontresManagement;
