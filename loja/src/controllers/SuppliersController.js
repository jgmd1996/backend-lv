const SuppliersService = require('../service/SuppliersService');
let suppliersService = new SuppliersService();

exports.create = async function (req, res, next) {
  try {
     const suppliersSaved = await suppliersService.create(req.body);
    res.status(suppliersSaved.statusCode).json(suppliersSaved)
  } catch (e) {
      return next(e);
  }
};

exports.update = async function (req, res, next) {
  try {
      let suppliers = {
          ...req.body
      };
      const suppliersSaved = await suppliersService.update(suppliers);
      return res.status(suppliersSaved.statusCode).json(suppliersSaved);
  } catch (e) {
      return next(e);
  }
};

exports.findById = async function (req, res, next) {
  try {
      const { suppliersId } = req.params;
      const suppliers = await suppliersService.findById(suppliersId);
      if (!suppliers) {
          return res.status(404).send({message: 'Fornecedor não encontrado.'});
      }
      return res.status(200).json({suppliers: suppliers});
  } catch (e) {
      return next(e);
  }
};

exports.findByAll = async function (req, res, next) {
  try {
      const suppliers = await suppliersService.findAll();
      if (!suppliers || suppliers.length === 0) {
          return res.status(404).send({message: 'Fornecedor não encontradas.'});
      }
      return res.status(200).json({supplierss: suppliers});
  } catch (e) {
      return next(e);   
  }
};

exports.deleteSuppliers = async function (req, res, next) {
    try {
        const { suppliersId } = req.params;
        const suppliers = await suppliersService.findByIdAndDelete(suppliersId);
  
        if (!suppliers) {
            return res.status(404).send({message: 'Fornecedor não encontrado.'});
        }
        return res.status(200).send({message: 'Fornecedor deletado.'});
    } catch (e) {
        return next(e);
    }
  };
