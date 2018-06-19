const Funcionarios = require ('./../models/funcionario.js');
const bcrypt = require('bcrypt-node');
const salt = bcrypt.genSaltSync(10);
const { prop } = require('ramda');
const mergeDeep = require('../helpers/mergeDeep');
const formatFuncionario = require('../utils/funcionarioSpec');
const Promise =  require('bluebird');

const getAllFuncionarios = async(req, res, next) => {

  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip); 

  let query = { ...req.query };
  delete query.skip;
  delete query.limit;

  for(key in query){
      query = {
      ...query,
      [key]: new RegExp(''+ query[key] +'', "i")
    }
  }
  
  try {
      const funcionarios = await Funcionarios.find(query, {_id: 1, nome: 1, cpf: 1, rg: 1, "login.username": 1, "login.tipo": 1, foto_url: 1, ativo: 1 }).skip(skip).limit(limit).sort( { nome: 1 });
      const count = await Funcionarios.find(query).count();
      res.send({ funcionarios, count });
  } catch (error) {
        next(error)
  }

}

const getOneFuncionario = (req, res, next) => {
    Funcionarios.findById(req.params.id).then(foundOneUser => {

        res.status(200)
        .json(foundOneUser);

    }).catch(error => {
        next(error);
    })
}

const registerFuncionario = (req, res, next) => {
    
    const funcionario = formatFuncionario(req.body);
    
    const newFuncionario = new Funcionarios({
      ...funcionario,
      login: {
        ...funcionario.login, api_key: ''
      }});
    
    newFuncionario.save().then(createdUser => {
        res.status(200)
        .json(createdUser);

    }).catch(error => {
        next(error);
    })
}


const deleteFuncionario = (req, res, next) => {
    Funcionarios.remove({_id: req.params.id}).then(deletedUser => {
        
        res.status(200)
        .json({message: 'Funcionarios was removed!', deletedUser});

    }).catch(error => {
        next(error);
    });
};

const updateFuncionario = (req, res, next) => {

    const id = prop("id", req.params);
    const funcionario = formatFuncionario(req.body);
    Funcionarios.findById(id)
    .then(foundFunc => {
        mergeDeep(foundFunc, funcionario)
        return foundFunc.save()
    })
    .then(savedUser => {
        res.status(200).json(savedUser);
    })
    .catch(erro => {
        next(erro);
    });
};

module.exports = {
    getAllFuncionarios,
    getOneFuncionario,
    registerFuncionario,
    deleteFuncionario,
    updateFuncionario
}