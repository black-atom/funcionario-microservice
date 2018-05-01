const router = require('express').Router();
const authenticationMiddleware = require('./../middleware/authentication');

router.post('/login', authenticationMiddleware.login);
router.get('/validate', authenticationMiddleware.validate, (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') { 
    return(res.status(401).send('Invalid authorization token'));
  }
}, (req, res) => {
  const login = (req.headers && req.headers.authorization) ?
      req.user._doc : req.user;

  res.json(login)
});

module.exports = router;