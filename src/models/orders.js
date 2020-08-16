const mongoose = require('mongoose')

const users_order = new mongoose.Schema({
    product_ordered: {
        type: String,
        required: true,
        trim: true
    },

    ordered_date : {
        type : Date,
        default: Date.now
    },

    pickup_adress: {
        type: String,
        required: true,
        trim: true 
    },
   
    email: {
        type: String,
        required: true,
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
                return /d{10}/.test(v);
            },
            message: '{VALUE} is not a valid 11 digit number!'
        }
    },
    
   
})

const oder = mongoose.model('Orders', users_order)

module.exports = oder