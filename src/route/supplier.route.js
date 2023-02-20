const express = require('express');
const router = express.Router();

const suppliersController = require ("../controllers/supplier.controller");

  router.get("/suppliers", suppliersController.findByAll)
  router.get("/suppliers/:suppliersId", suppliersController.findById)
  router.post("/suppliers", suppliersController.create)
  router.put("/suppliers/", suppliersController.update)
  router.delete("/suppliers/:suppliersId", suppliersController.deleteSuppliers)

  module.exports = router;