
const mongoose = require('mongoose')
const validator = require('validator')

const adminSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim:true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error('email is not valid')
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength:8
    }
},{
    timestamps: true
});

const adminModel = new mongoose.model('Admin', adminSchema)

module.exports = adminModel;