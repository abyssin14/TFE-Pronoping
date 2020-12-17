import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Dimensions, SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Foundation'
import Header from '../component/Header'
import { COLOR } from '../utils/Styling'
import { updateUsername, updatePassword } from '../utils/fetching'

class ProfileScreen extends React.Component {
  constructor(props) {
   super(props)
   this.state = {
    username: '',
    password:'',
    confirmPassword:'',
    secondTextInput: null,
    isLoading: false,
    currentUsername: null
  }
 }
 componentDidMount(){
   this.setState({
     currentUsername : this.props.route.params.user.username
   })
 }
 async handleUsernameEdit(){
   if(this.state.username == ''){
     alert("Veuillez entrer un nom d'utilisateur.")
   }else{
     this.setState({
       isLoading: true
     })
     const response = await updateUsername(this.props.route.params.user.id, this.state.username)
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
         const response = await updatePassword(this.props.route.params.user.id, this.state.password)
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
  handleLogoutClick(){
    this.props.route.params.logout()
 }
 render(){
   console.log(this.props)
   const isLoading = this.state.isLoading;
   const user = this.props.route.params.user
   const username = this.state.currentUsername
   return(
       <View style={styles.profileContainer}>
         <SafeAreaView style={{ flex: 0, backgroundColor: COLOR.grey }} />
         <Header navigation={this.props.navigation}/>
         {isLoading?
           <View style={styles.loader}>
             <ActivityIndicator size="large" color={COLOR.orange} />
           </View>
           :
           <TouchableWithoutFeedback accessible={false} onPress={() => Keyboard.dismiss()}>
           <KeyboardAwareScrollView
             extraHeight={100}
             contentContainerStyle={{  alignItems: 'center'}}
           >
             <Text>Mon Profil</Text>
             <View style={styles.infoContainer}>
              <Text style={styles.titleInfo}>Mes informations</Text>
              <Text style={styles.textInfo}>Nom d'utilisateur : {username}</Text>
              <Text style={styles.textInfo}>Nombre de points : {user.nbPoints}</Text>
             </View>
             <View style={styles.editContainer}>
                <Text style={styles.titleInfo}>Editer</Text>
                <Text style={styles.textInfo}>Changer de nom d'utilisateur : </Text>
                <View style={{flexDirection:'row'}}>
                   <TextInput
                     style={styles.input}
                     value={this.state.username}
                     onChangeText={(username) => this.setState({username})}
                     placeholder="Nom d'utilisateur"
                     placeholderTextColor='grey'
                     returnKeyType = {"done"}
                     onSubmitEditing={() => { this.handleUsernameEdit() }}
                     blurOnSubmit={false}
                     autoCompleteType="username"
                   />
                   <TouchableOpacity
                     style={styles.submit}
                     onPress={() => { this.handleUsernameEdit() }}
                     >
                     <Icon name="check"  size={15} color= {COLOR.orange} style={styles.checkIcon}/>
                   </TouchableOpacity>
                  </View>
                  <Text style={styles.textInfo}>Changer de mot de passe : </Text>
                  <TextInput
                    style={styles.input}
                    value={this.state.password}
                    onChangeText={(password) => this.setState({password})}
                    placeholder='Mot de passe'
                    placeholderTextColor='grey'
                    returnKeyType = {"next"}
                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    secureTextEntry={true}
                    autoCompleteType="password"
                  />
                  <View style={{flexDirection:'row'}}>
                  <TextInput
                  ref={(input) => { this.secondTextInput = input; }}
                    style={styles.input}
                    value={this.state.confirmPassword}
                    onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                    placeholder='Confirmer le mot de passe'
                    placeholderTextColor='grey'
                    returnKeyType = {"done"}
                    onSubmitEditing={() => { this.handlePasswordEdit() }}
                    secureTextEntry={true}
                    autoCompleteType="password"

                  />
                     <TouchableOpacity
                       style={styles.submit}
                       onPress={() => { this.handlePasswordEdit() }}
                       >
                       <Icon name="check"  size={15} color= {COLOR.orange} style={styles.checkIcon}/>
                     </TouchableOpacity>
                    </View>
                </View>

              </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
         }
         <TouchableOpacity
          style={styles.loginButton}
          onPress={()=>this.handleLogoutClick()}
         >
            <Text style={styles.loginButtonText}>Se déconnecter</Text>
         </TouchableOpacity>
     </View>
   )
  }
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  loader:{
    flex:1,
    width: windowWidth,
    backgroundColor: 'grey',
    alignItems: 'center',
    marginTop:'15%'
  },
  profileContainer:{
    flex: 1,
    backgroundColor: 'grey',
    height: windowHeight
  },
  infoContainer:{
    backgroundColor: COLOR.lightGrey,
    width: windowWidth-50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLOR.orange,
    padding:5
  },
  titleInfo:{
    color:'white',
    fontWeight:'bold',
    alignSelf:'center',
    marginBottom:10
  },
  textInfo:{
    color:'white',
    padding:5
  },
  editContainer:{
    marginTop:10,
    backgroundColor: COLOR.lightGrey,
    width: windowWidth-50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLOR.orange,
    padding:5
  },
  input:{
    width: "80%",
    height:30,
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 5,
    borderRadius: 10
  },
  submit:{
    width: 30,
    height:30,
    backgroundColor:'white',
    borderRadius: 20,
    marginLeft: 5
  },
  checkIcon:{
    position: 'absolute',
    right: 8,
    top:7,
  },
  loginButton:{
    position: 'absolute',
    bottom: 40,
    width: windowWidth/2,
    height:30,
    backgroundColor: 'red',
    borderRadius: 50,
    alignSelf: 'center',
  },
  loginButtonText:{
    color:'white',
    fontSize:16,
    fontWeight:'bold',
    alignSelf:'center',
    marginTop:5
  },
});

export default ProfileScreen
