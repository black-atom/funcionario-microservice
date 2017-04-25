const router = require('express').Router();
const usersController = require('./../controllers/usersController');

router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getOneUser);

module.exports = router