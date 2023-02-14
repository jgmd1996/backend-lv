const SuppliersService = require('../service/SuppliersService');
let suppliersService = new SuppliersService();

exports.create = async function (req, res, next) {//funçao de criar com a ajuda de service 
  try {
     const suppliersSaved = await suppliersService.create(req.body);//requisitando o corpo
    res.status(suppliersSaved.statusCode).json(suppliersSaved)//aqui fica a resposta de acordo com o que o service me traz no corpo da requiseição, seria os codigos http em caso de erro a mensagem
  } catch (e) {
      return next(e);
  }
};

exports.update = async function (req, res, next) {//aqui fica a função de atualizar
  try {
      let suppliers = {
          ...req.body
      };
      const suppliersSaved = await suppliersService.update(suppliers);//requisitando o corpo
      return res.status(suppliersSaved.statusCode).json(suppliersSaved);//aqui fica a resposta de acordo com o que o service me traz no corpo da requiseição, seria os codigos http em caso de erro a mensagem
  } catch (e) {
      return next(e);
  }
};

exports.findById = async function (req, res, next) {//função de busca por id
  try {
      const { suppliersId } = req.params;//requisitando o corpo pelo id
      const suppliers = await suppliersService.findById(suppliersId);
      if (!suppliers) {//se for diferente de vazio retorno o status 404  e a mensagem
          return res.status(404).send({message: 'Fornecedor não encontrado.'});
      }
      return res.status(200).json({suppliers: suppliers});//em caso de achar retorna o status e o corpo da requisição
  } catch (e) {
      return next(e);
  }
};

exports.findByAll = async function (req, res, next) {//funçao de buscar todos
  try {
      const suppliers = await suppliersService.findAll();
      if (!suppliers || suppliers.length === 0) {// validação se for diferente de vazio ou igual a 0 ele retorna o erro e a mensagem
          return res.status(404).send({message: 'Fornecedor não encontradas.'});
      }
      return res.status(200).json({supplierss: suppliers});//retorna o status e todos os fornecedores
  } catch (e) {
      return next(e);   
  }
};

exports.deleteSuppliers = async function (req, res, next) {//funçao de deletar por id
    try {
        const { suppliersId } = req.params;
        const suppliers = await suppliersService.findByIdAndDelete(suppliersId);//busca da validaçao do service
  
        if (!suppliers) {//caso seja vazio retorna o erro e a mensagem 
            return res.status(404).send({message: 'Fornecedor não encontrado.'});
        }
        return res.status(200).send({message: 'Fornecedor deletado.'});//retorna o status e a mensagem de pedido deletado
    } catch (e) {
        return next(e);
    }
  };
