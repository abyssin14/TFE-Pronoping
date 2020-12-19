import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimension, ActivityIndicator, Dimensions, RefreshControl, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import Header from '../component/Header'
import { getRencontres } from "../utils/fetching"
import EditPronosticItem from "../component/EditPronosticItem"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { COLOR } from "../utils/Styling"


class PronosticScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      listRencontres: [],
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
        listRencontres: response,
        isLoading: false,
        user: user
      });
      this.getCurrentRencontres();
    });
  }
  getCurrentRencontres(){
    var listRencontreNotFinished = []
    for(let r=0; r < this.state.listRencontres.length; r++){
      if(!this.state.listRencontres[r].isFinished){
        listRencontreNotFinished.push(this.state.listRencontres[r])
      }
    }
    this.setState({
      listRencontres: listRencontreNotFinished
    })
  }

    render() {
      const rencontres = this.state.listRencontres
      const user = this.state.user
      const isLoading = this.state.isLoading
      return(

        <View style={styles.pronosticContainer}>
        <SafeAreaView style={{ flex: 0, backgroundColor: COLOR.grey }} />
          <Header navigation= {this.props.navigation}/>
            {isLoading?
              <View style={styles.loader}>
                <ActivityIndicator size="large" color={COLOR.orange} />
              </View>
              :
              <View style={{  alignItems: 'center'}}>
                <View style={styles.screenNameContainer}>
                 <Text style={styles.screenNameText}>Pronostiquer</Text>
                </View>
                <KeyboardAwareScrollView
                  extraHeight={135}
                  refreshControl={<RefreshControl onRefresh={()=>this.componentDidMount()} />}
                >
                    <FlatList
                      data={rencontres}
                      renderItem={({item}) => <EditPronosticItem rencontre={item} user={user} refresh={()=>this.componentDidMount()}/>}
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
    marginTop: '15%'
  },
  pronosticContainer:{
    flex: 1,
    backgroundColor: 'grey',
    height: windowHeight
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

export default PronosticScreen
