const ClientService = require('../service/clientService');
let clientService = new ClientService();

exports.create = async function (req, res, next) {//funçao de criar com a ajuda de service 

  try {
     const clientSaved = await clientService.create(req.body);//requisitando o corpo
    res.status(clientSaved.statusCode).json(clientSaved)//aqui fica a resposta de acordo com o que o service me traz no corpo da requiseição, seria os codigos http em caso de erro a mensagem
  } catch (e) {
      return next(e);
  }
};

exports.update = async function (req, res, next) {//aqui fica a função de atualizar
   
  try {
      let client = {
          ...req.body
      };
      
      const clientSaved = await clientService.update(client);//requisitando o corpo
      return res.status(clientSaved.statusCode).json(clientSaved);//aqui fica a resposta de acordo com o que o service me traz no corpo da requiseição, seria os codigos http em caso de erro a mensagem
  } catch (e) {
      return next(e);
  }
};

exports.findById = async function (req, res, next) {//função de busca por id

  try {
      const { clientId } = req.params;//requisitando o corpo pelo id
      const client = await clientService.findById(clientId);
      if (!client) {//se for diferente de vazio retorno o status 404  e a mensagem
          return res.status(404).send({message: 'Cliente não encontrado.'});
      }
      return res.status(200).json({client: client});//em caso de achar retorna o status e o corpo da requisição
  } catch (e) {
      return next(e);
  }
};

exports.findByAll = async function (req, res, next) {//funçao de buscar todos
     
  try {
      const client = await clientService.findAll();
      if (!client || client.length === 0) {// validação se for diferente de vazio ou igual a 0 ele retorna o erro e a mensagem
          return res.status(404).send({message: 'Cliente não encontradas.'});
      }
      return res.status(200).json({clients: client});//retorna o status e todos os clientes
  } catch (e) {
      return next(e);   
  }
};

exports.deleteClient = async function (req, res, next) {//funçao de deletar por id

    try {
        const { clientId } = req.params;
        const client = await clientService.findByIdAndDelete(clientId);//busca da validaçao do service
        if (!client) {//caso seja vazio retorna o erro e a mensagem 
            return res.status(404).send({message: 'cliente não encontrado.'});
        }
        return res.status(200).send({message: 'cliente deletado.'});//retorna o status e a mensagem de pedido deletado
    } catch (e) {
        return next(e);
    }
  };
