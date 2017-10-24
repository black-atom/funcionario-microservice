const mongoose = require('mongoose');
const _db = require('./_db');
const utilSchemas = require('./utilSchemas')
const bcrypt = require('bcrypt-node');
const salt = bcrypt.genSaltSync(10);
const timestamps = require('mongoose-timestamp');
const userAudit = require('mongoose-useraudit-plugin');

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "É necessário informar o nome"]
    },
    cpf: {
        type: String,
        required: [true, 'É necessário informar o CPF']
    },
    rg: {
        type: String,
        required: [true, 'É necessário informar o RG']
    },
    data_nasc: {
        type: String,
        required: [true, "É necessário informar o nome"]
    },
    foto_url: {
        type: String,
        default: ""
    },
    login: {
        username: {
            type: String,
            required: [true, 'É necessário informar o usuário']
        },
        password: {
            type: String,
            required: [true, 'É necessário informar a senha'],
            set: (v) => bcrypt.hashSync(v, salt)
        },
        tipo: {
            type: [{
                type: String,
                enum: ['administrador', 'tecnica', 'tecnico', 'suporte'],
            }],
            default: 'tecnico'
        }
    },
    endereco: {
        type: utilSchemas.enderecoSchema,
        required: [true, 'É necessário informar o endereço']
    },
    contato: {
        type: utilSchemas.contatoSchema,
        required: [true, 'É necessário informar o contato']
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

},
    {
        versionKey: false
    });

UserSchema.pre('save', function(next) {
    let user = this;
    console.log(this.login.password)
    console.log(user.isModified('login.password'))
    if (!user.isModified('login.password')) return next();

    try {
        console.log(user)
        user.login.password = bcrypt.hashSync(user.login.password, salt)
    }
    catch (err) {
        next(err)
    } 
});

/*UserSchema.pre('update', function(next) {
    let user = this;
    console.log(user.isModified('login.password'))
    if (!user.isModified('login.password')) return next();

    try {
        console.log(user)
        user.login.password = bcrypt.hashSync(user.login.password, salt)
    }
    catch (err) {
        next(err)
    } 

});*/


UserSchema.plugin(timestamps);
UserSchema.plugin(userAudit);

module.exports = _db.model('funcionarios', UserSchema);