const user = require('./../models/user');
const jwt = require('jwt-then');
const config = require('./../utils/config');
const bcrypt = require('bcrypt-node');


exports.authVerification = (req, res, next) => {
    const token = req.get('x-access-token') || req.get('token');
    jwt.verify(token, config.SECRET).then(tokenVerified => {

        req.decoded = tokenVerified;
        next();

    }).catch(error =>{
        res.status(403).json(error);
    });
};

exports.signIn = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    user.findOne({'login.username': username}).then(connected => {
        console.log(connected);
            if(connected){
                bcrypt.compare(password, connected.login.password, (err, isMatch)=>{
  
                    if(isMatch === true){
                        let login = {
                            username: connected.login.username,
                        };
                        jwt.sign(login, config.SECRET, {expiresIn: 60*60*12}).then(generatedToken =>{
                          login.token = generatedToken;
                          res.status(200).json(login); 
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