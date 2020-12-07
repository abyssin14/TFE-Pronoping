import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard, ActivityIndicator, Dimensions  } from 'react-native';
import { connection } from '../utils/fetching'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from '../Navigation'

class LoginScreen extends React.Component {
  constructor(props) {
   super(props)
   this.state = {
    username: null,
    password: null,
    isLoading: false,
    secondTextInput: null
  }
 }
handleConnectionClick = async ()=>{
  this.setState({
    isLoading: true
  })
  var isAuth = await connection(this.state.username, this.state.password)
  if(isAuth){
    this.setIsAuth(true)
    this.props.route.params.updateNavigation()
  }else{
    alert("Nom d'utilisateur ou mot de passe incorrect !")
  }
  this.setState({
    isLoading: false
  })
}
 async setIsAuth(value){
   console.log('test')
   try {
     const jsonValue = JSON.stringify(value)
     await AsyncStorage.setItem('isAuth', jsonValue)
   } catch(e) {
     console.log('Error.')
   }

   console.log('Done.')
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
          <Text style={styles.headerText}>Bienvenue sur Pronoping</Text>
        </View>
          <TextInput
            style={styles.input}
            value={this.state.username}
            onChangeText={(username) => this.setState({username})}
            placeholder="Votre nom d'utilisateur"
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
            placeholder='Votre mot de passe'
            placeholderTextColor='grey'
            returnKeyType = {"go"}
            onSubmitEditing={this.handleConnectionClick}
          />
          <TouchableOpacity
            onPress={this.handleConnectionClick}
          >
            <View style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Se connecter</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
          >
            <View style={styles.singupButton}>
              <Text style={styles.signupButtonText}>S'inscrire</Text>
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
    marginTop:80,
    marginBottom: 30,
    justifyContent:'center'
  },
  headerText:{
    fontWeight:'bold',
    fontSize: 20,
    color: 'red'
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
export default LoginScreen
