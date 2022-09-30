const express = require('express');
const fs = require('fs');
const router = express.Router();

// [index.js, tracks.js, users.js, storage.js]
const PATH_ROUTES = __dirname;

const removeExtension = (fileName) => {
    /* 
    esta funcion me remueve el nombre del archivo sin el js. Por ejemplo, le envio tracks.js y me devuelve solo tracks
    el split me separa tracks de js porque le pase el punto como parametro, por lo que retorna un arreglo con dos elementos
    el primero es tracks y el segundo es js, el shift me devuelve el primer valor 
    */
    return fileName.split('.').shift();
}

/*  el reddirSync me lee el parametro de manera sincrona, luego definimos el router para cada archivo que no sea el index,
por lo que se genera dinamicamente */

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file);

    if(name !== 'index'){
        router.use(`/${name}`, require(`./${file}`));
    }
}) 

module.exports = router;