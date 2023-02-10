const validate = require('validate.js');
const Order = require('../models/Order');
const BaseService = require("./baseService");

const schema = {

    amount: {
        presence: { allowEmpty: false, message: '^Quantidade é obrigatório. ' },
        length: {
            maximum: 200,
            tooLong: '^Quantidade deve conter no máximo 200 caracteres. '
        }
    },
    description: {
        presence: { allowEmpty: false, message: '^Descrição é obrigatório. ' },
        length: {
            maximum: 200,
            tooLong: '^Descrição deve conter no máximo 200 caracteres. '
        }
    }  
};

module.exports = class OrderService extends BaseService {

    constructor() {
        super(schema, Order);
    };

    async validation(Order) {
        return super.validation(Order);
    };

    async create(order) {
        const session = await super.getSession();

        try {
            let errors = await this.validation(order);

            if (errors) {
                const errorMessage = await this.buildErrorMessage(errors);
                return { error: errors, statusCode: 400, message: errorMessage };
            }
            const orderDb = new Order({ ...order });
            await session.startTransaction();
            let orderSaved = await super.save(orderDb, session);
            await session.commitTransaction();

            return { order: orderSaved, statusCode: 201 };

        } catch (e) {

            if (session.inTransaction()) {
                await session.abortTransaction();
            }

            throw e;
        } finally {
            session.endSession();
        }
    };

    async update(order) {
        const session = await super.getSession();
        
        try {
            let errors = await this.validation(order);

            const orderDb = await super.findById(order.id);

            if (!orderDb) {
                return { error: errors, statusCode: 400, message: 'Pedido não encontrado' };
            }

            let orderSaved = await super.save(order, session);

            return { order: orderSaved, statusCode: 200 };
        } catch (e) {

            if (session.inTransaction()) {
                await session.abortTransaction();
            }

            throw e;
        } finally {
            session.endSession();
        }
    };

    async findAll() {
        const pathsValues = [
            {
                path: 'products'  
            },
            {
                path: 'client'  
            }
        ];

        return await super.findPopulate({}, pathsValues);
    }
}