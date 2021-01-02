import React, { Component } from "react";
import RencontresManagement from "../../components/RencontresManagement.js"
import PronosticsManagement from "../../components/PronosticsManagement.js"
import { getEquipesInClub } from '../../utils/fetching'
import Loader from 'react-loader-spinner'



class AdminPronosticsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  componentDidMount(){
    this.setState({
      isLoading: true
    })
    this.setState({
      isLoading: false
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
                <p className='titleText'>Gestion des rencontres</p>
              </div>
            <RencontresManagement reload={this.componentDidMount.bind(this)}/>
            </div>
            <div className='demiContainer'>
              <div className='titleContainer'>
                <p className='titleText'>Gestion des pronostics</p>
              </div>
            <PronosticsManagement />
            </div>
          </div>
        }
      </div>


    );
  }

}

export default AdminPronosticsView;
