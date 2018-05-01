const user = require('./../models/funcionario');
const jwt = require('jwt-then');
const config = require('./../utils/config');
const bcrypt = require('bcrypt-node');
const authConfig = require('../config/authConfig')();
const jwtExpress = require('express-jwt');



exports.login = (req, res, next) => {
    const { username , password } = req.body;

    user.findOne({'login.username': username}).then(funcionario => {
        console.log(funcionario);
            if(funcionario){
                bcrypt.compare(password, funcionario.login.password, (err, isMatch)=>{
  
                    if(isMatch === true){
                        // let login = {
                        //     username: funcionario.login.username,
                        // };
                        jwt.sign(funcionario, config.SECRET, {expiresIn: 60*60*12}).then(token =>{
                         
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

const jwtStrategy = jwtExpress({
  secret: authConfig.secret,
})

const apiKeyStrategy = (req, res, next) => {
  const api_key = req.header('apikey');

  user.findOne({'login.api_key': api_key}).then(funcionario => {
    if(funcionario){
      req.user = funcionario;
      next()
    } else {
      const error =  new Error('user not found');
      error.name = 'UnauthorizedError';
      next(error)
    }
  })
  .catch(() => {
    const error = new Error('Error processing api_key');
    error.name = 'UnauthorizedError';
    next(error);
  })
}

exports.validate = (req, res, next) => {
  const loginStrategy = (req.headers && req.headers.authorization) ?
    jwtStrategy : apiKeyStrategy;

  loginStrategy(req, res, next);
}