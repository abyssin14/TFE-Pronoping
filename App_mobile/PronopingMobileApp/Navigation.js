import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, Button, ScrollView, Dimensions, Image, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR } from "./utils/Styling"
import { getJoueur } from './utils/fetching'
import Header from './component/Header'
import ProfileScreen from './screen/ProfileScreen'
import PronosticScreen from './screen/PronosticScreen'
import ResultatsScreen from './screen/ResultatsScreen'
import LoginScreen from './screen/LoginScreen'
import SignupScreen from './screen/SignupScreen'
import ClassementScreen from './screen/ClassementScreen'


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
    isLoading: false
  }
 }
 async componentDidMount(){
   this.setState({
     isLoading: false,
   })
   const isAuth = await AsyncStorage.getItem('isAuth')
   const userId = await AsyncStorage.getItem('userId')
   const user = await getJoueur(userId)
   this.setState({
     isAuth: isAuth,
     user: user,
     isLoading: false,
   })

 }
 async handleLogoutClick(){
   try {
     await AsyncStorage.removeItem('isAuth')
     await AsyncStorage.removeItem('userId')
   } catch(e) {
     // remove error
     console.log('erreur logout')
   }
   console.log('Done.')
   this.updateNavigation()
 }
  async updateNavigation(){
    const response = await this.componentDidMount()
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
    const isLoading = this.state.isLoading;
    return (
      <View style={styles.container}>
        {isLoading?
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={COLOR.orange} />
          </View>
          :
          <NavigationContainer>
            {isAuth ?
              <Drawer.Navigator
                 drawerContent={this.customDrawerContent.bind(this)}
                 initialRouteName="Resultats"
                 >
                <Drawer.Screen name="Profile" component={ProfileScreen} initialParams={{ user: user, logout: this.handleLogoutClick }} />
                <Drawer.Screen name="Pronostic" component={PronosticScreen} initialParams={{ user: user }} />
                <Drawer.Screen name="Resultats" component={ResultatsScreen} initialParams={{ user: user }} />
                <Drawer.Screen name="Classement" component={ClassementScreen} initialParams={{ user: user }} />
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
                    headerShown: true
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
      }
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
  },
  loader:{
    flex:1,
    width: windowWidth,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent:'center'
  },
  header: {
    paddingTop:5,
    backgroundColor: COLOR.orange,
    height: 70,
    justifyContent:'center',
    alignItems: 'center',
  },
  title:{
    fontWeight:'bold',
    color: 'white',
    fontSize :18
  },
});
export default Navigation
