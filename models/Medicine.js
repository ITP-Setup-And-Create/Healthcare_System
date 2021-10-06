const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    producer: {
        type: String,
        required: true
    },
    form: {
        type: String,
        required: true
    },
    type: {
        type: [String],
        required: true
    },
    ageGroup: {
        type: String,
        required: true
    },
    cost: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        default: 'https://i-cf65ch.gskstatic.com/content/dam/cf-consumer-healthcare/panadol/en_ie/ireland-products/panadol-tablets/MGK5158-GSK-Panadol-Tablets-455x455.png?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1463&q=80'
    }
});

module.exports = Medicine = mongoose.model('medicine', MedicineSchema);