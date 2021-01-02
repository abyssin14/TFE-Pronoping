import React, { Component } from "react";
import { getClub, updateMatriculeListToClub, deleteJoueur, getJoueurs, updateJoueur } from '../utils/fetching'
import Loader from 'react-loader-spinner'

class JoueursManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matricule: "",
      isLoading: false,
      listMatricules: this.props.club.listMatricules,
      pronostiqueurs: [],
      tabEditing:[],

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addMatricule = this.addMatricule.bind(this);
  }
  componentDidMount(){
    this.setState({
      isLoading: true
    })
    getJoueurs().then(response=>{
      this.setState({
        pronostiqueurs: response,
        isLoading: false
      })
      var tabEditingUpdate = []
      for(let i=0; i<this.state.pronostiqueurs.length; i++){
        tabEditingUpdate.push(false)
      }
      this.setState({
        tabEditing: tabEditingUpdate
      })
    })

  };
  handleInputChange(event){
    this.setState({
      matricule: event.target.value
    })
  }
  async handleKeyPress(event, joueur, index){
  if(event.key === 'Enter'){
    if(event.target.value != '' && event.target.value != joueur.nbPoints){
      this.setState({
        isLoading: true
      })
      var response = await updateJoueur(joueur.id, parseInt(event.target.value))
      if(response){
        this.componentDidMount()
      }
    }else{
      var tab = this.state.tabEditing
      tab[index] = false
      this.setState({
        tabEditing: tab
      })
    }
  }
}
  addMatricule(){
    this.setState({
      isLoading: true,
    })
    let listMatriculesUpdate = this.state.listMatricules;
    listMatriculesUpdate.push(this.state.matricule)
    updateMatriculeListToClub(1,listMatriculesUpdate).then(response =>{
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
  handleDeleteMatriculeClick(index){
    this.setState({
      isLoading: true
    })
    var listMatriculesUpdate = []
    for(let i=0; i < this.state.listMatricules.length; i++){
      if(i !== index){
        listMatriculesUpdate.push(this.state.listMatricules[i])
      }
    }
    updateMatriculeListToClub(1,listMatriculesUpdate).then(response =>{
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
  handleDeleteJoueurClick(joueur){
    var confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce compte ?")
    if(confirmation){
      this.setState({
        isLoading: true
      })
      deleteJoueur(joueur).then(response =>{
        if(response){
          this.componentDidMount()
        }
      })
    }
  }
  handleEditClick(index){
    var tabEditingUpdate = this.state.tabEditing
    tabEditingUpdate[index] = !tabEditingUpdate[index]
    this.setState({
      tabEditing: tabEditingUpdate
    })
  }

  render(){
    const isLoading = this.state.isLoading
    const tabEditing = this.state.tabEditing

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
        <div style={{display:'flex', flexDirection:'row'}}>
          <div className='matriculeContainer'>
            <div>
              Liste des matricules :
              {this.state.listMatricules.map((item,index) =>{
                return(
                  <div className="matriculeFragment">
                    {item}
                    <div className="deleteMatricule" ><span className="boutonDeleteSmall" onClick={this.handleDeleteMatriculeClick.bind(this, index)}>&#x274C;</span></div>
                  </div>
                )
              })}
            </div>
            <div>
              Ajouter un matricule : <input type="text" placeholder="Ex: 141414" className="form-control addMatriculeInput" onChange={this.handleInputChange}/>
            <span className="btn w-50" onClick={this.addMatricule}>Ajouter</span>
            </div>
          </div>

          <div className='joueursContainer'>
            Liste des pronostiqueurs :
            {this.state.pronostiqueurs.map((pronostiqueur,index) =>{
              return(
                <div className="pronostiqueurFragment">
                  <div className="pronostiqueurFragmentText">{pronostiqueur.username}</div>
                  {tabEditing[index] ?
                    <div className="pronostiqueurFragmentText" style={{position:'relative', display:'inline-flex', alignSelf:'center'}}>
                      Points : <input type="number" placeholder={pronostiqueur.nbPoints} className="editPointInput" onKeyPress={()=>this.handleKeyPress(event,pronostiqueur, index)}/>
                      <span onClick={this.handleEditClick.bind(this,index)} className="editButton">&#x270D;</span>
                    </div>
                    :
                  <div className="pronostiqueurFragmentText" style={{position:'relative'}}>
                    Points : {pronostiqueur.nbPoints}
                    <span onClick={this.handleEditClick.bind(this,index)} className="editButton">&#x270D;</span>
                  </div>
                  }
                  <div className="deleteEquipe"><span className="boutonDelete" onClick={this.handleDeleteJoueurClick.bind(this, pronostiqueur)}>&#x274C;</span></div>
                </div>
              )
            })}
          </div>
        </div>

      }
    </div>

    );
  }

}

export default JoueursManagement;
