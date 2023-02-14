const validate = require('validate.js');
const Client = require('../models/Client');
const BaseService = require("./baseService");

const schema = {//Aqui onde crio a validação do formulario de acordo com o model

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
            maximum: 99999999999,
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
            maximum: 99999999,
            tooLong: '^Data de nascimento deve conter no máximo 200 caracteres. '
        }
    },
    sex: {
        presence: { allowEmpty: false, message: '^Sexo é obrigatório. ' },
        length: {
            maximum: 50,
            tooLong: '^Sexo deve conter no máximo 200 caracteres. '
        }
    },
    cpf: {
        presence: { allowEmpty: false, message: '^CPF é obrigatório. ' },
        length: {
            maximum: 99999999999,
            tooLong: '^CPF deve conter no máximo 200 caracteres. '
        }
    } 
};

module.exports = class ClientService extends BaseService {

    constructor() {
        super(schema, Client);
    };

    async validation(client) {//aqui retorna o que foi validade se esta correto ou não
        return super.validation(client);
    };

    async create(client) {//aqui é criado o cliente
        const session = await super.getSession();

        try {
            let errors = await this.validation(client);//aqui atribuo cliente a erros

            if (errors) {//aqui válido se erross, for diferente de vazio então retorno o statusCode e mensagem de erro
                const errorMessage = await this.buildErrorMessage(errors);
                return { error: errors, statusCode: 400, message: errorMessage };
            }//apos validação, se for feita de maneira correta vai fazer o retorno de cliente saved e status code 201
            const clientDb = new Client({ ...client });
            await session.startTransaction();
            let clientSaved = await super.save(clientDb, session);//usada para acessar a classe pai e salvar.
            await session.commitTransaction();

            return { client: clientSaved, statusCode: 201 };//retorno

        } catch (e) {

            if (session.inTransaction()) {
                await session.abortTransaction();//em caso de erro session aborta transação
            }

            throw e;
        } finally {
            session.endSession();// em caso de erro da session finaliza 
        }
    };

    async update(client) {// aqui onde faço o atualizar cliente
        const session = await super.getSession();
        
        try {
            let errors = await this.validation(client);

            const clientDb = await super.findById(client.id);//aqui to buscando o cliente com o id,com a função do base service.

            if (!clientDb) {//se não for encontrado retorno o status code de erro e a mensagem
                return { error: errors, statusCode: 400, message: 'Cliente não encontrado' };//retorno em caso de erro
            }

            let clientSaved = await super.save(client, session);//usada para acessar a classe pai e salvar.

            return { client: clientSaved, statusCode: 200 };//retorno correto
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
        const pathsValues = [//aqui é para mostrar os compos, aqui no caso é de pedidos(order)
            {
                path: 'order'  
            }
        ];

        return await super.findPopulate({}, pathsValues);
    }
}




//service:
//E onde fica  a validação do código,onde fica a regras do sistema,tem intermediação entre o model e o controller.
