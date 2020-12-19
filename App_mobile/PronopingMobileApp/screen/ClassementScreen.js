import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions, ActivityIndicator, RefreshControl, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../component/Header'
import { COLOR } from '../utils/Styling'
import { getJoueurs } from '../utils/fetching'
import ClassementRowItem from '../component/ClassementRowItem'


class ClassementScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joueurs: null,
      isLoading: true,
      user: null
    };
  }
  componentDidMount(){
    this.setState({
      isLoading: true
    })
    const user = this.props.route.params.user
    getJoueurs().then( response =>{
      //tri en fonction des points
      response.sort(function(a,b){
        return b.nbPoints - a.nbPoints
      })
      this.setState({
        joueurs: response,
        isLoading: false,
        user: user
      });
    });
  }

    render() {
      const isLoading = this.state.isLoading;
      const joueurs = this.state.joueurs;
      const user = this.state.user;
      return(
        <View style={styles.classementContainer}>
          <SafeAreaView style={{ flex: 0, backgroundColor: COLOR.grey }} />
          <Header navigation={this.props.navigation}/>
          {isLoading?
            <View style={styles.loader}>
              <ActivityIndicator size="large" color={COLOR.orange} />
            </View>
            :
            <View style={{  alignItems: 'center'}}>
              <View style={styles.screenNameContainer}>
               <Text style={styles.screenNameText}>Classement</Text>
              </View>
              <View style={styles.table}>
                <View style={styles.header}>
                  <View style={styles.headerSmallCell}>
                    <Text style={styles.headerTextCell}>Place</Text>
                  </View>
                  <View style={styles.headerLargeCell}>
                    <Text style={styles.headerTextCell}>Pronostiqueur</Text>
                  </View>
                  <View style={styles.headerSmallCell}>
                    <Text style={styles.headerTextCell}>Points</Text>
                  </View>
                </View>
                    <FlatList
                      data={joueurs}
                      renderItem={({item, index}) => <ClassementRowItem joueur={item} index={index} user={user} />}
                      keyExtractor={item => item.id.toString()}
                      style={{ marginTop:10}}
                      refreshControl={<RefreshControl onRefresh={()=>this.componentDidMount()} />}
                    />
                </View>
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
  classementContainer:{
    flex: 1,
    backgroundColor: 'grey',
    height: windowHeight
  },
  table: {
    backgroundColor: COLOR.lightGrey,
    width: windowWidth -50,
    height: '80%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLOR.orange,
    padding:5
  },
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    height:30,
    borderBottomColor: 'white',
    borderBottomWidth: 1
  },
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
  screenNameContainer:{
    margin:10
  },
  screenNameText:{
    fontSize:18,
    fontWeight:'bold',
    color: COLOR.grey
  }

});
export default ClassementScreen
