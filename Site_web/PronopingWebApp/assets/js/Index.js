import React, { Component } from "react";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from "reactjs-navbar";
import "reactjs-navbar/dist/index.css";
import {  faUser, faTrophy, faPencilAlt, faUserShield, faChartBar  } from "@fortawesome/free-solid-svg-icons";
import  PronosticView  from './views/PronosticView';
import  ClassementView  from './views/ClassementView';
import  ProfilView  from './views/ProfilView';
import  ResultatsView  from './views/ResultatsView';
import  AdminPronosticsView from './views/admin/AdminPronosticsView';
import  AdminClubView from './views/Admin/adminClubView';
import { getJoueur } from './utils/fetching';


import history from "../history";


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoading: true
    };
  }
  componentDidMount(){
    getJoueur(this.props.userId).then(response =>{
      this.setState({
        user: response,
        isLoading: false
      });
      console.log(this.state.user)
    })
  }
  isUser(){
    return (this.state.user.roles[0] == 'ROLE_USER')
  }
  isAdmin(){
    return (this.state.user.roles[1] == 'ROLE_ADMIN')
  }
    render() {
      const isLoading = this.state.isLoading;
        return (
          <div>
            {isLoading ? null
              :
              <div>
                <Navbar
                  menuItems={[
                    {
                      title: "Mon profil",
                      icon: faUser,
                      isAuth: this.isUser(),
                      onClick: () => {
                        history.push('/user/profil')
                      },
                    },
                    {
                      title: "Pronostiquer",
                      icon: faPencilAlt,
                      isAuth: this.isUser(),
                      onClick: () => {
                        history.push('/user/pronostic')
                      },
                    },
                    {
                      title: "Résultats",
                      icon: faChartBar,
                      isAuth: this.isUser(),
                      onClick: () => {
                        history.push('/user/resultats')
                      }
                    },
                    {
                      title: "Classement",
                      icon: faTrophy,
                      isAuth: this.isUser(),
                      onClick: () => {
                        history.push('/user/classement')
                      },
                    },

                    {
                      title: "Administration",
                      icon: faUserShield,
                      isAuth: this.isAdmin(),
                      onClick: () => {
                        history.push('/admin/pronostics')
                      },
                      subItems: [
                        {
                          title: "Gestion des pronostics",
                          icon: faTrophy,
                          isAuth: this.isAdmin(),
                          onClick: () => {
                            history.push('/admin/pronostics')
                          },
                        },
                        {
                          title: "Gestion du club",
                          icon: faTrophy,
                          isAuth: this.isAdmin(),
                          onClick: () => {
                            history.push('/admin/club')
                          },
                        },
                      ],
                    }
                  ]}
                />
                  <Switch>
                    <Route exact path="/user/pronostic" component={() => <PronosticView user= {this.state.user} />} />
                    <Route exact path="/user/resultats" component={() => <ResultatsView user= {this.state.user} />} />
                    <Route exact path="/user/profil" component={() => <ProfilView user= {this.state.user} />} />
                    <Route exact path="/user/classement" component={() => <ClassementView user= {this.state.user} />} />
                    <Route exact path="/admin/pronostics" component={AdminPronosticsView} />
                    <Route exact path="/admin/club" component={AdminClubView} />
                  </Switch>
                </div>
            }

          </div>
        )
    }
}

export default Index;
