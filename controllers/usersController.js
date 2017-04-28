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

exports.signIn = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    user.findOne({'login.username': username}).then(connected => {
        bcrypt.compare(password, connected.login.password, (err, isMatch)=>{
            if(isMatch){
                res.status(200).json(connected);
            }
            else{
                res.status(403).json('User or password do not match');
            }});

        }).catch(error => { 
            next(error);
    });
};

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
        console.log(foundUser);

        Object.assign(foundUser, req.body).save().then(updatedUser => {
                console.log(updatedUser);
                  res.status(200).json({message: 'The user was updated', updatedUser});

        });
    });
};
   