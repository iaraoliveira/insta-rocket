//importa a model dos posts
const Post = require('../models/Post');
const sharp = require('sharp');
//dependencias já existentes no node
const path = require('path');
const fs = require('fs');


module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');
        return res.json(posts);
    },
    
    async store(req, res) {
        //armazena em variáveis as informaç~çoes necessárias
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        //separa o nome da imagem de sua extenção
        const [name, ext] = image.split('.');
        //pega o noe da imagem e concatena com .jpg para mudarmos o formato da extenção
        const fileName = `${name}.jpg`;

        //reimenciona a imagem
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality:70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName),
            )
        //apaga a imagem original, não redimensionada
        fs.unlinkSync(req.file.path);

        //cria e salva objeto
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image : fileName,
        });

        //envia uma informação em tempo real com todos os dados do nosso post
        req.io.emit('post', post);
        
        //retorna as informações do registro criado
        return res.json(post);
    }
};