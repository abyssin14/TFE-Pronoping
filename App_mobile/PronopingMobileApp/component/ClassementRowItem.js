import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { COLOR } from '../utils/Styling'

class ClassementRowItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isYou: false
    };
  }
  componentDidMount(){
    if(this.props.joueur.id == this.props.user.id){
      this.setState({
        isYou: true
      })
    }
  }
  render(){
    const joueur = this.props.joueur
    const index = this.props.index
    const user = this.props.user
    return(
      <View style={styles.row}>
        <View style={styles.headerSmallCell}>
          <Text style={ this.state.isYou ? styles.headerTextCellYou : styles.headerTextCell}>{index+1}</Text>
        </View>
        <View style={styles.headerLargeCell}>
          <Text style={this.state.isYou ? styles.headerTextCellYou : styles.headerTextCell}>{joueur.username}</Text>
        </View>
        <View style={styles.headerSmallCell}>
          <Text style={this.state.isYou ? styles.headerTextCellYou : styles.headerTextCell}>{joueur.nbPoints}</Text>
        </View>
      </View>
    )
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  headerSmallCell:{
    width: '20%',
    alignItems:'center',
  },
  headerLargeCell:{
    width: '60%',
    alignItems:'center',
  },
  headerTextCell:{
    color: 'white',
    fontSize: 16,
  },
  headerTextCellYou:{
    color: COLOR.orange,
    fontSize: 16,
  },
  row:{
    flexDirection: 'row',
    marginTop:2
  }
});

export default ClassementRowItem
