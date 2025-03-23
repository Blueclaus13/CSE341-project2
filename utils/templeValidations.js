const {check, validationResult} = require('express-validator');

const createValidationRules = () =>{
    return [
        check("templeName", "Temple name is require").trim().notEmpty(),
        check("location", 'location is require "city , country" format').trim().notEmpty().matches(/^[A-Za-z\s]+,\s[A-Za-z\s]+$/),
        check("dedicated", 'Dedicated date is require with "YYYY, Month, DD" format').trim().notEmpty().matches(/^\d{4},\s(January|February|March|April|May|June|July|August|September|October|November|December),\s\d{1,2}$/),
        check("area", "Area is require INT number").trim().notEmpty().isInt(),
        check("imageUrl", "URL is require").trim().notEmpty().matches(/^(https?:\/\/)?(www\.)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/i)
    ];
};
//.optional({values: "falsy"})

const validation = (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log("Validation NOT approved");
        return res.status(400).json({errors: errors.array()});
    }
    console.log("Validation approved");
    next();
};

module.exports = {
    createValidationRules,
    validation
}