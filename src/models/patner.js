const mongoose = require('mongoose')

const patnerSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true,
        trim: true
    },
   
    product: {
        type: String,
        trim: true,
        required: true,
    },

    company_address: {
        type: String,
        trim: true,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },

    contact: {
        type: Number,
        validate: {
            validator: function(v) {
                return /d{11}/.test(v);
            },
            message: '{VALUE} is not a valid 11 digit number!'
        }
    },

})

const patner = mongoose.model('Patner', patnerSchema)

module.exports = patner