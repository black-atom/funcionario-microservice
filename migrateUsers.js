const Funcionarios = require('./models/funcionario');
const uuidv4 = require('uuid/v4')
 
const updateFuncionarios = async() => {
  try {
    const funcionarios = await Funcionarios.updateMany({}, { $set: { 'login.api_key': uuidv4() }});
    console.log('ok!')
  } catch (err) {
    console.log(err);
  }
}
 
updateFuncionarios();