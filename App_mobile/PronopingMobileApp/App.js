import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
    isAuth: null,
    isLoading: true
  }
 }
  async componentDidMount(){

  }


  render(){
    return (
        <Navigation isAuth={this.state.isAuth} />
    );
  }
}

const styles = StyleSheet.create({
});
