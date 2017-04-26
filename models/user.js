const mongoose = require('mongoose');
const _db = require('./_db');
const utilSchemas = require('./utilSchemas')

const UserSchema = new mongoose.Schema({
    login: {
       username: {type: String, required: [true, 'You need put your username']},
       password:{type: String, required: [true, 'You need put your password']},  
    },
    badgeID: {
        type: String,
        required: [true, 'You need put your badge ID']
    },
    address: {
        type: utilSchemas.address, 
        required: [true, "You must enter the address!"]
    },
    contact: {
        type: utilSchemas.contact,
        required: [true, "The contact information of the client must be entered!"]
    },
    roles: {type: [{
        type: String, 
        enum: ['Adminstrador', 'Supervisor', 'Atendente'],
    }],
        default: 'Atendente'
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
  },
    {
    versionKey: false
})

module.exports = _db.model('user', UserSchema);