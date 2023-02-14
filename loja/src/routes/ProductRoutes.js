const express = require('express');
const router = express.Router();

const productController = require('../controllers/ProductController');

  router.get("/product", productController.findByAll)//busca todos
  router.get("/product/:productId", productController.findById)//busca por id  
  router.post("/product", productController.create)//criar novo produto
  router.put("/product", productController.update)//atualizar produto
  router.delete("/product/:productId", productController.deleteProduct)//deletar produto

  module.exports = router; 
  // aqui é onde eu faço os caminhos(url) e métodos que vão ser mandados para o controle, e la serão tratados