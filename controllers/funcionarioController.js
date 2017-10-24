const Funcionarios = require ('./../models/funcionario.js');
const bcrypt = require('bcrypt-node');
const salt = bcrypt.genSaltSync(10);
const { prop } = require("ramda");


const getAllFuncionarios = (req, res, next) => {
    console.log(req.decoded);
    Funcionarios.find().then(foundUsers => {
        
        res.status(200)
        .json(foundUsers);

    }).catch(error => {
        next(error);
    })
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
    
    const funcionario = prop("body", req);
    
    const newFuncionario = new Funcionarios(funcionario);
    
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
    const funcionario = prop("body", req);

    Funcionarios.findById(id)
    .then(foundFunc => {
        return foundFunc.save(funcionario)
    })
    //Funcionarios.findByIdAndUpdate(id, funcionario, {safe: false, new: true})
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