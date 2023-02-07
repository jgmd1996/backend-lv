const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: {type: String, required: true, maxLength: 200, minLength: 2},
    price: {type: Number, required: true, maxLength: 200, minLength: 1},
    description: {type: String, required: true, maxLength: 200, minLength: 2},
    amount: {type: Number, required: true, maxLength: 200, minLength: 2},
    client: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
    suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Suppliers' }],
  }
);

module.exports = mongoose.model('Products', productsSchema);

