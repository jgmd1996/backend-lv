const mongoose = require ('mongoose');

const orderSchema = new mongoose.Schema(
    {
        id: { type: String },
        amount: { type: Number, required: true, max: 1000, min: 1 },
        description: { type: String, required: true, max: 200, min: 2},
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
        client: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
        suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'suppliers' }],
  },
  {
      versionKey: false
  }
)
module.exports = mongoose.model('Order', orderSchema);
