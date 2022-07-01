const {check} = require("express-validator")
const {validateResult} = require("../helpers/user.validate.helper")

const validatePhotos = [
    check("_id_user")
    .exists()
    .not()
    .isEmpty(),
    check("path")
    .exists()
    .not()
    .isEmpty(),
    (req,res,next) => {
        validateResult(req,res,next)
    }
]

module.exports = validatePhotos;