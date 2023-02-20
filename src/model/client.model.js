const mongoose = require ('mongoose');

const clientSchema = new mongoose.Schema(
    {
        id: { type: String },
        name: { type: String, required: true,max: 200, min: 2  },
        email: { type: String, required: true,max: 200, min: 2  },
        telephone: { type: Number, required: true,max: 99999999999, min: 10000000000  },
        address: { type: String, required: true,max: 200, min: 2  },
        dateOfBirth: { type: Number, required: true,max: 99999999, min: 10000000  },
        sex: { type: String, required: true,max: 50, min: 2  },
        cpf: { type: Number, required: true,max: 99999999999, min: 10000000000  },
        order: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
  },
  {
      versionKey: false
  }
)
module.exports = mongoose.model('Client', clientSchema);



