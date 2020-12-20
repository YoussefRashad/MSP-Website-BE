
const mongoose = require('mongoose');
const { default: validator } = require('validator');
const Validator = require('validator')

const feedbackSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error('the email is not valid')
            }
        }
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const feedbackModel = new mongoose.model('Feedback', feedbackSchema);

module.exports = feedbackModel