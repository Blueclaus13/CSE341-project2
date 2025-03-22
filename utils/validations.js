const {check, validationResult} = require('express-validator');

const createValidationRules = () =>{
    return [
        check("firstName", "First name is require").trim().notEmpty(),
        check("lastName", "Last name is require").trim().notEmpty(),
        check("birthday", "Birthday date is require").trim().notEmpty(),
        check("deathday").trim().optional({values: "falsy"}),
        check("sex", "Sex is require").trim().notEmpty(),
        check("maritalStatus", "Marital Status is require").trim().notEmpty(),
        check("fatherName").trim().optional({values: "falsy"}),
        check("motherName").trim().optional({values: "falsy"}),
        check("children").trim().optional({values: "falsy"}),
        check("wifeName").trim().optional({values: "falsy"}),
        check("lifeDescription").trim().optional({values: "falsy"}),
        check("facts").trim().optional({values: "falsy"}),
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