const ProductService = require('../service/ProductService');
let productService = new ProductService();

exports.create = async function (req, res, next) {//funçao de criar com a ajuda de service 

  try {

     const productSaved = await productService.create(req.body);//requisitando o corpo
    res.status(productSaved.statusCode).json(productSaved)//aqui fica a resposta de acordo com o que o service me traz no corpo da requiseição, seria os codigos http em caso de erro a mensagem

  } catch (e) {
      return next(e);
  }
};

exports.update = async function (req, res, next) {//aqui fica a função de atualizar

  try {

      let product = {
          ...req.body
      };

      const productSaved = await productService.update(product);//requisitando o corpo
      return res.status(productSaved.statusCode).json(productSaved);//aqui fica a resposta de acordo com o que o service me traz no corpo da requiseição, seria os codigos http em caso de erro a mensagem

  } catch (e) {
      return next(e);
  }
};

exports.findById = async function (req, res, next) {//função de busca por id

  try {

      const { productId } = req.params;//requisitando o corpo pelo id
      const product = await productService.findById(productId);

      if (!product) {//se for diferente de vazio retorno o status 404  e a mensagem
          return res.status(404).send({message: 'Produto não encontrado.'});
      }

      return res.status(200).json({product: product});//em caso de achar retorna o status e o corpo da requisição

  } catch (e) {
      return next(e);
  }
};

exports.findByAll = async function (req, res, next) {//funçao de buscar todos

  try {

      const product = await productService.findAll();

      if (!product || product.length === 0) {// validação se for diferente de vazio ou igual a 0 ele retorna o erro e a mensagem
          return res.status(404).send({message: 'Produtos não encontrados.'});
      }

      return res.status(200).json({products: product});//retorna o status e todos os produtos

  } catch (e) {
      return next(e);   
  }
};

exports.deleteProduct = async function (req, res, next) {//funçao de deletar por id

    try {
        const { productId } = req.params;
        const product = await productService.findByIdAndDelete(productId);//busca da validaçao do service
  
        if (!product) {//caso seja vazio retorna o erro e a mensagem 
            return res.status(404).send({message: 'Produto não encontrado.'});
        }
  
        return res.status(200).send({message: 'Produto deletado.'});//retorna o status e a mensagem de pedido deletado
  
    } catch (e) {
        return next(e);
    }
  };
