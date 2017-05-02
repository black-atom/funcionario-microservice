const user = require('./../models/user');
const jwt = require('jsonwebtoken');
const config = require('./../utils/config');
const bcrypt = require('bcrypt-node');


exports.authVerification = (req, res, next) => {
    const token = req.get('x-access-token') || req.get('token');
    console.log(token);
    if(token){
        next();
    } else {
        res.status(403).json({message: 'You need a token  authentication'})
    }
}

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
                        login.token = jwt.sign(login, config.SECRET, {expiresIn: 60*60*12})
                        res.status(200).json(login); 
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