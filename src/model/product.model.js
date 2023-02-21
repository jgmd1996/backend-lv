const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: {type: String, required: true, max: 200, min: 2},
    price: {type: Number, required: true, max: 1000, min: 1},
    description: {type: String, required: true, max: 200, min: 2},
    amount: {type: Number, required: true, max: 1000, min: 1},
    suppliers: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    order: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  }
);

module.exports = mongoose.model('Product', productsSchema);