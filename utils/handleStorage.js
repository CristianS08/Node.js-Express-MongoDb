const multer = require('multer');

// configuracion del multer
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        //esta parte indica donde van a ser almacenados los archivos
        const pathStorage = `${__dirname}/../storage`;
        cb(null, pathStorage);
    },
    filename: function(req, file, cb){
        //obtenemos la extension del archivo sin el nombre
        const ext = file.originalname.split('.').pop();
        /* El nombre del archivo va a ser un nombre que cambia para cada archivo nuevo que llega + la extension
            esto con el fin de que si llega un archivo con un mismo nombre no se sobreescriban */
        const filename = `file-${Date.now()}.${ext}`;
        cb(null, filename);
    }
});

// creamos un middleware el cual hace uso del storage previamente creado
const uploadMiddleware = multer({storage});


module.exports = uploadMiddleware;