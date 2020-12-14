import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation'
import { COLOR } from '../utils/Styling'

class Header extends React.Component {
  constructor(props) {
   super(props)

 }
    render() {
      return(
        <View>
          <View style={styles.header}>
          <Image source={require('../assets/PronopingLogo.png')} style={{ width: 80, height: 50, position:'absolute', top:15, left:0 }}/>
            <View style={{flexDirection:'row', marginBottom:10}}>
              <Text style={[styles.navigationTitleGrey,{marginLeft: 10}]}>P</Text><Text style={styles.navigationTitle}>rono</Text><Text style={styles.navigationTitleGrey}>P</Text><Text style={styles.navigationTitle}>ing</Text>
            </View>
            <TouchableOpacity style={styles.menuOpen} onPress={() => {this.props.navigation.toggleDrawer()}}>
              <Icon name="thumbnails"  size={40} color={COLOR.orange} />
            </TouchableOpacity>
          </View>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  header: {
    paddingTop:5,
    backgroundColor: COLOR.grey,
    height: 70,
    justifyContent:'center',
    alignItems: 'center',
  },
  navigationTitle:{
    marginTop:13,
    fontWeight:'bold',
    fontSize: 20,
    color: 'white'
  },
  navigationTitleGrey:{
    marginTop:8,
    fontWeight:'bold',
    fontSize: 25,
    color: COLOR.orange
  },
  menuOpen: {
    backgroundColor: COLOR.grey,
    position: 'absolute',
    right: 25,
    top:18
  },
});
export default Header
