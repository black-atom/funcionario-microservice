const { prop, applySpec, path } = require('ramda');

const removeMask = value => value.replace(/\D+/g, '');
const removeMaskProp = propName => objeto => removeMask(prop(propName, objeto));
const contatoProp = propName => objeto => applySpec(contatoSpec)(prop(propName, objeto));
const enderecoProp = propName => objeto => applySpec(enderecoSpec)(prop(propName, objeto));

const funcionarioSpec = {
  nome: prop('nome'),
  rg: removeMaskProp('rg'),
  cpf: removeMaskProp('cpf'),
  contato: contatoProp('contato'),
  endereco: enderecoProp('endereco'),
  data_nasc: prop('data_nasc'),
  foto_url: prop('foto_url'),
  login: prop('login'),
  createdBy: prop('createdAt'),
  updatedBy: prop('updatedAt')
};
const contatoSpec = {
  nome: prop('nome'),
  telefone: removeMaskProp('telefone'),
  celular: removeMaskProp('celular'),
  observacao: prop('observacao'),
  email: prop('email')
};
const enderecoSpec = {
  cep: removeMaskProp('cep'),
  rua: prop('rua'),
  numero: prop('numero'),
  bairro: prop('bairro'),
  cidade: prop('cidade'),
  uf: prop('uf'),
  ponto_referencia: prop('ponto_referencia'),
  complemento: prop('complemento')
};

module.exports = applySpec(funcionarioSpec);
