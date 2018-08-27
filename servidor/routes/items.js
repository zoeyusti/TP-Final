var express = require('express');
var router = express.Router();
var cors = require('cors');
var controller = require('../controllers/MLcontroller');
var axios = require('axios')
/* GET users listing. */
router.get('/', controller.apiBusqueda)
router.get('/item', controller.apiProducto)
module.exports = router;
