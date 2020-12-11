import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimension, ActivityIndicator, Dimensions, RefreshControl, KeyboardAvoidingView, Platform } from 'react-native';
import Header from '../component/Header'
import { getRencontres } from "../utils/fetching"
import EditPronosticItem from "../component/EditPronosticItem"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


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
        <View>
          <Header navigation= {this.props.navigation}/>
            {isLoading?
              <View style={styles.loader}>
                <ActivityIndicator size="large" color="green" />
              </View>
              :
              <View style={{  alignItems: 'center', marginTop:75, marginBottom:60}}>
              <Text>Pronostic Screen</Text>
                <KeyboardAwareScrollView
                  extraHeight={100}
                  refreshControl={<RefreshControl onRefresh={()=>this.componentDidMount()} />}
                >
                    <FlatList
                      data={rencontres}
                      renderItem={({item}) => <EditPronosticItem rencontre={item} user={user} refresh={()=>this.componentDidMount()}/>}
                      keyExtractor={item => item.id.toString()}
                      style={{ marginBottom:20}}

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
    justifyContent:'center',
    marginTop:'50%'
  },
});

export default PronosticScreen
