const express = require('express');
const router = express.Router();

const ClientController = require ("../controllers/ClientController.js");

  router.get("/client", ClientController.findByAll)//busca todos
  router.get("/client/:clientId", ClientController.findById)//busca por id  
  router.post("/client", ClientController.create)//criar novo cliente
  router.put("/client/", ClientController.update)//atualizar cliente
  router.delete("/client/:clientId", ClientController.deleteClient)//deletar cliente

  module.exports = router; 


// aqui é onde eu faço os caminhos(url) e métodos que vão ser mandados para o controle, e la serão tratados