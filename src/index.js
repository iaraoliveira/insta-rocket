const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// o express permite que lidemos com rotas, parametros e respostas
const app = express();

//aceita conexoes via websocket, que permite fazermos  comunicação em tempo real
const server = require('http').Server(app);
const io = require('socket.io')(server);

//conexao com o banco de dados
mongoose.connect(
    'mongodb+srv://semana:semana@cluster0-xyvn8.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

//repassar as informações do io para todas as rotas, 
//de modo que temos acesso a essa biblioteca de dentro de todos os controllers
app.use((req, res, next) => {
    req.io = io;

    next();
})

//permite que todos as urls, de diferentes IPs e servidores, possam acessar nosso backend
app.use(cors());

//cria uma rota para acessar arquivos estáticos, os quais fizemos upload
app.use('/files', express.statis(path.resolve(__dirname, '..', 'uploads', 'resized')));

//carrega o nosso arquivos de rotas, que usamos para declaras as rotas da nossa aplicação
app.use(require('./routes'));

app.listen(3333);