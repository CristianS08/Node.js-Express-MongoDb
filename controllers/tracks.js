const TrackSchema = require('../models/nosql/tracks');
const { matchedData } = require('express-validator');
const { handleHttpEror } = require('../utils/handleError');

/**
 * List tracks
 */
const getItems = async (req, res) => {
    try {
        const data = await TrackSchema.findAllData({});
        res.send({data});
    } catch (err) {
        console.log(err);
        handleHttpEror(res, 'ERROR_GET_ITEMS'); 
    }

    
}

/**
 * Detail a track
 */
const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await TrackSchema.findOneData(id);

        if(!data){
            handleHttpEror(res, 'NOT_FOUND', 404);
            return;
        };

        res.send({data});
    } catch (err) {
        handleHttpEror(res, 'ERROR_GET_ITEM'); 
    }
}

/**
 * Create track
 */
const createItem = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await TrackSchema.create(body);
        res.send({data});
    } catch (err) {
        handleHttpEror(res, 'ERROR_CREATE_ITEM');
    }
    
}

/**
 * Update track
 */
const updateItem = async (req, res) => {
    try {
        const data = await TrackSchema.findOneAndUpdate(id, body);

        if(!data){
            handleHttpEror(res, 'NOT_FOUND', 404);
            return;
        };

        res.send({data});
    } catch (err) {
        handleHttpEror(res, 'ERROR_UPDATE_ITEM');
    }
}

/**
 * Soft delete a track
 */
const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await TrackSchema.delete({_id:id});

        if(!data){
            handleHttpEror(res, 'NOT_FOUND', 404);
            return;
        };

        res.send({data});
    } catch (err) {
        handleHttpEror(res, 'ERROR_DELETE_ITEM'); 
    }
}

module.exports = {getItems, getItem, createItem, updateItem, deleteItem};