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
        CPF: { type: Number, required: true },
        product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
  },
  {
      versionKey: false
  }
)
module.exports = mongoose.model('Client', clientSchema);
