import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation'

class Header extends React.Component {
  constructor(props) {
   super(props)

 }
    render() {
      return(
        <View style={{flex:1}}>
          <View style={styles.header}>
            <Text style={styles.title}>Pronoping</Text>
            <TouchableOpacity style={styles.menuOpen} onPress={() => {this.props.navigation.toggleDrawer()}}>
              <Icon name="thumbnails"  size={35} color='#fff' />
            </TouchableOpacity>
          </View>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  header: {
    paddingTop:5,
    backgroundColor: 'green',
    height: 70,
    justifyContent:'center',
    alignItems: 'center',
  },
  title:{
    fontWeight:'bold',
    color: 'white',
    fontSize :18
  },
  menuOpen: {
    backgroundColor: 'green',
    position: 'absolute',
    right: 25,
    top:25
  },
});
export default Header
