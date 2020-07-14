const express = require('express');
const server = express();
const port = 3000;

server.use(express.json());

const TaskRoutes = require('./src/routes/TaskRoutes');

server.use('/task', TaskRoutes);
// server.get('/teste', (req, res) => {
//   res.send('Tudo certo com nossa API');
// });

server.listen(port, () => {
  console.log('API Started! Escutando na porta: ' + port);
});
