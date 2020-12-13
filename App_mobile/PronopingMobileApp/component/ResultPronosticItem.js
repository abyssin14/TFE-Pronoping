import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation'
import { COLOR } from '../utils/Styling'

class ResultPronosticItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      pronostic: null
    };
  }

  componentDidMount(){
    this.getPronostic()
    }
  getPronostic(){
      var joueur = this.props.joueur;
      var pronostics = this.props.rencontre.pronostics;
      for(let i=0; i < pronostics.length; i++){
        let id = pronostics[i].joueur.substring(13);
        if(joueur.id == id){
          if(!this.props.rencontre.pronostics[i].isFinished)
          this.setState({
            pronostic: this.props.rencontre.pronostics[i],
          })
        }
      }
    }

  render(){
    const rencontre = this.props.rencontre;
    const isLoading = this.state.isLoading;
    const pronostic = this.state.pronostic;
    return(
      <View>
      {pronostic && !pronostic.isFinished ?
        <View style={styles.editPronosticContainer}>
                <Text style={styles.textRencontre}>{rencontre.equipe.nom} contre {rencontre.adversaire} (division {rencontre.equipe.division})</Text>
                <View style={styles.myPronosticContainer}>
                  <Text style={{color:"white"}}>Vote pronostic : {pronostic.score[0]} / {pronostic.score[1]}</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{color:"white"}}>Résultat : </Text>
                    {rencontre.score.length > 0 ?
                      <View>
                        <Text style={{color:"white"}}>{rencontre.score[0]}/{rencontre.score[1]}</Text>
                        <Text style={{color:"white"}}>Points rapporté : {pronostic.pointsRapportes}</Text>
                      </View>
                      :
                      <View>
                        <Text style={{color:"white"}}>Pas encore disponible.</Text>
                      </View>
                     }
                  </View>
                </View>
            </View>
            :null
          }
      </View>
    )
  }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  loader:{
    alignItems: 'center',
    justifyContent:'center',
  },
  editPronosticContainer:{
    height:80,
    width: windowWidth-30,
    backgroundColor: COLOR.orange,
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
  },
  textRencontre:{
    fontWeight: 'bold',
    color: 'white'
  },
  input:{
    width: 45,
    height:30,
    backgroundColor: 'white',
    margin: 5,
    padding: 2,
    borderRadius: 5
  },
  submit:{
    width: 30,
    height:30,
    backgroundColor:'white',
    borderRadius: 20,

  },
  checkIcon:{
    position: 'absolute',
    right: 8,
    top:7,
  },
  pronostiquerContainer:{
    flexDirection:'row',
    alignItems: 'center',
  },
  myPronosticContainer:{
    alignItems: 'center',
    marginTop:10,
  }
});

export default ResultPronosticItem
