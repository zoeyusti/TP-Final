var axios = require('axios')
const JSON = require('circular-json');
var url = require('url');
const querystring = require('querystring')
const service = require('../services/MLservice')
const self = {};

//Resultados de la búsqueda
self.apiBusqueda = function(req,res,next){
  var urlEntera = req.headers.referer;
  var urlParseada = url.parse(urlEntera); 
  var query = (querystring.parse(urlParseada.query)).search;

  
  if(query===undefined||!query) {
    var respuesta = {
                    error:"Búsqueda inválida.Cosa 1 y cosa 2 no entendieron, quizás si lo intentas al revés?"
                    }
    res.send(JSON.stringify(respuesta))
  }

  else{
    axios.get('https://api.mercadolibre.com/sites/MLA/search?q=/'+query+'&limit=4')
    .then(function (response) {
      return {
             author:{
             name:"Zoe", 
             lastname:"Yusti"
             }, 
             categories:service.categorizar(query,response),
             items:service.obtenerItems(response)
             }
      })

    .then(function(datos){
      var misDatos = datos;
      res.send(JSON.stringify(misDatos))
    })

    .catch(function (error) {
      var miError = {error:"No hay nada. Puede que cosa 1 y cosa 2 lo hayan destruido. Intentalo nuevamente."}
      res.send(JSON.stringify(miError))
    })
  };
}

//Producto individual
self.apiProducto = async function(req,res,next){
  var urlEntera = req.headers.referer;
  var urlParseada = url.parse(urlEntera); 
  var pathname = urlParseada.pathname;
  var id = pathname.replace("/items/", "");
  
  axios.all([service.obtenerDescripcion(id), service.obtenerItem(id)])
  .then(axios.spread(async function (descripcion, producto) {
    miProducto = {
      author:{
        name:"Zoe",
        lastname:"Yusti"
      },
      item:{
        id:producto.data.id,
        title:producto.data.title,
        price:{
          currency:producto.data.currency_id,
          amount:Math.floor(producto.data.price),
          decimals:service.calculoDecimales(producto.data.price)
        },
        picture:producto.data.pictures[0].url,
        condition:producto.data.condition,
        free_shipping:producto.data.shipping.free_shipping,
        sold_quantity:producto.data.sold_quantity,
        description:service.traerDescripcion(descripcion)
      }
    }
    const arrayCategories = await service.obtenerCategoria(producto.data.category_id)
    miProducto.categories = arrayCategories
    return miProducto
  }))

  .then(function(datos){
    var misDatos = datos;
    var miJSON = JSON.stringify(misDatos)
    res.send(miJSON)
  })

  .catch(function (error) {
    var miError = {error:"Houston, tenemos un problema. Digo, fijate de buscar otra cosa."}
    res.send(JSON.stringify(miError))
    })
};

 

module.exports = self;

