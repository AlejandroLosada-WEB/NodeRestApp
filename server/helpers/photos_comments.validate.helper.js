const {validationResult} = require("express-validator")

const validateResult = (req,res,next) =>{
    try {
        validationResult(req).throw()
        console.log("Validación de photo comment correcta")
        return next();
    }catch(err){
        res.status(403)
        res.send({errors: err.array()})
    }
};

module.exports = {validateResult}; 