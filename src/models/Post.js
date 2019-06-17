const mongoose = require('mongoose');

//abstração da tabela de posts do banco de dados em formato javascript
const PostSquema = new mongoose.Squema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0
    },
}, {
    timestamps : true,
});

//exporta o squema que acabamos de criar
module.exports = mongoose.model('Post', PostSchema);