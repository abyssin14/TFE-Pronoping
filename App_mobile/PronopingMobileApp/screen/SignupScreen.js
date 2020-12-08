import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard, ActivityIndicator, Dimensions  } from 'react-native';
import { signup } from '../utils/fetching'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from '../Navigation'

class SignupScreen extends React.Component {
  constructor(props) {
   super(props)
   this.state = {
    username: null,
    password: null,
    confirmPassword: null,
    matricule: null,
    isLoading: false,
    secondTextInput: null,
    fourthTextInput: null,
    thirdTextInput: null,
  }
 }
handleSignupClick = async ()=>{
  this.setState({
    isLoading: true
  })
    const response = await signup(this.state.username, this.state.password, this.state.matricule);
    this.setState({
      isLoading: false
    })
    if(response==true){
      this.props.navigation.goBack()
      console.log("Compte créé !")
    }else{
      if(response == "matriculeError"){
        alert('Matricule introuvable !')
      }else{
        if(response == "usernameError"){
          alert("Nom d'utilisateur plus disponible !")
        }else{
          alert('erreur dans la requete')
        }
      }
    }
}

    render() {
      const isLoading = this.state.isLoading;
      return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {isLoading?
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="red" />
        </View>
        :
        <TouchableWithoutFeedback accessible={false} onPress={() => Keyboard.dismiss()}>
        <View
          style={styles.container}
        >
        <View style={styles.header}>
          <Text style={styles.headerText}>Inscription</Text>
        </View>
          <TextInput
            style={styles.input}
            value={this.state.username}
            onChangeText={(username) => this.setState({username})}
            placeholder="Nom d'utilisateur"
            placeholderTextColor='grey'
            returnKeyType = {"next"}
            onSubmitEditing={() => { this.secondTextInput.focus(); }}
            blurOnSubmit={false}
          />
          <TextInput
            ref={(input) => { this.secondTextInput = input; }}
            style={styles.input}
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
            placeholder='Mot de passe'
            placeholderTextColor='grey'
            returnKeyType = {"next"}
            onSubmitEditing={() => { this.thirdTextInput.focus(); }}
          />
          <TextInput
            ref={(input) => { this.thirdTextInput = input; }}
            style={styles.input}
            value={this.state.confirmPassword}
            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            placeholder='Confirmer le mot de passe'
            placeholderTextColor='grey'
            returnKeyType = {"next"}
            onSubmitEditing={() => { this.fourthTextInput.focus(); }}
          />
          <TextInput
            ref={(input) => { this.fourthTextInput = input; }}
            style={styles.input}
            value={this.state.matricule}
            onChangeText={(matricule) => this.setState({matricule})}
            placeholder='Matricule'
            placeholderTextColor='grey'
            returnKeyType = {"go"}
            onSubmitEditing={this.handleSignupClick}
          />
          <TouchableOpacity
            onPress={this.handleSignupClick}
          >
            <View style={styles.loginButton}>
              <Text style={styles.loginButtonText}>S'inscrire</Text>
            </View>
          </TouchableOpacity>

        </View>
        </TouchableWithoutFeedback>
      }

      </View>
    )
  }
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex:1,
    width: windowWidth,
    backgroundColor: 'grey',
    alignItems: 'center'
  },
  loader:{
    flex:1,
    width: windowWidth,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent:'center'
  },
  header:{
    marginTop:30,
    marginBottom: 30,
    justifyContent:'center'
  },
  headerText:{
    fontWeight:'bold',
    fontSize: 20,
    color: 'red'
  },
  titleText:{
    color:"white",
    fontSize:16,
    marginBottom:10,
  },
  input:{
    width: windowWidth/1.3,
    height:40,
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 10
  },
  loginButton:{
    marginTop:20,
    width: windowWidth/2,
    height:30,
    backgroundColor: 'red',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText:{
    color:'white',
    fontSize:16,
    fontWeight:'bold'
  },
  singupButton:{
    marginTop:20,
    width: windowWidth/2,
    height:30,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupButtonText:{
    color:'red',
    fontSize:16,
    fontWeight:'bold'
  }
});
export default SignupScreen
