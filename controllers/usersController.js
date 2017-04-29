const user = require ('./../models/user');
const bcrypt = require('bcrypt-node');
const salt = bcrypt.genSaltSync(10);


exports.getAllUsers = (req, res, next) => {
    user.find().then(foundUsers => {
        
        res.status(200)
        .json(foundUsers);

    }).catch(error => {
        next(error);
    })
}

exports.getOneUser = (req, res, next) => {
    user.findById(req.params.id).then(foundOneUser => {

        res.status(200)
        .json(foundOneUser);

    }).catch(error => {
        next(error);
    })
}

exports.registerUser = (req, res, next) => {
    const newUser = new user;
    newUser.login = req.body.login;
    newUser.badgeID = req.body.badgeID;
    newUser.address = req.body.address;
    newUser.contact = req.body.contact;
    if(req.body.roles && req.body.roles.length > 0){
        newUser.roles = req.body.roles;
    }
    newUser.save().then(createdUser => {
        res.status(200)
        .json(createdUser);

    }).catch(error => {
        next(error);
    })
}


exports.deleteUser = (req, res, next) => {
    user.remove({_id: req.params.id}).then(deletedUser => {
        
        res.status(200)
        .json({message: 'User was removed!', deletedUser});

    }).catch(error => {
        next(error);
    });
};

exports.updateUser = (req, res, next) => {
    user.findOne({_id: req.params.id}).then(foundUser => {
        if(req.body.login){
            foundUser.login.username = req.body.login.username || foundUser.login.username;
            if( req.body.login.password && req.body.login.password.length > 0 ){
                foundUser.login.password = req.body.login.password;
            }
        }
        foundUser.badgeID = req.body.badgeID || foundUser.badgeID;
        foundUser.address = req.body.address || foundUser.address;
        foundUser.contact = req.body.contact || foundUser.contact;
        foundUser.roles   = req.body.roles   || foundUser.roles;
        return foundUser.save();
    })
    .then(savedUser => {
        res.status(200).json(savedUser);
    })
    .catch(erro => {
        next(erro);
    });
};
