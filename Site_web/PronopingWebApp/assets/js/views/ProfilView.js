import React, { Component } from "react";
import { getJoueur, updateUsername, updatePassword } from '../utils/fetching'
import {  faCheckCircle  } from "@fortawesome/free-solid-svg-icons";
import Loader from 'react-loader-spinner'


class ProfilView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      currentUsername: this.props.user.username,
      username: '',
      password: '',
      confirmPassword: '',
    };
    this.handleInputUsernameChange = this.handleInputUsernameChange.bind(this)
    this.handleInputPasswordChange = this.handleInputPasswordChange.bind(this)
    this.handleInputConfirmPasswordChange = this.handleInputConfirmPasswordChange.bind(this)
    this.handleUsernameEdit = this.handleUsernameEdit.bind(this)
    this.handlePasswordEdit = this.handlePasswordEdit.bind(this)

  }
  componentDidMount(){
  }
  handleInputUsernameChange(event){
      this.setState({
        username: event.target.value
      })
  }
  handleInputPasswordChange(event){
      this.setState({
        password: event.target.value
      })
  }
  handleInputConfirmPasswordChange(event){
      this.setState({
        confirmPassword: event.target.value
      })
  }
  async handleUsernameEdit(){
    if(this.state.username == ''){
      alert("Veuillez entrer un nom d'utilisateur.")
    }else{
      this.setState({
        isLoading: true
      })
      const response = await updateUsername(this.props.user.id, this.state.username)
      this.setState({
        isLoading: false
      })
      if(response==true){
        this.setState({
          currentUsername: this.state.username
        })
      }else{
        if(response == "usernameError"){
          alert("Nom d'utilisateur plus disponible !")
        }else{
          alert('erreur dans la requete')
         }
      }
    }
  }
  async handlePasswordEdit(){
    if(this.state.password == '' || this.state.confirmPassword == ''){
      alert("Veuillez entrer un mot de passe.")
    }else{
      if(this.state.password.length < 6){
        alert('Votre mot de passe doit comporter au moins 6 caractères.')
      }else{
        if(this.state.password !== this.state.confirmPassword){
          alert('Veuillez entrer deux mots de passe identiques.')
        }else{
          this.setState({
            isLoading: true
          })
          const response = await updatePassword(this.props.user.id, this.state.password)
          this.setState({
            isLoading: false
          })
          if(response==true){
            alert('Votre mot de passe a bien été modifié.')
            this.setState({
              password:'',
              confirmPassword:''
            })
          }else{
            if(response == "usernameError"){
              alert('erreur dans la requete')
             }
          }
        }
      }

    }
  }
  render(){
    const joueur = this.props.user;
    const isLoading = this.state.isLoading;
    return (
        <div className='backgroundContainer'>
          <h1 className='titlePage'>Mon profil</h1>
          <div className='profilContainer'>
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
              <div className='informationContainer'>
                <div className='titleContainer'>
                  <p className='titleText'>Mes informations</p>
                </div>
                <div className='informationsContentContainer'>
                  <div style={{marginBottom:'5px'}}>Nom d'utilisateur : {this.state.currentUsername}</div>
                  <div>Nombre de points : {joueur.nbPoints}</div>
                </div>
              </div>
              <div className='editInfoContainer'>
                <div className='titleContainer'>
                  <p className='titleText'>Éditer</p>
                </div>
                <div>
                  <div className='editUsernameContainer'>
                    <div style={{marginTop:'11px'}}>Nom d'utisateur :</div>
                    <div className='changeUsernameInput'>
                      <input type="text" placeholder={this.state.currentUsername} className="form-control" style={{marginTop:'5px'}} onChange={this.handleInputUsernameChange}/>
                    </div>
                    <div>
                      <span className="btn editBtn" onClick={this.handleUsernameEdit}>Changer</span>
                    </div>
                  </div>
                  <div className='editPasswordContainer'>
                    <div style={{marginTop:'11px'}}>Mot de passe :</div>
                    <div className='changeUsernameInput'>
                      <input type="password" placeholder='nouveau mot de passe' className="form-control" style={{marginTop:'5px'}} onChange={this.handleInputPasswordChange}/>
                    </div>
                    <div className='changeUsernameInput'>
                      <input type="password" placeholder='confirmer le mot de passe' className="form-control" style={{marginTop:'5px'}} onChange={this.handleInputConfirmPasswordChange}/>
                    </div>
                    <div>
                      <span className="btn editBtn" onClick={this.handlePasswordEdit}>Changer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          </div>
          <div className='logoutBtnContainer'>
            <a href='/logout'className="logoutBtn">Se déconnecter</a>
          </div>
        </div>

    );
  }

}

export default ProfilView;
