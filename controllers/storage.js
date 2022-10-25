const { matchedData } = require('express-validator');
const StorageSchema = require('../models/nosql/storage');
const { handleHttpEror } = require('../utils/handleError');
const fs = require('fs');

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * List files
 */
const getItems = async (req, res) => {
    try {
        const data = await StorageSchema.find({})
        .select('url filename');

        res.send({data});
    } catch (err) {
        handleHttpEror(res, 'ERROR_GET_ITEMS');
    }
}

/**
 * Detail file
 */
const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req);

        const data = await StorageSchema.findById(id)
        .select('url filename');

        if(!data){
            handleHttpEror(res, 'NOT_FOUND', 404);
            return;
        }
        res.send({data});
    } catch (err) {
        handleHttpEror(res, 'ERROR_GET_ITEM'); 
    }
}

/**
 * Upload file
 */
const createItem = async (req, res) => {
    try {
        const {file} = req;

        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }

        const data = await StorageSchema.create(fileData);
        res.send({data});
    } catch (err) {
        console.log(err);
        handleHttpEror(res, 'ERROR_CREATE_ITEM');
    }
}

/**
 * Actualizar un registro
 */
/* const updateItem = async (req, res) => {
    try {
        try {
            const { id, ...body } = matchedData(req); 
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
 * Strong delete file
 */
const deleteItem = async (req, res) => {
    try {
        const { _id } = matchedData(req);
        const dataFile = await StorageSchema.findOne(_id);

        if(!dataFile){
            handleHttpEror(res, 'NOT_FOUND', 404);
            return;
        };

        await StorageSchema.deleteOne(_id);

        const { filename } = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`;
        fs.unlinkSync(filePath);
        
        const data = {
            filePath,
            deleted: 1
        }
        res.send({data});
    } catch (err) {
        console.log(err);
        handleHttpEror(res, 'ERROR_DELETE_ITEM'); 
    }
}

module.exports = {getItems, getItem, createItem, deleteItem};