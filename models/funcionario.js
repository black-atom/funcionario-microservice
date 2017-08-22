const mongoose = require('mongoose');
const _db = require('./_db');
const utilSchemas = require('./utilSchemas')
const bcrypt = require('bcrypt-node');
const salt = bcrypt.genSaltSync(10);
const timestamps = require('mongoose-timestamp');


const UserSchema = new mongoose.Schema({
        nome: {
            type: String, 
            required: [true, "Entre com o nome do usuario"]
        },
        photo_url: {
            type: String, 
            default: ""
        },
        login: {
            username: {
                type: String, 
                required: [true, 'You need put your username']},
            password:{
                type: String, 
                required: [true, 'You need put your password'], 
                set: (v) => bcrypt.hashSync(v, salt)
            },  
        },
        endereco: {
            type: utilSchemas.enderecoSchema, 
            required: [true, "Entre com o endereco do usuario"]
        },
        cpf: {
            type: String, 
            required: [true, "Entre com o cpf do usuario"]
        },
        rg: {
            type: String, 
            required: [true, "Entre com o rg do usuario"]
        },
        telefone: {
            type: String, 
            required: [true, "Entre com o telefone do usuário"]
        },
        celular: {
            type: String, 
            default: ""
        },
        email: {
            type: String, 
            required: [false, "Entre com o email do funcionario"],
            default: ""
        },
        habilitacao: {
            type: {
                numero: {
                    type: String, 
                    default: ""
                },
                validade: {
                    type: Date, 
                    default: null
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