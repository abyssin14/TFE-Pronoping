import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../component/Header'

class PronosticScreen extends React.Component {
    render() {
      return(
        <View>
          <Header navigation= {this.props.navigation}/>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Pronostic Screen</Text>
          </View>
        </View>
    )
  }
}

export default PronosticScreen
