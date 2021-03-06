const TaskModel = require('../model/TaskModel');
const { isPast } = require('date-fns');
const { findOne } = require('../model/TaskModel');

const TaskValidation = async (req, res, next) => {
  const { macaddress, title, description, when } = req.body;

  if (!macaddress) {
    return res.status(400).json({ error: 'Macaddress é obrigatório' });
  } else if (!title) {
    return res.status(400).json({ error: 'Título é obrigatório' });
  } else if (!description) {
    return res.status(400).json({ error: 'Descrição é obrigatória' });
  } else if (!when) {
    return res.status(400).json({ error: 'Data e Hora são obrigatórios' });
  } else if (isPast(new Date(when))) {
    return res.status(400).json({ error: 'Escolha uma Data e Hora futura' });
  } else {
    let exists;

    // Se houver id na requisição
    if (req.params.id) {
      exists = await TaskModel.findOne({
        _id: { $ne: req.params.id }, // $ne ignora o id da requisição, para comparar com as outras tarefas
        when: { $eq: new Date(when) },
        macaddress: { $in: macaddress },
      });
    } else {
      exists = await TaskModel.findOne({
        when: { $eq: new Date(when) },
        macaddress: { $in: macaddress },
      });
    }

    if (exists) {
      return res
        .status(400)
        .json({ error: 'Já existe uma tarefa para este dia e hora' });
    }
    next();
  }
};

module.exports = TaskValidation;
