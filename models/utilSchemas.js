const mongoose = require('mongoose');

const enderecoSchema  = new mongoose.Schema({
    rua: {
        type: String, 
        required: [true, 'É necessário informar a rua']
    },
    numero: {
        type: String, 
        required: [true, 'É necessário informar a numero']
    },
    complemento: { 
        type: String, 
        default: '' 
    },
    bairro: {
        type: String, 
        required: [true, 'É necessário informar o bairro']
    },
    cidade: {
        type: String, 
        required: [true, 'É necessário informar a cidade']
    },
    uf: {
        type: String, 
        required: [true, 'É necessário informar o estado']
    },
    ponto_referencia: { 
        type: String, 
        default: '' 
    },
    cep: {
        type: String, 
        required: [true, 'É necessário informar o CEP']
    }
})

const contatoSchema  = new mongoose.Schema({
    nome: {
        type: String, 
        required: [true, 'É necessário informar o nome!']
    },
    observacao: {
        type: String, 
        required: false
    },
    telefone: {
        type: String, 
        required: [true, 'É necessário informar o telefone!']
    },
    celular: {
        type: String, 
        required: false, 
        default: ''
    },
    email: {
        type: String, 
        required: false, 
        default: ''
    },


})

module.exports = {
     enderecoSchema,
     contatoSchema
}