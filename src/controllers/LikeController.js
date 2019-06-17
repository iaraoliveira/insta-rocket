//importa a model dos posts
const Post = require('../models/Post');


module.exports = {
    async store(req, res) {
        //pega o registro do post no bd
        const post = await Post.findById(req.params.id);

        //adiciona mais um na quantidade de likes do registro
        post.likes += 1;

        //salva as modificações
        await post.save();

        //envia uma informação em tempo real com as informações do post após modificado
        req.io.emit('like', post);

        return req.json(post);
        
    }
};