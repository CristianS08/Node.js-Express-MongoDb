const { matchedData } = require('express-validator');
const {storagesModel} = require('../models');
const { handleHttpEror } = require('../utils/handleError');
const fs = require('fs');

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * Obtener lista de la base de datos
 */
const getItems = async (req, res) => {
    try {
        const data = await storagesModel.find({});
        res.send({data});
    } catch (err) {
        handleHttpEror(res, 'ERROR_GET_ITEMS');
    }
}

/**
 * Obtener un detalle
 */
const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await storagesModel.findById(id);
        res.send({data});
    } catch (err) {
        handleHttpEror(res, 'ERROR_GET_ITEM'); 
    }
}
/**
 * Insertar un registro 
 */
const createItem = async (req, res) => {
    try {
        const {body, file} = req;
        console.log(file);

        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }

        const data = await storagesModel.create(fileData);
        res.send({data});
    } catch (err) {
        handleHttpEror(res, 'ERROR_CREATE_ITEM');
    }
}

/**
 * Actualizar un registro
 */
/* const updateItem = async (req, res) => {
    try {
        try {
            const { id, ...body } = matchedData(req); // obtiene el id y lo que resta lo guarda en una cte llamada body, esto es para pasar los parametros por separado en el findOneAndUpdate
            const data = await tracksModel.findOneAndUpdate(id, body);
            res.send({data});
        } catch (err) {
            handleHttpEror(res, 'ERROR_UPDATE_ITEM');
        }
    } catch (err) {
        handleHttpEror(res, 'ERROR_UPDATE_ITEM');
    }
} */

/**
 * Eliminar un registro de manera permanente
 */
const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const dataFile = await storagesModel.findById(id);
        await storagesModel.deleteOne(id);
        const { filename } = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`;

        fs.unlinkSync(filePath); // este metodo elimina un archivo, y se le indica la ruta absoluta de ese archivo
        const data = {
            filePath,
            deleted: 1
        }
        res.send({data});
    } catch (err) {
        handleHttpEror(res, 'ERROR_GET_ITEM'); 
    }
}

module.exports = {getItems, getItem, createItem, deleteItem};