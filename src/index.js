const express = require('express');

const app = express();

//intercepta um requisição para a rota passada por parâmetro
// @params rota, middleware
app.get('/', (req, res) => {
    return res.send(`eae ${req.query.name}`);
});

app.listen(3333);