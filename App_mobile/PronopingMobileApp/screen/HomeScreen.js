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

    render() {
      return(
        <View>
        <Header navigation= {this.props.navigation}/>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Bienvenue sur Pronoping</Text>
        </View>
      </View>
    )
  }
}

export default HomeScreen
