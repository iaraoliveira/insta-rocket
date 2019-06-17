//imports

const express = require('express');
// o multer permite que o express entenda as requisiçõe com multipart form data, ou seja, arquivos fisicos junto com campos de texto
const multer = require('multer');
const uploadConfig = require('./config/upload');

const PostController = require('./controllers/PostController.js');
const LikeController = require('./controllers/LikeController.js');

const routes = new express.Router();
const upload = uploadConfig();

/**
 * intercepta um requisição para a rota passada por parâmetro
 * @params 
 * rota, 
 * trata o campo image conforme as nossas configurações de upload,
 * middleware
*/
routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);

routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;