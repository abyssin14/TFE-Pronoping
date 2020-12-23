import React, { Component } from "react";
import RencontresManagement from "../../components/RencontresManagement.js"
import PronosticsManagement from "../../components/PronosticsManagement.js"
import { getEquipesInClub } from '../../utils/fetching'


class AdminPronosticsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equipes: null,
      isLoading: false,
      reload: false,
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
        { isLoading ? <div>chargement</div> :
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
