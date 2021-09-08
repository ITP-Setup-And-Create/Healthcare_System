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
    }
});

module.exports = Medicine = mongoose.model('medicine', MedicineSchema);