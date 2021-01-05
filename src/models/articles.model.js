
const mongoose = require('mongoose')

const articlesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: Buffer,
        // required: true
    },
    feature: {
        type: Boolean,
        default: false
    },
    comments:{
        type: [{ name: String, image: String, title: String, comment: String,  
                rate: Number, evaluate: Number, date: String  }],
        default: []
    }
}, {
    timestamps: true
});

const articlesModel = new mongoose.model('Article', articlesSchema);

module.exports = articlesModel;