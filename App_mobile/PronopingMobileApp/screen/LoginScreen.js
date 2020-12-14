import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard, ActivityIndicator, Dimensions, ScrollView, SafeAreaView  } from 'react-native';
import { connection } from '../utils/fetching'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR } from '../utils/Styling'

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
    this.setIsAuth(true).then(()=>{
      this.props.route.params.updateNavigation().then(()=>{
        this.setState({
          isLoading: false
        })
      })
    })
  }else{
    alert("Nom d'utilisateur ou mot de passe incorrect !")
    this.setState({
      isLoading: false
    })
  }

}
 async setIsAuth(value){
   try {
     const jsonValueIsAuth = JSON.stringify(value)
     await AsyncStorage.setItem('isAuth', jsonValueIsAuth)
     await AsyncStorage.setItem('username', this.state.username)

   } catch(e) {
     console.log('Error.')
   }

   console.log('Done.')
 }

    render() {
      const isLoading = this.state.isLoading;
      return(
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {isLoading?
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={COLOR.orange} />
        </View>
        :
        <TouchableWithoutFeedback accessible={false} onPress={() => Keyboard.dismiss()}>
        <View
          style={styles.container}
        >
            <View style={styles.header}>
              <Text style={styles.headerText}>Bienvenue sur Pronoping</Text>
            </View>
            <Text style={styles.titleText}>Entrez vos identifiants</Text>
              <TextInput
                style={styles.input}
                value={this.state.username}
                onChangeText={(username) => this.setState({username})}
                placeholder="Votre nom d'utilisateur"
                placeholderTextColor='grey'
                returnKeyType = {"next"}
                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                blurOnSubmit={false}
                autoCompleteType="username"
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
                secureTextEntry={true}
                autoCompleteType="password"

              />
              <TouchableOpacity
                onPress={this.handleConnectionClick}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>Se connecter</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('Signup')}
              >
                <View style={styles.singupButton}>
                  <Text style={styles.signupButtonText}>S'inscrire</Text>
                </View>
              </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
      }

      </SafeAreaView>
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
    alignItems: 'center',
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
    color: COLOR.orange
  },
  titleText:{
    color:"white",
    fontSize:16,
    marginBottom:15,
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
    marginTop:40,
    width: windowWidth/2,
    height:30,
    backgroundColor: COLOR.orange,
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
    color: COLOR.orange,
    fontSize:16,
    fontWeight:'bold'
  }
});
export default LoginScreen
