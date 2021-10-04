const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
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