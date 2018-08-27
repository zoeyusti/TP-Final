import React, { Component } from 'react';
import welcome from '../img/welcome.jpg';

class Welcome extends Component {

  constructor(){
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div id="welcome">
        <img src={welcome} alt="welcome"/>
       </div>    
    )
  }
}

export default Welcome;