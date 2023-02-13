const OrderService = require('../service/orderService');
let orderService = new OrderService();

exports.create = async function (req, res, next) {

  try {
     const orderSaved = await orderService.create(req.body);
    res.status(orderSaved.statusCode).json(orderSaved)
  } catch (e) {
      return next(e);
  }
};

exports.update = async function (req, res, next) {
   
  try {
      let order = {
          ...req.body
      };
      
      const orderSaved = await orderService.update(order);
      return res.status(orderSaved.statusCode).json(orderSaved);
  } catch (e) {
      return next(e);
  }
};

exports.findById = async function (req, res, next) {

  try {
      const { orderId } = req.params;
      const order = await orderService.findById(orderId);
      if (!order) {
          return res.status(404).send({message: 'Pedido não encontrado.'});
      }
      return res.status(200).json({order: order});
  } catch (e) {
      return next(e);
  }
};

exports.findByAll = async function (req, res, next) {
     
  try {
      const order = await orderService.findAll();
      if (!order || order.length === 0) {
          return res.status(404).send({message: 'Pedidos não encontrados.'});
      }
      return res.status(200).json({orders: order});
  } catch (e) {
      return next(e);   
  }
};

exports.deleteOrder = async function (req, res, next) {

    try {
        const { orderId } = req.params;
        const order = await orderService.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).send({message: 'Pedido não encontrado.'});
        }
        return res.status(200).send({message: 'Pedido deletado.'});
    } catch (e) {
        return next(e);
    }
  };
