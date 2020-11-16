import React, { Component } from "react";
import {getClubs, getClub, getEquipes, getEquipe, postEquipe, test, postClub} from "./utils/fetching";

class Index extends Component {
    componentDidMount(){
        postEquipe("testAddEquipeInClub", 2, 3).then(result=>{
                console.log(result);
        })

    }
    render() {
        return (
            <div style={{color: "blue"}}>
                <h1>Bienvenue sur Pronoping</h1>
            </div>
        );
    }
}

export default Index;
