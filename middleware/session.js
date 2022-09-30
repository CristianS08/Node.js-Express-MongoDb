const { handleHttpEror } = require('../utils/handleError');
const {verifyToken} = require('../utils/handleJwt');
const {usersModel} = require('../models');
const getProperties = require('../utils/handlePropertiesEngine');
const propertiesKey = getProperties();

const authMiddleware = async (req, res, next) => {
    try {
        if(!req.headers.authorization){
            handleHttpEror(res, 'NOT_TOKEN', 401);
            return;
        }

        const token = req.headers.authorization.split(' ').pop(); // cuando traemos la authorization nos trae la palabra barer, por eso hacemos el split, para separarla del token
        const dataToken = await verifyToken(token);

        if(!dataToken){
            handleHttpEror(res, 'NOT_PAYLOAD_DATA', 401);
            return;
        };

        //esto se hace para que al buscar el id, me lo busque bien sea cual sea la base de datos
        //en mongo es _id y en mysql es id
        //el propertiesKey me devuelve un id dinamico dependiendo la base de datos
        const query = {
            [propertiesKey.id]: dataToken[propertiesKey.id]
        };

        const user = await usersModel.findOne(query);
        req.user = user; // con esto vamos a poder saber quien es el usuario que hace las peticiones. Por ejemplo la de getItems 

        next();    
    } catch (err) {
        handleHttpEror(res, 'NOT_SESSION', 401);
    }
};

module.exports = {authMiddleware};