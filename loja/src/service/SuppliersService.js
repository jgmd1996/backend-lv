const validate = require('validate.js');
const Suppliers = require('../models/Suppliers');
const BaseService = require("./baseService");

const schema = {

    socialDenomination: {
        presence: { allowEmpty: false, message: '^Denominação social é obrigatório. ' },
        length: {
            maximum: 200,
            tooLong: '^Denominação social deve conter no máximo 200 caracteres. '
        }
    },
    address: {
        presence: { allowEmpty: false, message: '^Endereço é obrigatório. ' },
        length: {
            maximum: 200,
            tooLong: '^Endereço deve conter no máximo 200 caracteres. '
        }
    },
    neighborhood: {
        presence: { allowEmpty: false, message: '^Bairro é obrigatório. ' },
        length: {
            maximum: 200,
            tooLong: '^Bairro deve conter no máximo 200 caracteres. '
        }
    },
    city: {
        presence: { allowEmpty: false, message: '^Cidade é obrigatório. ' },
        length: {
            maximum: 200,
            tooLong: '^Cidade deve conter no máximo 200 caracteres. '
        }
    },
    uf: {
        presence: { allowEmpty: false, message: '^UF é obrigatório. ' },
        length: {
            maximum: 2,
            tooLong: '^UF deve conter no máximo 2 caracteres. '
        }
    },
    telephone: {
        presence: { allowEmpty: false, message: '^Telefone é obrigatório. ' },
        length: {
            maximum: 99999999999,
            tooLong: '^Telefone deve conter no máximo 10 caracteres. '
        }
    },
    zipCode: {
        presence: { allowEmpty: false, message: '^CEP é obrigatório. ' },
        length: {
            maximum: 99999999,
            tooLong: '^CEP deve conter no máximo 99999999 caracteres. '
        }
    },
    email: {
        presence: { allowEmpty: false, message: '^E-mail é obrigatório. ' },
        length: {
            maximum: 200,
            tooLong: '^E-mail deve conter no máximo 200 caracteres. '
        }
    },
    cnpj: {
        presence: { allowEmpty: false, message: '^CNPJ é obrigatório. ' },
        length: {
            maximum: 99999999999999,
            tooLong: '^CNPJ deve conter no máximo 99999999999999 caracteres. '
        }
    },
    lineOfBusinesscontact: {
        presence: { allowEmpty: false, message: '^Linha de negocios é obrigatório. ' },
        length: {
            maximum: 200,
            tooLong: '^Linha de negocios deve conter no máximo 200 caracteres. '
        }
    },
    functions: {
        presence: { allowEmpty: false, message: '^Função da empresa é obrigatório. ' },
        length: {
            maximum: 200,
            tooLong: '^Função da empresa deve conter no máximo 200 caracteres. '
        }
    },
    ProductName: {
        presence: { allowEmpty: false, message: '^Nome do produto é obrigatório. ' },
        length: {
            maximum: 200,
            tooLong: '^Nome do produto deve conter no máximo 200 caracteres. '
        }
    },
    price: {
        presence: { allowEmpty: false, message: '^Preço do produto é obrigatório. ' },
        length: {
            maximum: 1000,
            tooLong: '^Preço do produto deve conter no máximo 1000 caracteres. '
        }
    },
};

module.exports = class SuppliersService extends BaseService {

    constructor() {
        super(schema, Suppliers);
    };
    
    async validation(suppliers) {
        return super.validation(suppliers);
    };

    async create(suppliers) {
        const session = await super.getSession();

        try {
            let errors = await this.validation(suppliers);

            if (errors) {
                const errorMessage = await this.buildErrorMessage(errors);
                return { error: errors, statusCode: 400, message: errorMessage };
            }
            const suppliersDb = new Suppliers({ ...suppliers });
            await session.startTransaction();
            let suppliersSaved = await super.save(suppliersDb, session);
            await session.commitTransaction();

            return { suppliers: suppliersSaved, statusCode: 201 };

        } catch (e) {

            if (session.inTransaction()) {
                await session.abortTransaction();
            }

            throw e;
        } finally {
            session.endSession();
        }
    };

    async update(suppliers) {
        const session = await super.getSession();
        
        try {
            let errors = await this.validation(suppliers);

            const suppliersDb = await super.findById(suppliers.id);

            if (!suppliersDb) {
                return { error: errors, statusCode: 400, message: 'Fornecedor não encontrado' };
            }

            let suppliersSaved = await super.save(suppliers, session);

            return { suppliers: suppliersSaved, statusCode: 200 };
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
                path: 'product'  
            } 
        ];

        return await super.findPopulate({}, pathsValues);
    }
}
