import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.css';
import Index from './js/Index.js'
import {Router} from "react-router";
import history from "./history";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


var rootElement = document.getElementById('root');
ReactDOM.render(<Router history={history}><Index userId={rootElement.getAttribute('userId')}/></Router>, rootElement);
