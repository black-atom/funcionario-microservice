const user = require ('./../models/user');

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
        console.log(error);
        next(error);
    })
}