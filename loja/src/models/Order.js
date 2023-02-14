const mongoose = require ('mongoose');

const orderSchema = new mongoose.Schema(
    {
        id: { type: String },
        amount: { type: Number, required: true, max: 1000, min: 1 },
        description: { type: String, required: true, max: 200, min: 2},
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
        client: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],//ligação entre pedido e cliente
        suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suppliers' }],//ligação entre pedido e fornecedor
  },
  {
      versionKey: false
  }
)
module.exports = mongoose.model('Order', orderSchema);//exporta o schema


//O model é um espelho das tabelas do banco de dados com seus atributos


//( new mongoose.Schema)gerencia o relacionamento entre dados, fornece a 
//validação de esquemas e é usado como tradutor entre objetos no código e a representação desses objetos no MongoDB.