import React, { Component } from "react";
import EquipesManagement from "../../components/EquipesManagement"
import JoueursManagement from "../../components/JoueursManagement"
import { getClub } from '../../utils/fetching'


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
      <div>
        { isLoading ? <div>chargement</div> :
          <div className='clubContainer'>
            <div className='gestionclubContainer'>
            <EquipesManagement club={this.state.club} />
            </div>
            <div className='gestionclubContainer'>
            <JoueursManagement club={this.state.club} />
            </div>
          </div>
        }
      </div>


    );
  }

}

export default AdminClubView;
