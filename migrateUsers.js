const Funcionarios = require('./models/funcionario');
const uuidv4 = require('uuid/v4');
const Promise = require('bluebird');
 
const updateFuncionarios = async() => {
  try {
    const funcionarios = await Funcionarios.find({})
    await Promise.resolve(funcionarios)
      .map(funcionario => {
        funcionario.login.api_key = uuidv4()
        return funcionario.save()
      })

    console.log('ok!')
  } catch (err) {
    console.log(err);
  }
}
 
updateFuncionarios();