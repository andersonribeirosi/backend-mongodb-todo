const express = require('express');
const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');

const router = express.Router();

router.post('/', TaskValidation, TaskController.create);

module.exports = router;
