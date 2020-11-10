import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/app.css';
import Index from './js/Index.js'

ReactDOM.render(<Router><Index /></Router>, document.getElementById('root'));
