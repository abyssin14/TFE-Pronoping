import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getJoueurByUsername } from './utils/fetching'

import HomeScreen from './screen/HomeScreen'
import PronosticScreen from './screen/PronosticScreen'
import LoginScreen from './screen/LoginScreen'
import SignupScreen from './screen/SignupScreen'


import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();



class Navigation extends React.Component {
  constructor(props) {
   super(props)
   this.updateNavigation = this.updateNavigation.bind(this);
   this.customDrawerContent = this.customDrawerContent.bind(this);
   this.handleLogoutClick = this.handleLogoutClick.bind(this);
   this.state = {
    isAuth: null,
    user: null,
    isLoading: true
  }
 }
 async componentDidMount(){
   const isAuth = await AsyncStorage.getItem('isAuth')
   const username = await AsyncStorage.getItem('username')
   const user = await getJoueurByUsername(username)
   this.setState({
     isAuth: isAuth,
     user: user,
     isLoading: false,
   })

 }
 async handleLogoutClick(){
   try {
     await AsyncStorage.removeItem('isAuth')
     await AsyncStorage.removeItem('username')
   } catch(e) {
     // remove error
     console.log('erreur logout')
   }
   console.log('Done.')
   this.updateNavigation()
 }
  async updateNavigation(){
    this.setState({
      isAuth:true
    })
    this.componentDidMount()
   }
  customDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props} style={{
          backgroundColor:'black'
        }}>
        <DrawerItemList {...props}
          inactiveTintColor='white'
          activeTintColor='black'
          activeBackgroundColor='green'

          />
          <DrawerItem
            label="Se déconnecter"
            onPress={this.handleLogoutClick}
            inactiveTintColor='red'
          />
      </DrawerContentScrollView>
    );
  }
  render(){
    const isAuth = this.state.isAuth
    const user = this.state.user
    return (
      <View style={styles.container}>
          <NavigationContainer>
            {isAuth ?
              <Drawer.Navigator
                 drawerContent={this.customDrawerContent.bind(this)}
                 >
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Pronostic" component={PronosticScreen} initialParams={{ user: user }}/>
              </Drawer.Navigator>
              :
              <Stack.Navigator
                screenOptions={{
                  headerStyle: {
                    backgroundColor: 'red',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}

              >
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  initialParams={{ updateNavigation: this.updateNavigation.bind(this) }}
                  options={{ title: 'Pronoping' }}
                  />
                  <Stack.Screen
                    name="Signup"
                    component={SignupScreen}
                    options={{ title: "Pronoping",headerBackTitle:'Retour' }}
                    />
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
});
export default Navigation
