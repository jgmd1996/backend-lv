const express = require('express');
const router = express.Router();

const suppliersController = require ("../controllers/SuppliersController.js");

  router.get("/suppliers", suppliersController.findByAll)//busca todos
  router.get("/suppliers/:suppliersId", suppliersController.findById)//busca por id  
  router.post("/suppliers", suppliersController.create)//criar novo fornecedor
  router.put("/suppliers/", suppliersController.update)//atualizar fornecedor
  router.delete("/suppliers/:suppliersId", suppliersController.deleteSuppliers)//deletar fornecedor

  module.exports = router; 

  // aqui é onde eu faço os caminhos(url) e métodos que vão ser mandados para o controle, e la serão tratados