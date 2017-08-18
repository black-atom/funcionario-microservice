const router = require('express').Router();
const funcionarioController = require('./../controllers/funcionarioController');

router.get('/api/funcionarios', funcionarioController.getAllFuncionarios);
router.get('/api/funcionarios/:id', funcionarioController.getOneFuncionario);
router.post('/api/funcionarios', funcionarioController.registerFuncionario);
router.delete('/api/funcionarios/:id', funcionarioController.deleteFuncionario);
router.put('/api/funcionarios/:id', funcionarioController.updateFuncionario);

module.exports = router;