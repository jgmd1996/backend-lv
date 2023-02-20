const mongoose = require('mongoose');

const suppliersSchema = new mongoose.Schema(
    {
        id: {type: String},
        socialDenomination: {type: String, required: true, max: 200, min: 2},
        address: {type: String, required: true, max: 200, min: 2},
        neighborhood: {type: String, required: true, max: 200, min: 2},
        city: {type: String, required: true, max: 200, min: 2},
        uf: {type: String, required: true, max: 2, min: 2},
        telephone: {type: Number, required: true, max: 99999999999, min: 10000000000},
        zipCode: {type: Number, required: true, max: 99999999, min: 10000000},
        email: {type: String, required: true, max: 200, min: 2},
        cnpj: {type: Number, required: true, max: 99999999999999, min: 10000000000000},
        lineOfBusinesscontact: {type: String, required: true, max: 200, min: 2},
        functions: {type: String, required: true, max: 200, min: 2},
        price: {type: Number, required: true, max: 1000, min: 1},
        product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product',required: true }],
    },
    {
        versionKey: false
    }
)
module.exports= mongoose.model("Supplier", suppliersSchema);