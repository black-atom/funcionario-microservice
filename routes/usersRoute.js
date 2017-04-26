const router = require('express').Router();
const usersController = require('./../controllers/usersController');

router.get('/api/users', usersController.getAllUsers);
router.get('/api/users/:id', usersController.getOneUser);
router.post('/api/users', usersController.registerUser);

module.exports = router;