import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class Header extends React.Component {
  constructor(props) {
   super(props)

 }
    render() {
      console.log(this.props)
      return(
        <View style={styles.header}>
          <Text>Pronoping App</Text>
          <TouchableOpacity style={styles.menuOpen} onPress={() => {this.props.navigation.toggleDrawer()}}>
            <Text>......</Text>
            <Text>......</Text>
          </TouchableOpacity>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232531'
  },
  header: {
    backgroundColor: 'grey',
    height: '35%',
    justifyContent:'center',
    alignItems: 'center',
  },
  menuOpen: {
  backgroundColor: '#232531',
  position: 'absolute',
  right: 20
  },
});
export default Header
