import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import Register from './Register.js';
import RegisterStatus from './RegistrationStatus.js';

ReactDOM.render(
(
   <BrowserRouter>
      <Route path = "/" component = {App}>
         <Route path = "register" component = {Register} />
         <Route path = "status" component = {RegisterStatus} />
      </Route>
   </BrowserRouter>

)
, document.getElementById('root'));
registerServiceWorker();
