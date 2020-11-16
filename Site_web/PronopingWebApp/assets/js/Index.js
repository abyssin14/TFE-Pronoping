import React, { Component } from "react";
import Navbar from "reactjs-navbar";
import "reactjs-navbar/dist/index.css";
import {  faUser, faTrophy, faPencilAlt, faUserShield  } from "@fortawesome/free-solid-svg-icons";



class Index extends Component {

    render() {
        return (
          <Navbar
            menuItems={[
              {
                title: "Mon profil",
                icon: faUser,
                isAuth: true,
              },
              {
                title: "Pronostiquer",
                icon: faPencilAlt,
                isAuth: true,

              },
              {
                title: "Classement",
                icon: faTrophy,
                isAuth: true,

              },

              {
                title: "Administration",
                icon: faUserShield,
                isAuth: true,

              }
            ]}
          />
        )
    }
}

export default Index;
