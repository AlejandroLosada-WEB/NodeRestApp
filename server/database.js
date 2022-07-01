const mongoose = require("mongoose");
const basededatos = process.env.DB_URI;



mongoose.connect(basededatos)
.then(db=>console.log("Base de datos conectada"))
.catch(err=>console.error("Error "+err));

module.exports = mongoose;