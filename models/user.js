const mongoose = require('mongoose');
const _db = require('./_db');
const utilSchemas = require('./utilSchemas')
const bcrypt = require('bcrypt-node');
const salt = bcrypt.genSaltSync(10);
const timestamps = require('mongoose-timestamp');


const UserSchema = new mongoose.Schema({
        login: {
        username: {
            type: String, 
            required: [true, 'You need put your username']},
        password:{
            type: String, 
            required: [true, 'You need put your password'], 
            set: (v) => bcrypt.hashSync(v, salt)},  
        },
        address: {
            type: utilSchemas.address, 
            required: [true, "Entre com o endereco do usuario"]
        },
        cpf: {
            type: String, 
            required: [true, "Entre com o cpf do usuario"]
        },
        rg: {
            type: string, 
            required: [true, "Entre com o rg do usuario"]
        },
        tel1: {
            type: string, 
            required: [true, "Entre com o rg do usuario"]
        },
        tel2: {
            type: string, 
            default: ""
        },
        email: {
            type: string, 
            required: [true, "Entre com o email do funcionario"]
        },
        habilitacao: {
            type: {
                numero: {
                    type: string, 
                    default: ""
                },
                validade: {
                    type: string, 
                    default: ""
                },
            }
        },
        tipo: {
            type: [{
                type: String, 
                enum: ['tecnico', 'tecnica', 'administrador'],
            }],
            default: 'tecnico'
        }
    },
    {
        versionKey: false
    });


UserSchema.plugin(timestamps);

module.exports = _db.model('funcionarios', UserSchema);