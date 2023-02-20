const express = require('express');
const router = express.Router();

const ClientController = require ("../controllers/client.controller");

  router.get("/client", ClientController.findByAll)
  router.get("/client/:clientId", ClientController.findById)
  router.post("/client", ClientController.create)
  router.put("/client/", ClientController.update)
  router.delete("/client/:clientId", ClientController.deleteClient)

  module.exports = router;