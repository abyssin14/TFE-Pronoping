import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.css';
import Index from './js/Index.js'
import {Router} from "react-router";
import history from "./history";



ReactDOM.render(<Router history={history}><Index /></Router>, document.getElementById('root'));
