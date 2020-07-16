const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');
const MacAddressValidation = require('../middlewares/MacAddressValidation');

router.post('/', TaskValidation, TaskController.create);
router.put('/:id', TaskValidation, TaskController.update);
router.get('/:id', TaskController.showTask);
router.delete('/:id', TaskController.deleteTask);
router.put('/:id/:done', TaskController.done);
router.get('/filter/all', MacAddressValidation, TaskController.all);
router.get('/', MacAddressValidation, TaskController.late);

module.exports = router;
