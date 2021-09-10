const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    medicine: {
        type: mongoose.Schema.Types.String,
        ref: 'medicine'
    },
    quantity: {
        type: Number,
        default: 1
    }
});

module.exports = Cart = mongoose.model('cart', CartSchema);