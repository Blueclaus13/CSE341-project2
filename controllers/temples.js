const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

const getAll = async (req, res, next)=>{
    //#swagger.tags=['Temples']
    try {
        const result = await mongodb.getDatabase().db().collection('temples').find();
        if(!result){
            throw createError(404,"There aren't temples");
        }
        result.toArray().then((temples)=>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(temples);
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getSingle = async (req, res, next)=>{
    //#swagger.tags=['temples']
    try {
        const templeId = ObjectId.createFromHexString(req.params.id);
        const result = await mongodb.getDatabase().db().collection('temples').find({_id: templeId});
        if(!result){
            throw createError(404,"temple doesn't exist");
        }
        result.toArray().then((temples)=>{
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(temples[0]);
        });
    } catch (error) {
        next(error);
    }
};

const createTemple = async(req, res, next)=>{
    //#swagger.tags=['Temples']
    const temple = {
        templeName: req.body.templeName,
        location: req.body.location,
        dedicated: req.body.dedicated,
        area: req.body.area,
        imageUrl: req.body.imageUrl};
    try {
        const response = await mongodb.getDatabase().db().collection('temples').insertOne(temple);
        console.log(response);
        if(response.acknowledged > 0){
            res.status(204).send();
        }else{
            throw createError(404,'Some error occurred while creating the temple');
        }
    } catch (error) {
        next(error);
    }
};

const updateTemple = async(req, res, next)=>{
    //#swagger.tags=['Temples']
    const temple = {
        templeName: req.body.templeName,
        location: req.body.location,
        dedicated: req.body.dedicated,
        area: req.body.area,
        imageUrl: req.body.imageUrl};

    try {
        const templeId = ObjectId.createFromHexString(req.params.id);
        const response = await mongodb.getDatabase().db().collection('temples').replaceOne({_id: templeId}, temple);
        if(response.modifiedCount > 0){
            res.status(204).send();
        }else{
            throw createError(404,'Some error occurred while updating the temple');
        }
    } catch (error) {
        next(error);
    }
};

const deleteTemple = async(req, res, next)=>{
    //#swagger.tags=['Temples']
    try {
        const templeId = ObjectId.createFromHexString(req.params.id);
        const response = await mongodb.getDatabase().db().collection('temples').deleteOne({_id: templeId});
        if(response.deletedCount > 0){
            res.status(204).send();
        }else{
            throw createError(404,"Some error occurred while deleting the temple");
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getSingle,
    createTemple,
    updateTemple,
    deleteTemple
};