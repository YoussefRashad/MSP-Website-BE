
const mongoose  = require('mongoose')
const validator = require('validator')
const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
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
        minlength:6
    },
    quote: {
        type: String,
        required: true,
        trim: true
    },
    season: {
        type: String,
        required: true,
        trim: true
    },
    feature: {
        type: Boolean,
        default: false
    },
    linkedIn:{
        type: String,
        required: true,
        trim: true
    },
    privilage: {
        /*
            postionType: president/HB/board/member
            section:     technical/operational/marketing (Not Requried [PM, President ...])
            committee:   DataScience
        */
        positionType: {
            type: String,
            required: true,
            trim: true,
            validate(val){
                const types = ['president', 'high board', 'board', 'member', 'other']
                if(!types.includes(val.toLowerCase())){
                    throw new Error()
                }
            }
        },
        section: {
            type: String,
            required: true,
            trim: true,
            validate(val) {
                const sections = ['technical', 'operational', 'marketing', 'other']
                if (!sections.includes(val.toLowerCase())) {
                    throw new Error()
                }
            }
        },
        committee: {
            type: String,
            default: 'other',
            trim: true,
            validate(val) {
                const sections = {
                    technical : ['prepartion', 'flutter', 'game development', 'data science'], 
                    operational : ['human resources', 'quality assurance', 'logistics'],
                    marketing: ['graphic design', 'photography & video production', 'digital marketing']
                }
                if ((!sections.technical.includes(val.toLowerCase()))){
                    if ((!sections.operational.includes(val.toLowerCase()))){
                        if ((!sections.marketing.includes(val.toLowerCase()))){
                            if ((val !== "other")){
                                throw new Error()
                            }
                        }
                    }
                }
            }
        }
    },
    tokens:[{
        token: {
            type: String,
            required: true
        }
    }],
    image: {
        type: String,
        required: true,
    }
},{
    timestamps: true
});

// to hide some information
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}


// find by email and password
userSchema.statics.findByCredential = async (email, password)=>{
    const user = await userModel.findOne({email})
    if (!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

// generate authontication token 
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'thisismytokensignaturetoken')
    user.tokens = [...user.tokens, { token }]
    await user.save()
    return token
}

// convert text plain into hashed password 
userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})


const userModel = new mongoose.model('User', userSchema)

module.exports = userModel;