var express = require('express');
const { createProduct } = require('../services/api/productService');
const { createDesa } = require('../services/api/desaService');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/product', createProduct)
router.post('/desa', createDesa)


module.exports = router;
