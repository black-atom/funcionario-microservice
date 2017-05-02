const user = require('./../models/user');
const jwt = require('jwt-then');
const config = require('./../utils/config');
const bcrypt = require('bcrypt-node');


exports.authVerification = (req, res, next) => {
    const token = req.get('x-access-token') || req.get('token');
    jwt.verify(token, config.SECRET).then(tokenVerified => {

        res.status(200)
        .json(tokenVerified);

    }).catch(error =>{
        next(error);
    })
};

exports.signIn = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    user.findOne({'login.username': username}).then(connected => {
            if(connected){
                bcrypt.compare(password, connected.login.password, (err, isMatch)=>{
  
                    if(isMatch === true){
                        let login = {
                            username: connected.login.username,
                            password: connected.login.password
                        };
                        jwt.sign(login, config.SECRET, {expiresIn: 60*60*12}).then(validation => {
                             res.status(200).json({login, validation}); 
                        })
                    }
                    else{
                        res.status(403).json('User or password do not match');
                    }});
            }else {
                res.status(403).json('User or password do not match');
            }
        }).catch(error => { 
            next(error);
    });
};