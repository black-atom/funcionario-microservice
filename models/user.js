const mongoose = require('mongoose');
const _db = require('./_db');
const utilSchemas = require('./utilSchemas')

const UserSchema = new mongoose.Schema({
    login: 
    [{
       userName: {type: String, unique: true, required: [true, 'You need put your username']},
       password:{type: String, required: [true, 'You need put your password']},  
    }],

    roles: {
        type: 
        [{
            type: String, 
            enum: ['Adminstrador', 'Supervisor', 'Atendente']}
        ],
        default: ['Atendente']
    },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date},
    generalData:{ 
        type: [utilSchemas.generalData],
        required: [true, 'You need put your address and your contact information']
    }
    
},
    {
    versionKey: false
})

module.exports = _db.model('user', UserSchema);