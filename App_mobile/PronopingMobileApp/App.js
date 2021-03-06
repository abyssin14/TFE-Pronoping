import React from 'react';
import { StatusBar } from 'react-native'

import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { connection } from './utils/fetching'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Navigation from './Navigation'
import LoginScreen from './screen/LoginScreen'


export default class App extends React.Component {
  constructor(props) {
   super(props)
   this.state = {
    isLoading: true
  }
 }
  async componentDidMount(){

  }


  render(){
    return (
        <Navigation />
    );
  }
}

const styles = StyleSheet.create({
});
