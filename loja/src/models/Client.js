const mongoose = require ('mongoose');

const clientSchema = new mongoose.Schema(
    {
        id: { type: String },
        name: { type: String, required: true },
        email: { type: String, required: true },
        telephone: { type: Number, required: true },
        address: { type: String, required: true },
        dateOfBirth: { type: String, required: true },
        sex: { type: String, required: true },
        cpf: { type: Number, required: true },
        order: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
  },
  {
      versionKey: false
  }
)
module.exports = mongoose.model('Client', clientSchema);
