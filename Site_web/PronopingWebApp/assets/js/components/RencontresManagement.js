import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import fr from 'date-fns/locale/fr';
import "react-datepicker/dist/react-datepicker.css";
import { postRencontre, getEquipe, getEquipesInClub } from '../utils/fetching'
import AdminRencontreFragment from './AdminRencontreFragment'
import Loader from 'react-loader-spinner'


registerLocale('fr', fr)

class RencontresManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listEquipes: [],
      isLoading: true,
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
      isLoading: true
    })
    getEquipesInClub(1).then(result => {
      this.setState({
        listEquipes : result,
        isLoading: false
      })
    })

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
    this.setState({
      isLoading: true,
      listEquipes: [],
    })
    var equipe = await getEquipe(this.state.equipeId)
    postRencontre(equipe,this.state.adversaire, this.state.date).then(response =>{
      if(response){
        this.componentDidMount()
      }

    })
  }
  reload(){
    this.setState({
      isLoading: true
    })
    this.props.reload();
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
                    <div>
                      {equipe.rencontres.length > 0 ?
                        <div>
                          { equipe.rencontres.map(rencontre =>{
                            return(
                              <div>
                                {!rencontre.isFinished ?
                                    <AdminRencontreFragment rencontre={rencontre} equipe={equipe} reload={this.reload.bind(this)} loading={()=>this.setState({isLoading:true})} />
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
              <div className='addRencontreContainer'>
                <div>
                  <p style={{textAlign:'center'}}>Ajouter une rencontre :</p>
                  <select className="form-control addRencontreInput"  value={this.state.equipeId} onChange={this.handleInputEquipeChange}>
                  <option value="" disable selected hidden>Choix de l'équipe</option>
                  {this.state.listEquipes.map(equipe =>{
                    return(
                        <option value={equipe.id}>{equipe.nom}</option>
                      )})
                    }
                  </select>
                  <input type="text" placeholder="Nom de l'équipe adverse" className="form-control addRencontreInput" onChange={this.handleInputAdversaireChange}/>
                  <DatePicker placeholderText="Date du match" locale="fr" className="form-control addRencontreInput" value={this.state.date ? this.state.date.toLocaleDateString() : null} selected={this.state.date} onChange={date => this.setDate(date)} /> <br></br>
                  <span className="btn w-100" onClick={this.addRencontre}>Ajouter</span>
                </div>
              </div>
            </div>
          }

        </div>
    );
  }

}

export default RencontresManagement;
