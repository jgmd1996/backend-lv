const validate = require('validate.js');
const Order = require('../models/Order');
const BaseService = require("./baseService");

const schema = {//Aqui onde crio a validação do formulario de acordo com o model

    amount: {
        presence: { allowEmpty: false, message: '^Quantidade é obrigatório. ' },
        length: {
            maximum: 1000,
            tooLong: '^Quantidade deve conter de 1 a 1000 caracteres. '
        }
    },
    description: {
        presence: { allowEmpty: false, message: '^Descrição é obrigatório. ' },
        length: {
            maximum: 200,
            tooLong: '^Descrição deve conter no máximo 200 caracteres. '
        }
    }, client: {
        presence: { allowEmpty: false, message: '^Cliente é obrigatório. ' },
        length: {
            maximum: 1,
            tooLong: '^ Deve conter no máximo 1 cliente. '
        }
    }, products: {
        presence: { allowEmpty: false, message: '^Produtos é obrigatório. ' },//aqui do produto eu consigo pegar o nome do produto
    }
};

module.exports = class OrderService extends BaseService {

    constructor() {
        super(schema, Order);
    };

    async validation(Order) {//aqui retorna o que foi validade se esta correto ou não
        return super.validation(Order);
    };

    async create(order) {//aqui é criado o pedido
        const session = await super.getSession();

        try {
            let errors = await this.validation(order);//aqui atribuo pedido a erros

            if (errors) {//aqui válido se erross, for diferente de vazio então retorno o statusCode e mensagem de erro
                const errorMessage = await this.buildErrorMessage(errors);
                return { error: errors, statusCode: 400, message: errorMessage };
            }//apos validação, se for feita de maneira correta vai fazer o retorno de pedido saved e status code 201
            const orderDb = new Order({ ...order });
            await session.startTransaction();
            let orderSaved = await super.save(orderDb, session);//usada para acessar a classe pai e salvar.
            await session.commitTransaction();

            return { order: orderSaved, statusCode: 201 };//retorno

        } catch (e) {

            if (session.inTransaction()) {
                await session.abortTransaction();//em caso de erro session aborta transação
            }

            throw e;
        } finally {
            session.endSession();// em caso de erro da session finaliza 
        }
    };

    async update(order) {// aqui onde faço o atualizar pedido
        const session = await super.getSession();

        try {
            let errors = await this.validation(order);

            const orderDb = await super.findById(order.id);//aqui to buscando o pedido com o id,com a função do base service.

            if (!orderDb) {//se não for encontrado retorno o status code de erro e a mensagem
                return { error: errors, statusCode: 400, message: 'Pedido não encontrado' };//retorno em caso de erro
            }

            let orderSaved = await super.save(order, session);//usada para acessar a classe pai e salvar.

            return { order: orderSaved, statusCode: 200 };//retorno correto
        } catch (e) {

            if (session.inTransaction()) {
                await session.abortTransaction();//em caso de erro session aborta transação
            }

            throw e;
        } finally {
            session.endSession();// em caso de erro da session finaliza 
        }
    };

    async findAll() {//aqui e para busca todos
        const pathsValues = [
            {
                path: 'products',
                populate: [{ path: 'suppliers' }]//aqui e para ficar visivel o objeto todo e não so o id
            },
            {
                path: 'client'
            }
        ];
        return await super.findPopulate({}, pathsValues);
    }
}




//service:
//E onde fica  a validação do código,onde fica a regras do sistema,tem intermediação entre o model e o controller.