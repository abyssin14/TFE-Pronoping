import React, { Component } from "react";
import { getPronostics } from '../utils/fetching'
import AdminPronosticFragment from '../components/AdminPronosticFragment'
import Loader from 'react-loader-spinner'

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
                    <AdminPronosticFragment pronostic={pronostic} reload={this.componentDidMount.bind(this)} loading={()=>this.setState({isLoading:true})}/>
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
