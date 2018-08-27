import React, { Component } from 'react';
import logo from '../img/logo.png';
import lupa from '../img/search.png';


class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }
  
  render() {
    return (
    <div id="header"> 
      <a href="/">
        <img src={logo} className="logo" alt="logo" />
      </a> 
      <form type="GET" id="aBuscar" action="/items">
        <input name="search" type="text" placeholder="Nunca dejes de buscar..."/>
        <button id="botonBuscar" type="submit" alt="buscar"><img src={lupa} alt="Buscar" /></button>
     </form>  
    </div>
    )
  }
}

export default Header;