import React, { Component } from "react";
import RencontresManagement from "../../components/RencontresManagement.js"
import PronosticsManagement from "../../components/PronosticsManagement.js"
import { getEquipesInClub } from '../../utils/fetching'


class AdminPronosticsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equipes: null,
      isLoading: true,
      reload: false,
    };
  }
  componentDidMount(){
    getEquipesInClub(7).then(result => {
      this.setState({
        equipes: result,
        isLoading: false
      })
    })
  }
  reload(){
    this.setState({
      reload: !reload
    })
  }
  render(){
    const isLoading = this.state.isLoading;
    return (
      <div>
        { isLoading ? <div>chargement</div> :
          <div className='clubContainer'>
            <div className='gestionclubContainer'>
            <RencontresManagement equipes={this.state.equipes} reload={this.reload}/>
            </div>
            <div className='gestionclubContainer'>
            <PronosticsManagement club={this.state.equipes} />
            </div>
          </div>
        }
      </div>


    );
  }

}

export default AdminPronosticsView;
