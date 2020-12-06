import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connection } from '../utils/fetching'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from '../Navigation'

class LoginScreen extends React.Component {
  constructor(props) {
   super(props)
   this.state = {
    username: null,
    password: null
  }
 }
 async componentDidMount(){
 }
handleConnectionClick = async ()=>{
  var isAuth = await connection(this.state.username, this.state.password)
  if(isAuth){
    this.setIsAuth(true)
    this.props.route.params.updateNavigation()
  }else{
    alert("Nom d'utilisateur ou mot de passe incorrect !")
  }
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
      return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Connectez-vous</Text>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({username})}
          placeholder="Votre nom d'utilisateur"
          placeholderTextColor='#7c7e84'
          returnKeyType = {"next"}
          blurOnSubmit={false}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
          placeholder='Votre mot de passe'
          placeholderTextColor='#7c7e84'
          returnKeyType = {"next"}
          blurOnSubmit={false}
        />
        <TouchableOpacity
          onPress={this.handleConnectionClick}
        >
          <View>
            <Text> Se connecter </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default LoginScreen
