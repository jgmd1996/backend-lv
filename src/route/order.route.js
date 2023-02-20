const express = require('express');
const router = express.Router();

const OrderController = require ("../controllers/order.controller");

  router.get("/order", OrderController.findByAll)
  router.get("/order/:orderId", OrderController.findById)
  router.post("/order", OrderController.create)
  router.put("/order/", OrderController.update)
  router.delete("/order/:orderId", OrderController.deleteOrder)

  module.exports = router; 