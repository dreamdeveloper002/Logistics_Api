const mongoose = require('mongoose')

const track_order = new mongoose.Schema({
    product_ordered: {
        type: String,
        required: true,
        trim: true
    },

    pickup_adress: {
        type: String,
        required: true,
        trim: true 
    },

   tracking_number : {
        type: Number
   },

  
   
})

const tracker = mongoose.model('tracker', track_order)

module.exports = tracker