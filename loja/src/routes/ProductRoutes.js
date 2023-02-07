const express = require('express');
const router = express.Router();

const productController = require('../controllers/ProductController');

  router.get("/product", productController.findByAll)
  router.get("/product/:productId", productController.findById)
  router.post("/product", productController.create)
  router.put("/product", productController.update)
  router.delete("/product/:productId", productController.deleteProduct)

  module.exports = router; 