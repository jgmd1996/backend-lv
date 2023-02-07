const mongoose = require('mongoose');

const suppliersSchema = new mongoose.Schema(
    {
        id: {type: String},
        socialDenomination: {type: String, required: true, maxLength: 200, minLength: 2},
        address: {type: String, required: true, maxLength: 200, minLength: 2},
        neighborhood: {type: String, required: true, maxLength: 200, minLength: 2},
        city: {type: String, required: true, maxLength: 200, minLength: 2},
        uf: {type: String, required: true, maxLength: 200, minLength: 2},
        telephone: {type: Number, required: true, maxLength: 200, minLength: 2},
        ZipCode: {type: Number, required: true, maxLength: 200, minLength: 2},
        email: {type: String, required: true, maxLength: 200, minLength: 2},
        cnpj: {type: String, required: true, maxLength: 200, minLength: 2},
        lineOfBusinesscontact: {type: String, required: true, maxLength: 200, minLength: 2},
        functions: {type: String, required: true, maxLength: 200, minLength: 2},
        ProductName: {type: String, required: true, maxLength: 200, minLength: 2},
        price: {type: Number, required: true, maxLength: 200, minLength: 2},
        product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products',required: true }],
    },
    {
        versionKey: false
    }
)
module.exports= mongoose.model("Suppliers", suppliersSchema);