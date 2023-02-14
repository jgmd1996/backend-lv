const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema(
  {
    id: { type: String },
    price: {type: Number, required: true, max: 1000, min: 1},
    description: {type: String, required: true, max: 200, min: 2},
    amount: {type: Number, required: true, max: 1000, min: 1},
    suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Suppliers' }],//ligação entre produtos e fornecedores
    order: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],//ligação entre produtos e fornecedores
  }
);

module.exports = mongoose.model('Products', productsSchema);//exporta o schema


//O model é um espelho das tabelas do banco de dados com seus atributos


//( new mongoose.Schema)gerencia o relacionamento entre dados, fornece a 
//validação de esquemas e é usado como tradutor entre objetos no código e a representação desses objetos no MongoDB.