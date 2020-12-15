import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Dimensions, FlatList, RefreshControl, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../component/Header'
import { COLOR } from '../utils/Styling'
import { getRencontres } from '../utils/fetching'
import ResultPronosticItem from '../component/ResultPronosticItem'

class ResultatsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rencontres: null,
      isLoading: true,
      user: null
    };
  }
  componentDidMount(){
    this.setState({
      isLoading: true
    })
    const user = this.props.route.params.user
    getRencontres().then( response =>{
      this.setState({
        rencontres: response,
        isLoading: false,
        user: user
      });
    });
  }


    render(){
      const isLoading = this.state.isLoading;
      const user = this.state.user
      const rencontres = this.state.rencontres
      console.log(user)
      return(
        <View style={styles.resultatsContainer}>
          <SafeAreaView style={{ flex: 0, backgroundColor: COLOR.grey }} />
          <Header navigation={this.props.navigation}/>
          {isLoading?
            <View style={styles.loader}>
              <ActivityIndicator size="large" color={COLOR.orange} />
            </View>
            :
            <View style={{  alignItems: 'center'}}>
            <Text>Résultats Screen</Text>
              <KeyboardAwareScrollView
                extraHeight={100}
                refreshControl={<RefreshControl onRefresh={()=>this.componentDidMount()} />}
              >
                  <FlatList
                    data={rencontres}
                    renderItem={({item}) => <ResultPronosticItem rencontre={item} joueur={user} />}
                    keyExtractor={item => item.id.toString()}
                    style={{ marginBottom:120}}

                  />
                </KeyboardAwareScrollView>
            </View>
          }
      </View>
    )
  }
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  loader:{
    flex:1,
    width: windowWidth,
    backgroundColor: 'grey',
    alignItems: 'center',
    marginTop:'15%'
  },
  resultatsContainer:{
    flex: 1,
    backgroundColor: 'grey',
    height: windowHeight
  }
});
export default ResultatsScreen
