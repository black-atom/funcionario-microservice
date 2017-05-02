const router = require('express').Router();
const authenticationMiddleware = require('./../middleware/authentication');

router.post('/login', authenticationMiddleware.signIn);

module.exports = router;