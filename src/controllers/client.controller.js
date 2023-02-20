const ClientService = require('../service/client.service');
let clientService = new ClientService();

exports.create = async function (req, res, next) {

  try {
     const clientSaved = await clientService.create(req.body);
    res.status(clientSaved.statusCode).json(clientSaved)
  } catch (e) {
      return next(e);
  }
};

exports.update = async function (req, res, next) {
   
  try {
      let client = {
          ...req.body
      };
      
      const clientSaved = await clientService.update(client);
      return res.status(clientSaved.statusCode).json(clientSaved);
  } catch (e) {
      return next(e);
  }
};

exports.findById = async function (req, res, next) {

  try {
      const { clientId } = req.params;
      const client = await clientService.findById(clientId);
      if (!client) {
          return res.status(404).send({message: 'Cliente não encontrado.'});
      }
      return res.status(200).json({client: client});
  } catch (e) {
      return next(e);
  }
};

exports.findByAll = async function (req, res, next) {
     
  try {
      const client = await clientService.findAll();
      if (!client || client.length === 0) {
          return res.status(404).send({message: 'Cliente não encontradas.'});
      }
      return res.status(200).json({clients: client});
  } catch (e) {
      return next(e);   
  }
};

exports.deleteClient = async function (req, res, next) {

    try {
        const { clientId } = req.params;
        const client = await clientService.findByIdAndDelete(clientId);
        if (!client) {
            return res.status(404).send({message: 'cliente não encontrado.'});
        }
        return res.status(200).send({message: 'cliente deletado.'});
    } catch (e) {
        return next(e);
    }
  };
