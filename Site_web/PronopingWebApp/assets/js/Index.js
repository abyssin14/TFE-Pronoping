import React, { Component } from "react";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from "reactjs-navbar";
import "reactjs-navbar/dist/index.css";
import {  faUser, faTrophy, faPencilAlt, faUserShield  } from "@fortawesome/free-solid-svg-icons";
import  PronosticView  from './views/PronosticView';
import  ClassementView  from './views/ClassementView';
import  ProfilView  from './views/ProfilView';
import  AdminPronosticsView from './views/admin/AdminPronosticsView';
import  AdminClubView from './views/Admin/adminClubView';
import { getJoueur } from './utils/fetching';


import history from "../history";


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };

  }
  componentDidMount(){
    getJoueur(this.props.userId).then(response =>{
      this.setState({
        user: response
      });
    })
  }
    render() {
        return (

          <div>
            <Navbar
              menuItems={[
                {
                  title: "Mon profil",
                  icon: faUser,
                  isAuth: true,
                  onClick: () => {
                    history.push('/profil')
                  },
                },
                {
                  title: "Pronostiquer",
                  icon: faPencilAlt,
                  isAuth: true,
                  onClick: () => {
                    history.push('/pronostic')
                  },
                },
                {
                  title: "Classement",
                  icon: faTrophy,
                  isAuth: true,
                  onClick: () => {
                    history.push('/classement')
                  },
                },

                {
                  title: "Administration",
                  icon: faUserShield,
                  isAuth: true,
                  onClick: () => {
                    history.push('/admin/pronostics')
                  },
                  subItems: [
                    {
                      title: "Gestion des pronostics",
                      icon: faTrophy,
                      isAuth: true,
                      onClick: () => {
                        history.push('/admin/pronostics')
                      },
                    },
                    {
                      title: "Gestion du club",
                      icon: faTrophy,
                      isAuth: true,
                      onClick: () => {
                        history.push('/admin/club')
                      },
                    },
                  ],
                }
              ]}
            />
              <Switch>
                <Route exact path="/pronostic" component={() => <PronosticView user= {this.state.user} />} />
                <Route exact path="/profil" component={() => <ProfilView user= {this.state.user} />} />
                <Route exact path="/classement" component={() => <ClassementView user= {this.state.user} />} />
                <Route exact path="/admin/pronostics" component={AdminPronosticsView} />
                <Route exact path="/admin/club" component={AdminClubView} />
              </Switch>
          </div>
        )
    }
}

export default Index;
