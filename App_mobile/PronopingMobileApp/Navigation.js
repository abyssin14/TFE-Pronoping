import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';


import HomeScreen from './screen/HomeScreen'
import PronosticScreen from './screen/PronosticScreen'
import LoginScreen from './screen/LoginScreen'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();



class Navigation extends React.Component {
  constructor(props) {
   super(props)
   this.updateNavigation = this.updateNavigation.bind(this);

   this.state = {
    isAuth: null,
    isLoading: true
  }
 }
 async componentDidMount(){
   const isAuth = await AsyncStorage.getItem('isAuth')
   this.setState({
     isAuth: isAuth,
     isLoading: false,
   })
   console.log(isAuth)
 }
 async updateNavigation(){
   this.setState({
     isAuth: !this.state.isAuth
   })
 }
  render(){
    const isAuth = this.state.isAuth
    return (
      <View style={styles.container}>
          <NavigationContainer>
            {isAuth ?
              <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeScreen} initialParams={{ updateNavigation: this.updateNavigation }} />
                <Drawer.Screen name="Pronostic" component={PronosticScreen} />
              </Drawer.Navigator>
              :
              <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} initialParams={{ updateNavigation: this.updateNavigation }} />
              </Stack.Navigator>
            }
        </NavigationContainer>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232531'
  },
  header: {
    backgroundColor: 'grey',
    height: '10%',
    justifyContent:'center',
    alignItems: 'center',
  },
  menuOpen: {
  backgroundColor: '#232531',
  position: 'absolute',
  right: 20
  },
});
export default Navigation
