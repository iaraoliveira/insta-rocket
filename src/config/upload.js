//configurações de como o upload dos arquivos é feito na nossa aplicação
const multer = require('multer');
const path = require('path');

module.exports = {
    storage: new multer.diskStorage({
        //configura o destino dos uploads
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        //configura o nome do arquivo a ser salvo, no caso, utiliza o nome original do file
        filename: function(req, file, callback){
            callback(null, file.originalname)
        }
    })
};