import React, { Component } from 'react';
import shipping from '../img/shipping.png';
import error from '../img/error.jpg';



class Individual extends Component {

  constructor(){
    super();
    this.state = {
    data:{},
    error:false,
    textError:"",
    loading:true
    }
  }

 
   componentDidMount() {
    var eso = this
    fetch("/items/item")
      .then((response) => {
        return response.json()
      })
      .then((recurso) => {
        if(recurso.error){
          this.setState({error:true})
          this.setState({textoError:recurso.error})
          this.setState({loading:false})
        }else{ 
          this.setState({ data: recurso })
          this.setState({loading:false})
        }
      })
      .catch(function(error){
        eso.setState({error:true});
        eso.setState({textoError:"Nope"})
        eso.setState({loading:false})
      })
  }

  render() {
      var item = this.state.data.item
      var categorias = this.state.data.categories
     


/*  function ActionLink() {
  	function handleClick(e) {
    	e.preventDefault();
    	console.log({item.permalink});
  }*/


      return (
      <div id="prodSolo">
         {this.state.error && <div className="mensaje"><img src={error} alt="Error"/><h1>{this.state.textoError}</h1></div>}
        <ul className="migas">
          {categorias && categorias.map(function(name,index){

          if (item.price.currency==="ARS") {
                item.price.currency="$";
              }

          /*if (item.condition==="new") {
            item.condition = "Nuevo";
          }else{item.condition = "Usado";}*/
          //welp
         // item.condition==="new"?item.condition="Nuevo":item.condition="Usado";


            return <li key={name.id}>{name.name} > </li>
            })
          }
        </ul>
        <div>
          {item && <div className="todoElProd">

                    
            <img className="foto" src={item.picture} alt="Imagen del producto"/>
            
            <div className="info">
              <h5>{item.condition} - {item.sold_quantity} vendidos </h5>
              <h2>{item.title}</h2>
              <h1>
                <span>
                  {item.price.currency}{item.price.amount}
                </span>
                {item.price.decimals!=="00" && <span className="decimales">,{item.price.decimals}</span>}
              </h1>
              {item.free_shipping && <h6>Envío gratis <img src={shipping} alt="Envío gratis"/></h6>}
              <a className="comprarbtn" target="_blank" href={link}>Comprar</a>
            </div>
          
            <div className="descripcion">
              <h2>Descripción del producto</h2>
              <p>{item.description}</p>
            </div>
          </div>}
        </div>
      </div>
    )
  }
}

export default Individual;