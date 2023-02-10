const validate = require('validate.js');
const Products = require('../models/Product');
const BaseService = require("./baseService");

const schema = {

    name: {
        presence: { allowEmpty: false, message: '^Nome é obrigatório. ' },
        length: {
            maximum: 200,
            tooLong: '^Nome deve conter no máximo 200 caracteres. '
        }
    },
    price: {
        presence: { allowEmpty: false, message: '^Preço é obrigatório. ' },
        length: {
            maximum: 200,
            tooLong: '^Preço deve conter no máximo 200 caracteres. '
        }
    },
    description: {
        presence: { allowEmpty: false, message: '^Descrição é obrigatório. ' },
        length: {
            maximum: 200,
            tooLong: '^Descrição deve conter no máximo 200 caracteres. '
        }
    },
    amount: {
        presence: { allowEmpty: false, message: '^Quantidade é obrigatório. ' },
        length: {
            maximum: 200,
            tooLong: '^Quantidade deve conter no máximo 200 caracteres. '
        }
    },
    
};

module.exports = class ProductService extends BaseService {

    constructor() {
        super(schema, Products);
    };

    async validation(product) {
        return super.validation(product);
    };

    async create(product) {
        const session = await super.getSession();

        try {
            let errors = await this.validation(product);

            if (errors) {
                const errorMessage = await this.buildErrorMessage(errors);
                return { error: errors, statusCode: 400, message: errorMessage };
            }
            const productDb = new Products({ ...product });
            await session.startTransaction();
            let productSaved = await super.save(productDb, session);
            await session.commitTransaction();

            return { product: productSaved, statusCode: 201 };

        } catch (e) {

            if (session.inTransaction()) {
                await session.abortTransaction();
            }

            throw e;
        } finally {
            session.endSession();
        }
    };

    async update(product) {
        const session = await super.getSession();

        try {
            let errors = await this.validation(product);

            const productDb = await super.findById(product.id);

            if (!productDb) {
                return { error: errors, statusCode: 400, message: 'Produto não encontrado' };
            }

            let productSaved = await super.save(product, session);

            return { product: productSaved, statusCode: 200 };
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
                path: 'suppliers'
            },
            {
                path: 'order'  
            }
        ];

        return await super.findPopulate({}, pathsValues);
    }
}


