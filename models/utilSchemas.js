const mongoose = require('mongoose');
const address  = mongoose.Schema({
    street: {type: String, required: [true, "You need put your street!"]},
    number: {type: Number, required: [true, "You need put your number!"]},
    state: {type: String, required: [true, "You need put your state!"]},
    city: {type: String, required: [true, "You need put your city!"]},
    cep: {type: Number, required: [true, "You need put your CEP!"]},
})

const contact  = mongoose.Schema({
    email: {type: String, required: [true, "You need put your email adress!"]},
    tel: {type: Number, required: [true, "You need put your telephone number!"]},
})

module.exports = {
    address : address,
    contact: contact
}