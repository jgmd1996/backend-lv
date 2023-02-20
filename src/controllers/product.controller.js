const ProductService = require('../service/product.service');
let productService = new ProductService();

exports.create = async function (req, res, next) {

  try {

     const productSaved = await productService.create(req.body);
    res.status(productSaved.statusCode).json(productSaved)

  } catch (e) {
      return next(e);
  }
};

exports.update = async function (req, res, next) {

  try {

      let product = {
          ...req.body
      };

      const productSaved = await productService.update(product);
      return res.status(productSaved.statusCode).json(productSaved);

  } catch (e) {
      return next(e);
  }
};

exports.findById = async function (req, res, next) {

  try {

      const { productId } = req.params;
      const product = await productService.findById(productId);

      if (!product) {
          return res.status(404).send({message: 'Produto não encontrado.'});
      }

      return res.status(200).json({product: product});

  } catch (e) {
      return next(e);
  }
};

exports.findByAll = async function (req, res, next) {

  try {

      const product = await productService.findAll();

      if (!product || product.length === 0) {
          return res.status(404).send({message: 'Produtos não encontrados.'});
      }

      return res.status(200).json({product: product});

  } catch (e) {
      return next(e);   
  }
};

exports.deleteProduct = async function (req, res, next) {

    try {
        const { productId } = req.params;
        const product = await productService.findByIdAndDelete(productId);
  
        if (!product) {
            return res.status(404).send({message: 'Produto não encontrado.'});
        }
  
        return res.status(200).send({message: 'Produto deletado.'});
  
    } catch (e) {
        return next(e);
    }
  };
