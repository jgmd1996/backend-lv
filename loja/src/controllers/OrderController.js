const OrderService = require('../service/orderService');
let orderService = new OrderService();

exports.create = async function (req, res, next) {//funçao de criar com a ajuda de service 

  try {
     const orderSaved = await orderService.create(req.body);//requisitando o corpo
    res.status(orderSaved.statusCode).json(orderSaved)//aqui fica a resposta de acordo com o que o service me traz no corpo da requiseição, seria os codigos http em caso de erro a mensagem
  } catch (e) {
      return next(e);
  }
};

exports.update = async function (req, res, next) {//aqui fica a função de atualizar
   
  try {
      let order = {
          ...req.body
      };
      
      const orderSaved = await orderService.update(order);//requisitando o corpo
      return res.status(orderSaved.statusCode).json(orderSaved);//aqui fica a resposta de acordo com o que o service me traz no corpo da requiseição, seria os codigos http em caso de erro a mensagem
  } catch (e) {
      return next(e);
  }
};

exports.findById = async function (req, res, next) {//função de busca por id

  try {
      const { orderId } = req.params;//requisitando o corpo pelo id
      const order = await orderService.findById(orderId);
      if (!order) {//se for diferente de vazio retorno o status 404  e a mensagem
          return res.status(404).send({message: 'Pedido não encontrado.'});
      }
      return res.status(200).json({order: order});//em caso de achar retorna o status e o corpo da requisição
  } catch (e) {
      return next(e);
  }
};

exports.findByAll = async function (req, res, next) {//funçao de buscar todos
     
  try {
      const order = await orderService.findAll();
      if (!order || order.length === 0) {// validação se for diferente de vazio ou igual a 0 ele retorna o erro e a mensagem
          return res.status(404).send({message: 'Pedidos não encontrados.'});
      }
      return res.status(200).json({orders: order});//retorna o status e todos os pedidos
  } catch (e) {
      return next(e);   
  }
};

exports.deleteOrder = async function (req, res, next) {//funçao de deletar por id

    try {
        const { orderId } = req.params;
        const order = await orderService.findByIdAndDelete(orderId);//busca da validaçao do service
        if (!order) {//caso seja vazio retorna o erro e a mensagem 
            return res.status(404).send({message: 'Pedido não encontrado.'});
        }
        return res.status(200).send({message: 'Pedido deletado.'});//retorna o status e a mensagem de pedido deletado
    } catch (e) {
        return next(e);
    }
  };
