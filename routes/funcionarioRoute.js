const router = require('express').Router();
const funcionarioController = require('./../controllers/funcionarioController');
const rolesMiddleware = require('../middleware/roleMiddleware');

router.get('/api/funcionarios', rolesMiddleware(['all']), funcionarioController.getAllFuncionarios);
router.get('/api/funcionarios/:id',rolesMiddleware(['all']), funcionarioController.getOneFuncionario);
router.post('/api/funcionarios', rolesMiddleware(['cadastro', 'administrador', 'tecnica']), funcionarioController.registerFuncionario);
router.delete('/api/funcionarios/:id', rolesMiddleware(['cadastro', 'administrador', 'tecnica']), funcionarioController.deleteFuncionario);
router.put('/api/funcionarios/:id', rolesMiddleware(['cadastro', 'administrador', 'tecnica']), funcionarioController.updateFuncionario);

module.exports = router;