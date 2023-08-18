var express = require('express');
const { createProduct } = require('../services/api/productService');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/product', createProduct)

module.exports = router;
