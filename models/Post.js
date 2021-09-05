const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    likes: [
        {
            admin: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'admin'
            }
        }
    ],
    comments: [
        {
            admin: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'admin'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model('post', PostSchema);