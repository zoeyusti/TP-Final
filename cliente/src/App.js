import React, { Component } from 'react'; //Entiendo que no te guste esta linea pero no pienso comentarla
import Header from './js/header';
import Bienvenida from './js/welcome';
import Resultados from './js/resultados';
import Individual from './js/individual';
import Error from './js/error';

import './css/App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'


const App = () => (
  <Router>
     <div>
      <Header/>
      <Switch>
        <Route exact path="/" component={Bienvenida}/>
        <Route exact path="/items" component={Resultados}/>
        <Route exact path="/items/:id" component={Individual}/>
        <Route component={Error}/>
      </Switch>
     </div>
  </Router>
)

export default App;
