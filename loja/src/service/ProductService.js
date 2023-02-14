const validate = require('validate.js');
const Products = require('../models/Product');
const BaseService = require("./baseService");

const schema = {//Aqui onde crio a validação do formulario de acordo com o model

    price: {
        presence: { allowEmpty: false, message: '^Preço é obrigatório. ' },
        length: {
            maximum: 1000,
            tooLong: '^Preço deve conter no máximo 1000 caracteres. '
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
            maximum: 1000,
            tooLong: '^Quantidade deve conter no máximo 1000 caracteres. '
        }
    }, suppliers: {
        presence: { allowEmpty: false, message: '^Fornecedor é obrigatório. ' },
        length: {
            maximum: 1,
            tooLong: '^ Deve conter no máximo 1 fornecedor. '
        }
    },
    
};

module.exports = class ProductService extends BaseService {

    constructor() {
        super(schema, Products);
    };

    async validation(product) {//aqui retorna o que foi validade se esta correto ou não
        return super.validation(product);
    };

    async create(product) {//aqui é criado o produto
        const session = await super.getSession();

        try {
            let errors = await this.validation(product);//aqui atribuo produto a erros

            if (errors) {//aqui válido se erross, for diferente de vazio então retorno o statusCode e mensagem de erro
                const errorMessage = await this.buildErrorMessage(errors);
                return { error: errors, statusCode: 400, message: errorMessage };
            }//apos validação, se for feita de maneira correta vai fazer o retorno de produto saved e status code 201
            const productDb = new Products({ ...product });
            await session.startTransaction();
            let productSaved = await super.save(productDb, session);//usada para acessar a classe pai e salvar.
            await session.commitTransaction();

            return { product: productSaved, statusCode: 201 };//retorno

        } catch (e) {

            if (session.inTransaction()) {
                await session.abortTransaction();//em caso de erro session aborta transação
            }

            throw e;
        } finally {
            session.endSession();// em caso de erro da session finaliza 
        }
    };

    async update(product) {// aqui onde faço o atualizar produto
        const session = await super.getSession();

        try {
            let errors = await this.validation(product);

            const productDb = await super.findById(product.id);//aqui to buscando o produto com o id,com a função do base service.

            if (!productDb) {//se não for encontrado retorno o status code de erro e a mensagem
                return { error: errors, statusCode: 400, message: 'Produto não encontrado' };//retorno em caso de erro
            }

            let productSaved = await super.save(product, session);//usada para acessar a classe pai e salvar.

            return { product: productSaved, statusCode: 200 };//retorno correto
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
                path: 'suppliers'
            },
            {
                path: 'order'  
            }
        ];

        return await super.findPopulate({}, pathsValues);
    }
}




//service:
//E onde fica  a validação do código,onde fica a regras do sistema,tem intermediação entre o model e o controller.
