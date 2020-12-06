import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../component/Header'

class HomeScreen extends React.Component {
  constructor(props) {
   super(props)
   this.state = {
    data: null
  }
 }
 handleLogoutClick = async ()=>{
   try {
     await AsyncStorage.removeItem('isAuth')
   } catch(e) {
     // remove error
   }
   console.log('Done.')
   this.props.route.params.updateNavigation()

 }
    render() {
      return(
        <View>
        <Header navigation= {this.props.navigation}/>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Bienvenue sur Pronoping</Text>
          <TouchableOpacity
            onPress={this.handleLogoutClick}
          >
            <View>
              <Text> Se déconnecter </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default HomeScreen
