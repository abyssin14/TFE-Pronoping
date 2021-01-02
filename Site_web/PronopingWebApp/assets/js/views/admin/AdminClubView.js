import React, { Component } from "react";
import EquipesManagement from "../../components/EquipesManagement"
import JoueursManagement from "../../components/JoueursManagement"
import { getClub } from '../../utils/fetching'
import Loader from 'react-loader-spinner'



class AdminClubView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      club: null,
      isLoading: true
    };
  }
  componentDidMount(){
    getClub(1).then(result => {
      this.setState({
        club: result,
        isLoading: false
      })
    })
  }
  render(){
    const isLoading = this.state.isLoading;
    return (
      <div className='backgroundContainer'>
        { isLoading ?
          <Loader
             type="Rings"
             color="#fb5529"
             height={80}
             width={80}
             className='loader'
             timeout={8000}
          />
        :
          <div className='doubleContainer'>
            <div className='demiContainer'>
              <div className='titleContainer'>
                <p className='titleText'>Gestion des équipes</p>
              </div>
              <EquipesManagement club={this.state.club} />
            </div>
            <div className='demiContainer'>
              <div className='titleContainer'>
                <p className='titleText'>Gestion des pronostiqueurs</p>
              </div>
              <JoueursManagement club={this.state.club} />
            </div>
          </div>
        }
      </div>


    );
  }

}

export default AdminClubView;
