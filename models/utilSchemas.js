const mongoose = require('mongoose');
const enderecoSchema  = new mongoose.Schema({
    rua: {type: String, required: [true, "Entre com o nome da rua e numero"]},
    complemento: { type: String, default: "" },
    bairro: {type: String, required: [true, "Entre com o bairro"]},
    cidade: {type: String, required: [true, "Entre com a cidade"]},
    estado: {type: String, required: [true, "Entre com os dados do estado"]},
    ponto_referencia: { type: String, default: "" },
    cep: {type: String, required: [true, "Entre com o cep"]}
})

const contact  = mongoose.Schema({
    email: {type: String, required: [true, "You need put your email adress!"]},
    tel: {type: Number, required: [true, "You need put your telephone number!"]},
})

module.exports = {
     enderecoSchema,
    contact: contact
}