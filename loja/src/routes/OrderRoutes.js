const express = require('express');
const router = express.Router();

const OrderController = require ("../controllers/OrderController.js");

  router.get("/order", OrderController.findByAll)//busca todos
  router.get("/order/:orderId", OrderController.findById)//busca por id  
  router.post("/order", OrderController.create)//criar novo pedido
  router.put("/order/", OrderController.update)//atualizar pedido
  router.delete("/order/:orderId", OrderController.deleteOrder)//deletar pedido

  module.exports = router; 
  // aqui é onde eu faço os caminhos(url) e métodos que vão ser mandados para o controle, e la serão tratados