const {check} = require("express-validator")
const {validateResult} = require("../helpers/user.validate.helper")

const validateUser = [
    check("email")
    .exists()
    .not()
    .isEmpty()
    .isEmail(),
    check("password")
    .exists()
    .not()
    .isEmpty(),
    check("name")
    .exists()
    .not()
    .isEmpty()
    .isString(),
    check("active")
    .exists()
    .not()
    .isEmpty()
    .isBoolean(),
    (req,res,next) => {
        validateResult(req,res,next)
    }
]

const validateLogin = [
    check("email")
    .exists()
    .not()
    .isEmpty()
    .isEmail(),
    check("password")
    .exists()
    .not()
    .isEmpty(),
    (req,res,next) => {
        validateResult(req,res,next)
    }
]

const validateToken = [
    check("token")
    .exists()
    .not()
    .isEmpty(),
    (req,res,next) => {
        validateResult(req,res,next)
    }
]

const validateEmail = [
    check("token")
    .exists()
    .not()
    .isEmpty()
    .isEmail(),
    (req,res,next) => {
        validateResult(req,res,next)
    }
]

module.exports = {validateUser,validateLogin,validateToken,validateEmail};