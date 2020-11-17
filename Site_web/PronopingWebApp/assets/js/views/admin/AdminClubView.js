import React, { Component } from "react";
import EquipesManagement from "../../components/EquipesManagement"
import JoueursManagement from "../../components/JoueursManagement"


class AdminClubView extends Component {
  render(){
    return (
      <div className='clubContainer'>
        <div className='gestionclubContainer'>
        <EquipesManagement />
        </div>
        <div className='gestionclubContainer'>
        <JoueursManagement />
        </div>
      </div>
    );
  }

}

export default AdminClubView;
