const {tracksModel} = require('../models');
const { matchedData } = require('express-validator');
const { handleHttpEror } = require('../utils/handleError');

/**
 * Obtener lista de la base de datos
 */
const getItems = async (req, res) => {
    try {
        const data = await tracksModel.findAllData({});
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
        req = matchedData(req);
        const { id } = req;
        const data = await tracksModel.findOneData(id);
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
        const body = matchedData(req);
        const data = await tracksModel.create(body);
        res.send({data});
    } catch (err) {
        handleHttpEror(res, 'ERROR_CREATE_ITEM');
    }
    
}

/**
 * Actualizar un registro
 */
const updateItem = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req); // obtiene el id y lo que resta lo guarda en una cte llamada body, esto es para pasar los parametros por separado en el findOneAndUpdate
        const data = await tracksModel.findOneAndUpdate(id, body);
        res.send({data});
    } catch (err) {
        handleHttpEror(res, 'ERROR_UPDATE_ITEM');
    }
}

/**
 * Eliminar un registro
 */
const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await tracksModel.delete({_id:id}); // elimina el id que sea igual a _id (asi es como aparece en mongo)
        res.send({data});
    } catch (err) {
        handleHttpEror(res, 'ERROR_DELETE_ITEM'); 
    }
}

module.exports = {getItems, getItem, createItem, updateItem, deleteItem};