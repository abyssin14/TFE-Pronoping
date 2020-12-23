import React, { Component } from "react";
import { getPronostics } from '../utils/fetching'
import AdminPronosticFragment from '../components/AdminPronosticFragment'

class PronosticsManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pronostics: null
    };

  }
  componentDidMount(){
    getPronostics().then(response =>{
      if(response){
        this.setState({
          isLoading: false,
          pronostics: response
        })
        this.filtrePronostics()
      }
    })
  }
  filtrePronostics(){
    var tabUpdate = []
    for(let i=0; i<this.state.pronostics.length; i++){
      if(!this.state.pronostics[i].rencontre.isFinished){
        tabUpdate.push(this.state.pronostics[i])
      }
    }
    this.setState({
      pronostics: tabUpdate
    })
  }
  render(){
    const pronostics = this.state.pronostics
    const isLoading = this.state.isLoading
    return (
      <div className="pronosticsManagementContainer">
        { isLoading ? <div>chargement</div> :
        <div>
          <div className='adminPronosticTabTitleContainer'>
            <div>
              Pronostiqueur
            </div>
            <div>
              Rencontre
            </div>
            <div>
              Pronostic
            </div>
          </div>
          {
            pronostics.length > 0 ?
            <div className='adminPronosticTableContainer'>
              {pronostics.map(pronostic =>{
                return(
                  <div>
                    <AdminPronosticFragment pronostic={pronostic} reload={this.componentDidMount.bind(this)}/>
                  </div>
                )
              })
            }
            </div>
            :null
          }



        </div>
      }
    </div>

    );
  }

}

export default PronosticsManagement;
