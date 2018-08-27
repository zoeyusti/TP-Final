import React, { Component } from 'react';
import error from '../img/error.jpg';

class Error extends Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    return (
        <div className="mensaje">
            <h1>ERROR 404</h1>
            <img src={error} alt="Error"/>
            <p>Parece que cosa 1 y cosa 2 han estado haciendo travesuras</p>
            <p>Vuelve a intentarlo más tarde</p>
            <a href="/">Volver</a>
            
        </div>
      )
  }
}

export default Error;