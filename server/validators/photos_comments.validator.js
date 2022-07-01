const {check} = require("express-validator")
const {validateResult} = require("../helpers/user.validate.helper")

const validatePhotosComments = [
    check("_id_photo")
    .exists()
    .not()
    .isEmpty(),
    check("_id_user_comment")
    .exists()
    .not()
    .isEmpty()
    .isString(), 
    check("name_user_comment")
    .exists()
    .not()
    .isEmpty()
    .isString(),
    check("fecha")
    .exists()
    .not()
    .isEmpty()
    .isString(),
    check("hora")
    .exists()
    .not()
    .isEmpty()
    .isString(),
    check("date")
    .exists()
    .not()
    .isEmpty()
    .isDate(), 
    check("comment")
    .exists()
    .not()
    .isEmpty()
    .isString(), 
    (req,res,next) => {
        validateResult(req,res,next)
    }
]

module.exports = validatePhotosComments;