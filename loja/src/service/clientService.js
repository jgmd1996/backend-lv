const validate = require('validate.js');
const Client = require('../models/Client');
const BaseService = require("./baseService");

const schema = {

    name: {
        presence: { allowEmpty: false, message: '^Nome é obrigatório. ' },
        length: {
            maximum: 200,
            tooLong: '^Nome deve conter no máximo 200 caracteres. '
        }
    },
    email: {
        presence: { allowEmpty: false, message: '^Email é obrigatório. ' },
        length: {
            maximum: 200,
            tooLong: '^Email deve conter no máximo 200 caracteres. '
        }
    },
    telephone: {
        presence: { allowEmpty: false, message: '^Telefone é obrigatório. ' },
        length: {
            maximum: 200,
            tooLong: '^Telefone deve conter no máximo 200 caracteres. '
        }
    },
    address: {
        presence: { allowEmpty: false, message: '^Endereço é obrigatório. ' },
        length: {
            maximum: 200,
            tooLong: '^Endereço deve conter no máximo 200 caracteres. '
        }
    },
    dateOfBirth: {
        presence: { allowEmpty: false, message: '^Data de nascimento é obrigatório. ' },
        length: {
            maximum: 200,
            tooLong: '^Data de nascimento deve conter no máximo 200 caracteres. '
        }
    },
    sex: {
        presence: { allowEmpty: false, message: '^Sexo é obrigatório. ' },
        length: {
            maximum: 200,
            tooLong: '^Sexo deve conter no máximo 200 caracteres. '
        }
    },
    cpf: {
        presence: { allowEmpty: false, message: '^CPF é obrigatório. ' },
        length: {
            maximum: 200,
            tooLong: '^CPF deve conter no máximo 200 caracteres. '
        }
    },   
};

module.exports = class ClientService extends BaseService {

    constructor() {
        super(schema, Client);
    };

    async validation(client) {
        return super.validation(client);
    };

    async create(client) {
        const session = await super.getSession();

        try {
            let errors = await this.validation(client);

            if (errors) {
                const errorMessage = await this.buildErrorMessage(errors);
                return { error: errors, statusCode: 400, message: errorMessage };
            }
            const clientDb = new Client({ ...client });
            await session.startTransaction();
            let clientSaved = await super.save(clientDb, session);
            await session.commitTransaction();

            return { client: clientSaved, statusCode: 201 };

        } catch (e) {

            if (session.inTransaction()) {
                await session.abortTransaction();
            }

            throw e;
        } finally {
            session.endSession();
        }
    };

    async update(client) {
        const session = await super.getSession();
        
        try {
            let errors = await this.validation(client);

            const clientDb = await super.findById(client.id);

            if (!clientDb) {
                return { error: errors, statusCode: 400, message: 'Cliente não encontrado' };
            }

            let clientSaved = await super.save(client, session);

            return { client: clientSaved, statusCode: 200 };
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
                path: 'order'  
            }
        ];

        return await super.findPopulate({}, pathsValues);
    }
}
