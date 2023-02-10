const mongoose = require ('mongoose');

const orderSchema = new mongoose.Schema(
    {
        id: { type: String },
        amount: { type: Number, required: true },
        description: { type: String, required: true },
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
        client: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
  },
  {
      versionKey: false
  }
)
module.exports = mongoose.model('Order', orderSchema);
