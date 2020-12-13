import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, Button, ScrollView, Dimensions, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR } from "./utils/Styling"
import { getJoueurByUsername } from './utils/fetching'

import HomeScreen from './screen/HomeScreen'
import PronosticScreen from './screen/PronosticScreen'
import ResultatsScreen from './screen/ResultatsScreen'
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
          <View>
            <SafeAreaView style={styles.navigationContainer}>
              <View style={{flexDirection:'row', marginBottom:10}}>
                <Image source={require('./assets/PronopingLogo.png')} style={{ width: 80, height: 50 }}/>
                <Text style={[styles.navigationTitleOrange,{marginLeft: 10}]}>P</Text><Text style={styles.navigationTitle}>rono</Text><Text style={styles.navigationTitleOrange}>P</Text><Text style={styles.navigationTitle}>ing</Text>
              </View>
              <DrawerItemList {...props}
                inactiveTintColor= 'white'
                activeTintColor='white'
                activeBackgroundColor={COLOR.orange}
              />
              <DrawerItem
                label="Se déconnecter"
                onPress={this.handleLogoutClick}
                inactiveTintColor='red'
              />
            </SafeAreaView>
          </View>
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
                <Drawer.Screen name="Pronostic" component={PronosticScreen} initialParams={{ user: user }} />
                <Drawer.Screen name="Resultats" component={ResultatsScreen} initialParams={{ user: user }} />
              </Drawer.Navigator>
              :
              <Stack.Navigator
                screenOptions={{
                  headerStyle: {
                    backgroundColor: COLOR.orange,
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigationContainer:{
    backgroundColor: COLOR.grey,
    height: windowHeight
  },
  navigationTitle:{
    marginTop:13,
    fontWeight:'bold',
    fontSize: 20,
    color: 'white'
  },
  navigationTitleOrange:{
    marginTop:8,
    fontWeight:'bold',
    fontSize: 25,
    color: COLOR.orange
  }
});
export default Navigation
