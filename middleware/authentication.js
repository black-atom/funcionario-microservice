const user = require('./../models/funcionario');
const jwt = require('jwt-then');
const config = require('./../utils/config');
const bcrypt = require('bcrypt-node');
const authConfig = require('../config/authConfig');

exports.authVerification = (req, res, next) => {
    const token = req.get('x-access-token') || req.get('token');
    if(authConfig("test").bypass){
        req.decoded = "tokenVerified";
        next();
    }else{
        jwt.verify(token, config.SECRET).then(tokenVerified => {

            req.decoded = tokenVerified;
            next();

        }).catch(error =>{
            res.status(403).json(error);
        });
    }
};

exports.signIn = (req, res, next) => {
    const { username , password } = req.body;

    user.findOne({'login.username': username}).then(funcionario => {
        console.log(funcionario);
            if(funcionario){
                bcrypt.compare(password, funcionario.login.password, (err, isMatch)=>{
  
                    if(isMatch === true){
                        let login = {
                            username: funcionario.login.username,
                        };
                        jwt.sign(login, config.SECRET, {expiresIn: 60*60*12}).then(token =>{
                         
                        res.status(200).json({
                              funcionario,
                              token
                          }); 

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