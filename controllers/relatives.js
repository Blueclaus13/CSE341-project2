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
        const relativeId = ObjectId.createFromHexString(req.params.id);
        const result = await mongodb.getDatabase().db().collection('madridOntiveros').find({_id: relativeId});
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

const createRelative = async(req, res, next)=>{
    //#swagger.tags=['relatives']
    const relative = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        deathday: req.body.deathday,
        sex: req.body.sex,
        maritalStatus: req.body.maritalStatus,
        fatherName: req.body.fatherName,
        motherName: req.body.motherName,
        children: req.body.children,
        wifeName: req.body.wifeName,
        lifeDescription: req.body.lifeDescription,
        facts: req.body.facts};
    try {
        const response = await mongodb.getDatabase().db().collection('madridOntiveros').insertOne(relative);
        console.log(response);
        if(response.acknowledged > 0){
            res.status(204).send();
        }else{
            throw createError(404,'Some error occurred while creating the relative');
        }
    } catch (error) {
        next(error);
    }
};

const updateRelative = async(req, res, next)=>{
    //#swagger.tags=['relatives']
    const relative = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        deathday: req.body.deathday,
        sex: req.body.sex,
        maritalStatus: req.body.maritalStatus,
        fatherName: req.body.fatherName,
        motherName: req.body.motherName,
        children: req.body.children,
        wifeName: req.body.wifeName,
        lifeDescription: req.body.lifeDescription,
        facts: req.body.facts};

    try {
        const relativeId = ObjectId.createFromHexString(req.params.id);
        const response = await mongodb.getDatabase().db().collection('madridOntiveros').replaceOne({_id: relativeId}, relative);
        if(response.modifiedCount > 0){
            res.status(204).send();
        }else{
            throw createError(404,'Some error occurred while updating the relative');
        }
    } catch (error) {
        next(error);
    }
};

const deleteRelative = async(req, res, next)=>{
    //#swagger.tags=['relatives']
    try {
        const relativeId = ObjectId.createFromHexString(req.params.id);
        const response = await mongodb.getDatabase().db().collection('madridOntiveros').deleteOne({_id: relativeId});
        if(response.deletedCount > 0){
            res.status(204).send();
        }else{
            throw createError(404,"Some error occurred while deleting the relative");
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getSingle,
    createRelative,
    updateRelative,
    deleteRelative
};