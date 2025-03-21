const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

const getAll = async (req, res, next)=>{
    //#swagger.tags=['Relatives']
    try {
        const result = await mongodb.getDatabase().db().collection('madridOntiveros').find();
        if(!result){
            throw createError(404,"There aren't relatives");
        }
        result.toArray().then((relatives)=>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(relatives);
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getSingle = async (req, res, next)=>{
    //#swagger.tags=['Relatives']
    try {
        const contactId = ObjectId.createFromHexString(req.params.id);
        const result = await mongodb.getDatabase().db().collection('madridOntiveros').find({_id: contactId});
        if(!result){
            throw createError(404,"Relative doesn't exist");
        }
        result.toArray().then((relatives)=>{
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(relatives[0]);
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getSingle
};