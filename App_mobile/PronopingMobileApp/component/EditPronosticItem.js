import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation'
import { postPronostic, updatePreviousPronostics } from '../utils/fetching'
import { checkScore } from '../utils/CalculPoints'
import { COLOR } from '../utils/Styling'

class EditPronosticItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      score1: null,
      score2: null,
      tabScore: [],
      pronostic: null,
      pronostic: null,
      secondTextInput: null,
    };
  }

  componentDidMount(){
    this.getPronostic()
    }
  getPronostic(){
      var joueur = this.props.user;
      var pronostics = this.props.rencontre.pronostics;
      for(let i=0; i < pronostics.length; i++){
        let id = pronostics[i].joueur.substring(13);
        if(joueur.id == id){
          this.setState({
            pronostic: this.props.rencontre.pronostics[i].score
          })
        }
      }
    }
    handleInput1ScoreChange(score){
      this.setState({
        score1: score,
        tabScore: [score, this.state.score2]

      })
    }

    handleInput2ScoreChange(score){
      this.setState({
        score2: score,
        tabScore: [this.state.score1, score]

      })
    }
    addPronostic(){
      if(checkScore(this.state.tabScore)){
        this.setState({
          isLoading: true
        })
        postPronostic(this.props.user, this.props.rencontre, this.state.tabScore).then(response =>{
          if(response){
            this.setState({
              pronostic: this.state.tabScore
            })
            updatePreviousPronostics(this.props.user).then(response =>{
              if(response){
                this.setState({
                  isLoading: false,
                })
              }
            })
          }
        })
      }else{
        alert('Le score encodé est incorrect.')
      }

    }

  render(){
    const rencontre = this.props.rencontre;
    const isLoading = this.state.isLoading;
    const pronostic = this.state.pronostic;
    return(
      <View style={styles.editPronosticContainer}>
          <Text style={styles.textRencontre}>{rencontre.equipe.nom} contre {rencontre.adversaire} (division {rencontre.equipe.division})</Text>
          {isLoading?
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="white" />
            </View>
            :
            <View>
              {pronostic ?
                <View style={styles.myPronosticContainer}>
                  <Text style={styles.text}>Vote pronostic : {pronostic[0]} / {pronostic[1]}</Text>
                </View>
              :
              <View style={styles.pronostiquerContainer}>
                <Text style={styles.text}>Pronostiquer : </Text>
                  <TextInput
                    style={styles.input}
                    value={this.state.score1}
                    onChangeText={(score1) => this.handleInput1ScoreChange(score1)}
                    placeholder="ex: 14"
                    placeholderTextColor='grey'
                    returnKeyType = {(Platform.OS === 'ios') ? 'done' : 'next'}
                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    blurOnSubmit={false}
                    keyboardType="number-pad"
                  />
                  <TextInput
                    ref={(input) => { this.secondTextInput = input; }}
                    style={styles.input}
                    value={this.state.score2}
                    onChangeText={(score2) => this.handleInput2ScoreChange(score2)}
                    placeholder='ex: 2'
                    placeholderTextColor='grey'
                    returnKeyType = {"done"}
                    onSubmitEditing={() => this.addPronostic()}
                    keyboardType="number-pad"
                  />
                  <View>
                  <TouchableOpacity
                    style={styles.submit}
                    onPress={() => this.addPronostic()}
                    >
                    <Icon name="check"  size={15} color= {COLOR.orange} style={styles.checkIcon}/>
                  </TouchableOpacity>
                  </View>
              </View>
            }
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
    alignItems: 'center',
    justifyContent:'center',
  },
  editPronosticContainer:{
    height:110,
    width: windowWidth-30,
    backgroundColor: COLOR.lightGrey,
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: COLOR.orange
  },
  textRencontre:{
    fontWeight: 'bold',
    color: 'white'
  },
  text:{
    color:'white',
    textAlign: 'left'
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
    justifyContent:'center',
    marginTop:10

  },
  myPronosticContainer:{
    alignItems:'center',
    marginTop:20,
  }
});

export default EditPronosticItem
