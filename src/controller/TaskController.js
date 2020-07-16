const TaskModel = require('../model/TaskModel');

const current = new Date();

class TaskController {
  async create(req, res) {
    const task = new TaskModel(req.body);
    await task
      .save()
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async update(req, res) {
    // new: true - para devolver os dados da tarefa atualizados
    await TaskModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
  // Filtrando pelo macaddress - $in (contido na requisição, se não for passado o mac, da erro) ou o $eq - tem a mesma função
  async all(req, res) {
    await TaskModel.find({ macaddress: { $in: req.body.macaddress } })
      .sort('when')
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async showTask(req, res) {
    await TaskModel.findById(req.params.id)
      .then((response) => {
        if (response) {
          return res.status(200).json(response);
        }
        return res.status(400).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async deleteTask(req, res) {
    // req.params.id (recupera o id na rota que foi chamada)
    await TaskModel.deleteOne({ _id: req.params.id })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async done(req, res) {
    await TaskModel.findByIdAndUpdate(
      { _id: req.params.id },
      { done: req.params.done },
      { new: true }
    )
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async late(req, res) {
    await TaskModel.find({
      when: { $lt: current }, // $lt verifica se a data e hora são iguais ou maiores da data atual(tarefas atrasadas)
      macaddress: { $in: req.body.macaddress }, // se o macaddress passado na url esta contido
    })
      .sort('when')
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
}

module.exports = new TaskController();
