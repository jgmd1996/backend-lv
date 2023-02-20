const mongoose = require ('mongoose');

const orderSchema = new mongoose.Schema(
    {
        id: { type: String },
        description: { type: String, required: true, max: 200, min: 2},
        paymentMethod: { type: String, required: true, max: 200, min: 2},
        delivery:{ type: String, required: true, max: 200, min: 2},
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
        client: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
  },
  {
      versionKey: false
  }
)
module.exports = mongoose.model('Order', orderSchema);