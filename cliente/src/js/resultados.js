import React, { Component } from 'react';
import shipping from '../img/shipping.png';
import error from '../img/error.jpg';

class Resultados extends Component {

  constructor(){
    super();
    this.state = {
    data:{},
    error:false,
    textoError:"",
    }
  }
  
  
  componentDidMount() {
    var esto = this; 
    console.log(fetch("/items"));
    fetch("/items")

    .then((response) => {
      return response.json()
    })
    .then((recurso) => {
      if(recurso.error){
        this.setState({error:true})
        this.setState({textoError:recurso.error})
      }else{ 
        this.setState({ data: recurso })
      }
    })
    .catch(function(error){
      esto.setState({error:true});
      esto.setState({textoError:"Nope"})
     });
  }

  
  render() {
    var arrayDatos = this.state.data.items
    var arrayCategorias = this.state.data.categories
    //console.log(arrayCategorias);
    console.log(arrayDatos);

    return (
      <div>
        {this.state.error && <div className="mensaje"><img src={error} alt="Error"/><h1>{this.state.textoError}</h1></div>}
        <div id="resultados">
          <ul className="migas">
            {arrayCategorias && arrayCategorias.map(function(name,index){

              return <li key={name}>{name} > </li>})}
          </ul>
          <div>
            {arrayDatos && arrayDatos.map(function(name, index){
              var itemUrl = "/items/"+name.id

              if (name.price.currency==="ARS") {
                name.price.currency="$";
              }

              return <a key={itemUrl} href={itemUrl}>
                        <article className="producto">
                          
                          <img className="foto" src={name.picture} alt="Foto del producto"/>
                          
                          <div className="listado">
                            <div>
                              <h2>
                                <span>{name.price.currency}{name.price.amount}</span>
                                {name.price.decimals!=="00" && <span className="decimales">,{name.price.decimals}</span>}
                                {name.free_shipping && <img className="camioncito" src={shipping} alt="Envío gratis"/>}
                              </h2>
                              <h3>{name.title}</h3>
                            </div>
                            <h4>Vendidos: {name.sold_quantity}</h4>
                            <h4>{name.location}</h4>
                          </div>
                        </article>
                      </a>})
            }
          </div>
        </div> 
     </div>
    )
  }
}

export default Resultados;

